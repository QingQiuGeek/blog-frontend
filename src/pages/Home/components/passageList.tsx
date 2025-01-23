import { getHomePassageListUsingPost } from '@/services/blog/passageController';
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
import { Link, connect, history, useDispatch, useLocation } from '@umijs/max';
import { Avatar, Flex, List, Space, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';
import PassageSummary from './passageSummary';

const PassageList = () => {
  const [homePassageList, setHomePassageList] = useState<API.PassageInfoVO[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);

  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const location = useLocation();

  //浏览器点击回退，url变化，文章列表不变化，分页页码也不变化
  //解决，在useEffect中监控url的page字段，url变化后更新setCurrentPage
  const page = new URLSearchParams(location.search).get('page');

  useEffect(() => {
    // 从 URL 获取页码
    // const page = searchParams.get('page');
    if (page) {
      setCurrentPage(Number(page)); // 更新分页
    } else {
      setCurrentPage(1);
    }
  }, [currentPage, page]);

  const getHomePassageList = async () => {
    try {
      const res: API.BaseResponsePageListPassageInfoVO_ =
        await getHomePassageListUsingPost({
          currentPage: currentPage,
          pageSize: pageSize,
        });
      setHomePassageList(res.records.flat()); // 将二维数组转换为一维数组
      setTotal(res.total); //总记录数
      setLoading(false);
      // console.log('res：' + stringify(res));
    } catch (e) {
      message.error('获取首页文章列表失败：' + e);
    }
  };
  // console.log('home：' + stringify(homePassageList));
  //页码或每页条数变化时重新加载数据
  useEffect(() => {
    getHomePassageList();
  }, [currentPage, pageSize]);

  const data = homePassageList.map((passage: API.PassageInfoVO) => ({
    title: passage.title,
    avatar: passage.avatarUrl,
    description: (
      <Flex gap="4px 0" wrap>
        <Tag icon={<UserOutlined />} color="gold">
          {passage.authorName}
        </Tag>
        {Object.entries(passage.ptagsMap || {})?.map(([key, tag]) => (
          <Tag key={key} color="#13c2c2">
            {tag}
          </Tag>
        ))}
      </Flex>
    ),
    authorId: passage.authorId,
    pTagsMap: passage.ptagsMap,
    viewNum: passage.viewNum,
    commentNum: passage.commentNum,
    collectNum: passage.collectNum,
    isCollect: passage.isCollect,
    summary: passage.summary,
    isThumb: passage.isThumb,
    thumbNum: passage.thumbNum,
    accessTime: formatTimestamp(passage.accessTime), // 发布时间
    author: passage.authorName, // 作者
    thumbnail: passage.thumbnail, // 文章缩略图
    passageId: passage.passageId,
  }));
  // console.log('homePassageList', +stringify(homePassageList));

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const dispatch = useDispatch();
  const handleClick = (item: any) => {
    const params = {
      accessTime: item.accessTime,
      title: item.title,
      thumbNum: item.thumbNum,
      ptagsMap: item.ptagsMap,
      viewNum: item.viewNum,
      collectNum: item.collectNum,
      commentNum: item.commentNum,
      isCollect: item.isCollect,
      isThumb: item.isThumb,
      summary: item.summary,
      passageId: item.passageId,
    };
    //把数据传入dva，在passageDetails组件中获取
    dispatch({
      type: 'passageInfo/reduceSetPassageInfo',
      payload: params,
    });
    // console.log('params：' + stringify(params));
    history.push(`/passage/passageDetails/${item.authorId}/${item.passageId}`);
    // return ;
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      loading={loading}
      pagination={{
        pageSizeOptions: [5, 10, 15],
        total: total,
        current: currentPage,
        pageSize: pageSize,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 篇`,
        onChange: (page, pageSize) => {
          setPageSize(pageSize);
          setCurrentPage(page);
          history.push(`?page=${page}`);
        },
        onShowSizeChange: () => {
          setPageSize(pageSize);
        },
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.passageId}
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
                marginTop: '20px',
                objectFit: 'contain',
                width: '180px',
              }}
              // alt="预览图"
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
                    border: '2px solid #13c2c2',
                  }}
                >
                  <Avatar src={item.avatar} shape="square" size={65} />
                </div>
              </Link>
            }
            // 之前用Link跳转，现在换成a标签
            title={<a onClick={() => handleClick(item)}>{item.title}</a>}
            description={item.description}
          />
          {/* 拼接url时不要换行，一定一行拼接完，否则url中的参数提取不出来 */}
          <a onClick={() => handleClick(item)}>
            <PassageSummary>{item.summary}</PassageSummary>
          </a>
        </List.Item>
      )}
    />
  );
};

// export default PassageList;
export default connect()(PassageList);
