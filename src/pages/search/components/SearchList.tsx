import PassageSummary from '@/pages/Home/components/passageSummary';
import SearchInput from '@/pages/Home/components/searchInput';
import { searchPassageUsingPost } from '@/services/blog/passageController';
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
import { ProCard } from '@ant-design/pro-components';
import {
  Link,
  connect,
  history,
  useDispatch,
  useSearchParams,
} from '@umijs/max';
import { Avatar, Flex, List, Space, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';
// import PassageSummary from './passageSummary';

const SearchList = () => {
  // 当前 location /comp?a=b;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [loading, setLoading] = useState<boolean>(false);

  const [searchList, setSearchList] = useState<API.PassageInfoVO[]>([]);
  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const type = searchParams.get('type') || ''; // b
  const id = searchParams.get('id') || 0; // b
  const text = searchParams.get('text') || ''; // b
  const getSearchList = async () => {
    setLoading(true);
    try {
      const res: API.BaseResponsePageListPassageInfoVO_ =
        await searchPassageUsingPost({
          currentPage: currentPage,
          pageSize: pageSize,
          searchType: type,
          id: Number(id) || 0,
          searchText: text,
        });
      setSearchList(res.records.flat()); // 将二维数组转换为一维数组
      setTotal(res.total); //总记录数
      setLoading(false);

      // console.log('res：' + stringify(res));
    } catch (e) {
      message.error('搜索失败：' + e);
    }
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }
    getSearchList();
    //页码或每页条数变化时重新加载数据
  }, [searchParams]);

  const data = searchList.map((passage: API.PassageInfoVO) => ({
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
    history.push(`/passage/passageDetails/${item.authorId}/${item.passageId}`);
  };

  return (
    <>
      <SearchInput />
      <ProCard split="vertical">
        <ProCard colSpan="60%" wrap title="搜索结果">
          <List
            itemLayout="vertical"
            size="large"
            loading={loading}
            pagination={{
              pageSizeOptions: [5, 10, 15],
              total: total,
              current: currentPage,
              showSizeChanger: true,
              pageSize: pageSize,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} 篇`,
              onChange: (page, pageSize) => {
                setPageSize(pageSize);
                setCurrentPage(page);
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
                          border: '1px solid #13c2c2',
                          backgroundColor: 'white',
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
        </ProCard>
        <ProCard title="搜索发现"></ProCard>
      </ProCard>
    </>
  );
};

export default connect()(SearchList);
