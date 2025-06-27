import { follow, myFollowers } from '@/services/blog/userController';
import { Link, history } from '@umijs/max';
import { Avatar, Button, Flex, List, Tag, message } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const FansList = () => {
  const [followers, setFollowers] = useState<API.UserVO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const page = new URLSearchParams(location.search).get('page');

  const fetchMyFollowers = async () => {
    setLoading(true);
    try {
      const res: API.BRListUserVO = await myFollowers({
        pageSize: pageSize,
        currentPage: currentPage,
      });
      setFollowers(res.records.flat());
      setTotal(res.total);
      setLoading(false);
    } catch (error) {
      message.error('我的粉丝列表获取失败' + error);
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
      fetchMyFollowers();
    }
  }, [currentPage, page]);

  // useEffect(() => {
  //   //获取我的粉丝列表
  //   if (localStorage.getItem('loginUser')) {
  //     fetchMyFollowers();
  //     setLoading(false);
  //   }
  // }, []);
  // console.log('fansList: ' + stringify(followers));

  // 当 followers 更新时，更新 data
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
    setData(
      followers.map((follower: API.UserVO) => ({
        href: '#',
        avatar: follower.avatarUrl,
        userName: follower.userName,
        profile: follower.profiles,
        isFollowed: follower.isFollow,
        userId: follower.userId,
        description: (
          <Flex gap="4px 0" wrap>
            {follower.interestTag?.map((tag, index) => (
              <Tag key={index} color="#13c2c2">
                {tag}
              </Tag>
            ))}
          </Flex>
        ),
      })),
    );
  }, [followers]);

  //关注按钮
  const handleClick = debounce(async (uid: number) => {
    // console.log('userid:' + uid);
    const updatedData = [...data];
    const userIndex = updatedData.findIndex((user) => user.userId === uid);
    if (userIndex === -1) return; // 如果找不到该用户，返回
    // console.log('userindex:' + userIndex);
    updatedData[userIndex].isFollowed = !updatedData[userIndex].isFollowed; // 切换关注状态
    setData(updatedData); // 更新关注的状态

    try {
      const res = await follow({
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

  return (
    <List
      itemLayout="vertical"
      loading={loading}
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

export default FansList;
