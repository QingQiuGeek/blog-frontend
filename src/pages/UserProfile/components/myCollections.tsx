import PassageContent from '@/pages/Home/components/passageSummary';
import { collectPassageUsingPut } from '@/services/blog/passageController';
import { myCollectPassageUsingPost } from '@/services/blog/userController';
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

const MyCollections = () => {
  const [collects, setCollects] = useState<API.PassageInfoVO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const page = new URLSearchParams(location.search).get('page');

  //获取我的收藏列表
  const fetchMyCollects = async () => {
    try {
      const res: API.BaseResponseListPassageInfoVO_ =
        await myCollectPassageUsingPost({
          pageSize: pageSize,
          currentPage: currentPage,
        });
      // console.log('res: ' + stringify(res));
      setCollects(res.records.flat()); // 更新 dataSource
      setTotal(res.total);
    } catch (error) {
      message.error('我的收藏文章列表获取失败' + error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('loginUser')) {
      fetchMyCollects();
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    // 从 URL 获取页码
    // const page = searchParams.get('page');
    if (localStorage.getItem('loginUser')) {
      if (page) {
        setCurrentPage(Number(page)); // 更新分页
      } else {
        setCurrentPage(1);
      }
      fetchMyCollects();
    }
    setLoading(false);
  }, [currentPage, page]);

  // console.log('myStar：' + stringify(collects));
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
      userName: string;
    }[]
  >([]);

  // const { authorId, passageId } = useParams();
  // console.log('authorId：' + authorId + '--passageId：' + passageId);
  // const passageInfo = useSelector((state: any) => state.passageInfo);
  // const dispatch = useDispatch();

  const turnClick = (item: any) => {
    const passageId = item.passageId;
    const authorId = item.authorId;
    // console.log('passageId：' + passageId);
    history.push(`/passage/passageDetails/${authorId}/${passageId}`);
    //点击文章时异步从后端请求文章数据
    // dispatch({
    //   type: 'passageInfo/effectSetPassageInfo',
    //   payload: { passageId },
    // });
  };
  // useEffect(() => {
  //   dispatch({
  //     type: 'passageInfo/reduceGetPassageInfo',
  //     payload: passageId,
  //   });
  // }, [passageId, authorId]);

  // 在 collects 更新后更新 data
  useEffect(() => {
    if (collects.length > 0) {
      setData(
        collects.map((passage: API.PassageInfoVO) => ({
          href: `/passage/passageDetails/${passage.authorId}/${passage.passageId}`,
          title: passage.title ?? '出错了，默认标题', // 如果 title 为空，赋空字符串
          avatar: passage.avatarUrl ?? '出错了，默认头像', // 如果 avatarUrl 为空，赋空字符串
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
          summary: passage.summary ?? '出错了，这是默认内容', // 如果 content 为空，赋空字符串
          viewNum: passage.viewNum ?? 0, // 如果 viewNum 为 null 或 undefined，赋 0
          commentNum: passage.commentNum ?? 0, // 如果 commentNum 为 null 或 undefined，赋 0
          collectNum: passage.collectNum ?? 0, // 如果 collectNum 为 null 或 undefined，赋 0
          thumbNum: passage.thumbNum ?? 0, // 如果 thumbNum 为 null 或 undefined，赋 0
          isCollect: passage.isCollect ?? false, // 如果 isCollect 为 null 或 undefined，赋 false
          isThumb: passage.isThumb ?? false, // 如果 isThumb 为 null 或 undefined，赋 false
          accessTime: formatTimestamp(passage.accessTime) ?? '',
          passageId: passage.passageId ?? '',
          authorId: passage.authorId ?? '',
          thumbnail: passage.thumbnail || '', // 如果 thumbnail 为空，赋空字符串
          userName: passage.authorName || '', // 如果 userName 为空，赋空字符串
        })),
      );
    }
  }, [collects]); // 依赖于 collects 更新

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
    updatedData[passageIndex].isCollect = !updatedData[passageIndex].isCollect;
    setData(updatedData); // 更新数据
    try {
      const res = await collectPassageUsingPut({
        passageId: pid,
      });
      if (res) {
        message.success(
          updatedData[passageIndex].isCollect ? '收藏成功！' : '已取消收藏！',
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
              text={String(item?.collectNum)}
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
                    type={item.isCollect ? 'primary' : 'default'}
                    onClick={() => handleClick(item.passageId)}
                    loading={false}
                    style={{
                      width: '55px',
                      right: '20px',
                      fontSize: '11px',
                      height: '30px',
                      fontWeight: 'bold',
                      border: '1px solid #13c2c2',
                    }}
                  >
                    {item.isCollect ? '取消收藏' : '收藏'}
                  </Button>
                </Flex>
                <a onClick={() => turnClick(item)}>{item.title}</a>
                {/* <Link to={item.href}></Link> */}
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

export default MyCollections;
