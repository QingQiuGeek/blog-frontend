/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSearchParams } from '@umijs/max';
import { List, message } from 'antd';
import { useEffect, useState } from 'react';
type RecommendationVO = {
  url?: string;
  title?: string;
  summary?: string;
};
export default () => {
  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const [recommendations, setRecommendations] = useState<RecommendationVO[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const text = searchParams.get('text') || '';

  let resultMap = new Map();
  // 发起请求并解析目标页面内容
  const search = async () => {
    try {
      setLoading(true);
      // 默认使用bing引擎
      // const bingResults = await bingSearch(text);
      console.log(bingResults);

      // 设置结果
      setRecommendations(bingResults);
      setTotal(bingResults.length);
    } catch (error) {
      message.error('搜索发现请求失败:' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);
  return (
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
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 篇`,
        onChange: (page, pageSize) => {
          setPageSize(pageSize);
          setCurrentPage(page);
        },
        onShowSizeChange: () => {
          setPageSize(pageSize);
        },
      }}
      dataSource={recommendations}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.title} description={item.summary} />
        </List.Item>
      )}
    />
  );
};
