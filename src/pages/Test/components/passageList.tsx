import { getHomePassageListUsingPost } from '@/services/blog/passageController';
import { UserOutlined } from '@ant-design/icons';
import { Link, connect, history, useDispatch, useLocation } from '@umijs/max';
import { Avatar, Flex, List, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import PassageSummary from './passageSummary';

const PassageList = () => {
  const [homePassageList, setHomePassageList] = useState<API.PassageInfoVO[]>(
    [],
  );
  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const location = useLocation();
  useEffect(() => {
    const page = new URLSearchParams(location.search).get('page');
    if (page) {
      setCurrentPage(Number(page)); // 更新分页
    }
  }, [currentPage]);

  const getHomePassageList = async () => {
    try {
      const res: API.BaseResponsePageListPassageInfoVO_ =
        await getHomePassageListUsingPost({
          currentPage: currentPage,
          pageSize: pageSize,
        });
      setHomePassageList(res.records.flat()); // 将二维数组转换为一维数组
      setTotal(res.total); //总记录数
      // console.log('res：' + stringify(res));
    } catch (e) {
      message.error('获取首页文章列表失败：' + e);
    }
  };

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
        {passage.ptags?.map((tag, index) => (
          <Tag key={index} color="#13c2c2">
            {tag}
          </Tag>
        ))}
      </Flex>
    ),
    authorId: passage.authorId,
    passageId: passage.passageId,
    summary: passage.summary,
  }));

  const dispatch = useDispatch();
  const handleClick = (item: any) => {
    const params = {
      accessTime: item.accessTime,
      title: item.title,
      passageId: item.passageId,
    };
    dispatch({
      type: 'passageInfo/reduceSetPassageInfo',
      payload: params,
    });
    // console.log('params：' + stringify(params));
    history.push(`/passage/passageDetails/${item.authorId}/${item.passageId}`);
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSizeOptions: [5, 10, 15],
        total: total,
        current: currentPage,
        showSizeChanger: true,
        pageSize: pageSize,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 篇`,
        onChange: (page, pageSize) => {
          setPageSize(pageSize);
          setCurrentPage(page);
          history.push(`?page=${page}`);
        },
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.passageId}>
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
  );
};

// export default PassageList;
export default connect()(PassageList);
