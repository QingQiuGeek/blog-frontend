import {
  followUsingPut,
  myFollowUsingPost,
} from '@/services/blog/userController';
import { Link, history } from '@umijs/max';
import { Avatar, Button, Flex, List, Tag, message } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const FollowsList = () => {
  const [follows, setFollows] = useState<API.UserVO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const page = new URLSearchParams(location.search).get('page');
  const fetchMyFollows = async () => {
    setLoading(true);
    try {
      const res: API.BaseResponseListUserVO_ = await myFollowUsingPost({
        pageSize: pageSize,
        currentPage: currentPage,
      });
      setFollows(res.records.flat()); // 更新 dataSource
      setTotal(res.total);
      setLoading(false);
    } catch (error) {
      message.error('我的关注列表获取失败' + error);
    }
  };

  useEffect(() => {
    // 从 URL 获取页码
    // const page = searchParams.get('page');
    if (localStorage.getItem('loginUser')) {
      if (page) {
        setCurrentPage(Number(page)); // 更新分页
      } else {
        setCurrentPage(1);
      }
      fetchMyFollows();
    }
  }, [currentPage, page]);

  useEffect(() => {
    if (localStorage.getItem('loginUser')) {
      //获取我的关注列表
      fetchMyFollows();
    }
  }, []);
  // console.log('followsList: ' + stringify(follows));

  // 当 follows 更新时，更新 data
  const [data, setData] = useState<
    {
      href: string;
      avatar: string | undefined;
      userName: string | undefined;
      profile: string | undefined;
      isFollowed: boolean | undefined;
      userId: number | undefined;
      description: JSX.Element;
    }[]
  >([]);

  useEffect(() => {
    if (follows.length > 0) {
      setData(
        follows.map((follow: API.UserVO) => ({
          href: '#',
          avatar: follow.avatarUrl,
          userName: follow.userName,
          profile: follow.profiles,
          isFollowed: follow.isFollow,
          userId: follow.userId,
          description: (
            <Flex gap="4px 0" wrap>
              {follow.interestTag?.map((tag, index) => (
                <Tag key={index} color="#13c2c2">
                  {tag}
                </Tag>
              ))}
            </Flex>
          ),
        })),
      );
    }
  }, [follows]); // 当 follows 变化时，更新 data

  // 处理按钮点击事件
  const handleClick = debounce(async (uid: number) => {
    // console.log('userid:' + uid);
    const updatedData = [...data];
    const userIndex = updatedData.findIndex((user) => user.userId === uid);
    if (userIndex === -1) return; // 如果找不到该用户，返回
    // console.log('userindex:' + userIndex);

    updatedData[userIndex].isFollowed = !updatedData[userIndex].isFollowed; // 切换关注状态
    setData(updatedData); // 更新数据

    try {
      // 模拟后端请求延迟
      const res = await followUsingPut({
        userId: uid,
      });
      if (res) {
        message.success(
          updatedData[userIndex].isFollowed ? '关注成功！' : '已取消关注！',
        );
      } else {
        message.error('操作失败');
      }
    } catch (error) {
      message.error('出错了，请稍后再试' + error);
    }
  }, 300);
  // if (!follows) return <Spin size="large" />;
  return (
    <List
      loading={loading}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page, pageSize) => {
          setPageSize(pageSize);
          setCurrentPage(page);
          history.push(`?page=${page}`);
        },
        showTotal: (total, range) => `${range[0]}-${range[1]} | 共 ${total} `,
        pageSize: pageSize,
        position: 'top',
        total: total,
        current: currentPage,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.userId}>
          <List.Item.Meta
            avatar={
              //跳转到用户主页
              <Link to="#">
                <div
                  style={{
                    border: '1px solid #13c2c2',
                    backgroundColor: 'white',
                  }}
                >
                  <Avatar src={item.avatar} shape="square" size={65} />
                </div>
              </Link>
            }
            title={
              <>
                <Flex
                  style={{ display: 'inline-flex', marginLeft: '20px' }}
                  gap="4px 5px"
                >
                  <Button
                    type={item.isFollowed ? 'primary' : 'default'}
                    onClick={() => handleClick(item.userId)} // 点击时传递用户的 id
                    loading={false}
                    // style={{ right: '5px' }}
                    style={{
                      width: '50px',
                      right: '20px',
                      fontSize: '11px',
                      height: '25px',
                      fontWeight: 'bold',
                      border: '1px solid #13c2c2',
                    }}
                  >
                    {item.isFollowed ? '取关' : '互关'}
                  </Button>
                </Flex>
                <Link to={item.href}>{item.userName}</Link>
              </>
            }
            description={item.description}
          />
          <Link to={item.href}>{item.profile}</Link>
        </List.Item>
      )}
    />
  );
};

export default FollowsList;
