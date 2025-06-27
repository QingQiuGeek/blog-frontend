import PassageContent from '@/pages/Home/components/passageSummary';
import { thumbPassage } from '@/services/blog/passageController';
import { myThumbPassage } from '@/services/blog/userController';
import { formatTimestamp } from '@/utils/utils';
import {
  ClockCircleOutlined,
  EyeOutlined,
  LikeFilled,
  LikeOutlined,
  MessageOutlined,
  StarFilled,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, history } from '@umijs/max';
import { Avatar, Button, Flex, List, Space, Tag, message } from 'antd';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';

const MyThumbs = () => {
  const [thumbs, setThumbs] = useState<API.PassageInfoVO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const page = new URLSearchParams(location.search).get('page');

  const fetchMyThumbs = async () => {
    setLoading(true);
    try {
      const res: API.BRPageListPassageInfoVO = await myThumbPassage({
        currentPage: currentPage,
        pageSize: pageSize,
      });
      // console.log('res: ' + stringify(res));
      setThumbs(res.records.flat());
      setTotal(res.total);
      setLoading(false);
    } catch (error) {
      message.error('我的点赞文章列表获取失败' + error);
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
      fetchMyThumbs();
    }
  }, [currentPage, page]);

  // setThumbNum(thumbs.length);
  const [data, setData] = useState<
    {
      href: string;
      title: string;
      avatar: string;
      description: JSX.Element;
      summary: string;
      viewNum: number;
      commentNum: number;
      collectNum: number;
      thumbNum: number;
      isCollect: boolean;
      isThumb: boolean;
      accessTime: string;
      authorId: string | number;
      passageId: string | number;
      thumbnail: string;
      author: string;
    }[]
  >([]);
  // const dispatch = useDispatch();

  const turnClick = (item: any) => {
    const passageId = item.passageId;
    const authorId = item.authorId;
    history.push(`/passage/passageDetails/${authorId}/${passageId}`);

    // dispatch({
    //   type: 'passageInfo/effectSetPassageInfo',
    //   payload: { passageId },
    // });
  };
  useEffect(() => {
    if (thumbs.length > 0) {
      setData(
        thumbs.map((passage: API.PassageInfoVO) => ({
          href: `/passage/passageDetails/${passage.authorId}/${passage.passageId}`,
          title: passage.title ?? '出错了，默认标题',
          avatar: passage.avatarUrl ?? '出错了，默认头像',
          description: (
            <Flex gap="4px 0" wrap>
              <Tag icon={<UserOutlined />} color="gold">
                {passage.authorName}
              </Tag>
              {Object.entries(passage?.ptagsMap || {})?.map(([key, tag]) => (
                <Tag key={key} color="#13c2c2">
                  {tag}
                </Tag>
              ))}
            </Flex>
          ),
          summary: passage.summary ?? '出错了，这是默认内容',
          viewNum: passage.viewNum ?? 0,
          commentNum: passage.commentNum ?? 0,
          collectNum: passage.collectNum ?? 0,
          thumbNum: passage.thumbNum ?? 0,
          isCollect: passage.isCollect ?? false,
          isThumb: passage.isThumb ?? false,
          accessTime: formatTimestamp(passage.accessTime) ?? '', // 发布时间
          passageId: passage.passageId ?? '',
          authorId: passage.authorId ?? '',
          thumbnail: passage.thumbnail ?? '',
          author: passage.authorName ?? '', // 作者
        })),
      );
    }
  }, [thumbs]);

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  // 处理按钮点击事件
  const handleClick = debounce(async (pid: string) => {
    // console.log('passageId:' + pid);
    const updatedData = [...data];
    const passageIndex = updatedData.findIndex(
      (passage) => passage.passageId === pid,
    );
    if (passageIndex === -1) return; // 如果找不到该文章，返回
    // console.log('passageIndex:' + passageIndex);
    updatedData[passageIndex].isThumb = !updatedData[passageIndex].isThumb;
    setData(updatedData); // 更新数据
    // 模拟后端请求延迟
    try {
      const res = await thumbPassage({
        passageId: pid,
      });
      if (res) {
        message.success(
          updatedData[passageIndex].isThumb ? '点赞成功！' : '已取消点赞！',
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
      size="large"
      loading={loading}
      pagination={{
        onChange: (page, pageSize) => {
          setPageSize(pageSize);
          setCurrentPage(page);
          history.push(`?page=${page}`);
        },
        showTotal: (total, range) => `${range[0]}-${range[1]} | 共 ${total} 篇`,
        pageSize: pageSize,
        position: 'top',
        total: total,
        current: currentPage,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={EyeOutlined}
              text={String(item.viewNum)}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={item.isCollect ? StarFilled : StarOutlined}
              text={String(item.collectNum)}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={item.isThumb ? LikeFilled : LikeOutlined}
              text={String(item.thumbNum)}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text={String(item.commentNum)}
              key="list-vertical-message"
            />,
            <IconText
              icon={ClockCircleOutlined}
              text={item.accessTime}
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              style={{
                height: 'auto',
                objectFit: 'contain',
                width: '140px',
              }}
              alt="logo"
              src={item.thumbnail}
            />
          }
        >
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
                    type={item.isThumb ? 'primary' : 'default'}
                    onClick={() => handleClick(item.passageId)} // 点击时传递用户的 id
                    loading={false}
                    // style={{ right: '5px' }}
                    style={{
                      right: '20px',
                      width: '55px',
                      fontSize: '11px',
                      height: '30px',
                      fontWeight: 'bold',
                      border: '1px solid #13c2c2',
                    }}
                  >
                    {item.isThumb ? '取消点赞' : '点赞'}
                  </Button>
                </Flex>
                <a onClick={() => turnClick(item)}>{item.title}</a>
                {/* <Link to={item.href}>{item.title}</Link> */}
              </>
            }
            description={item.description}
          />

          <a onClick={() => turnClick(item)}>
            <PassageContent>{item.summary}</PassageContent>
          </a>
        </List.Item>
      )}
    />
  );
};

export default MyThumbs;
