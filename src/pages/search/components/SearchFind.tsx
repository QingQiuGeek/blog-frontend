import { SearchURL } from '@/constants/URLResources';
import { List, message } from 'antd';
import { useEffect, useState } from 'react';
type RecommendationVO = {
  url?: string;
  title?: string;
};
export default () => {
  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const [recommendations, setRecommendations] = useState<RecommendationVO[]>(
    [],
  );

  const [recommendationLoading, setRecommendationLoading] =
    useState<boolean>(false);
  let resultMap = new Map();
  // 发起请求并解析目标页面内容
  const fetchAndParse = async () => {
    try {
      // 1. 发起请求获取页面内容
      const response = await fetch(SearchURL);
      console.log(response);
      const html = await response.text();

      // 2. 创建虚拟DOM解析器
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      console.log(doc);
      // 3. 选择目标元素
      const results = doc.querySelectorAll('#b_content .b_algo_group h2');

      console.log(results);
      results.forEach((item) => {
        // 提取 a 标签的 href 属性作为 key
        const link = item.querySelector('h2 a');
        const key = link ? link.href : null;

        // 提取 p 标签的内容作为 value
        const caption = item.querySelector('.b_caption p');
        const value = caption ? caption.innerText : null;

        // 将有效数据添加到 Map 中
        if (key && value) {
          resultMap.set(key, value);
        }
      });
      // 返回结果
      return resultMap;
    } catch (error) {
      message.error('搜索发现请求失败:' + error);
      console.error('搜索发现请求失败:', error);
    }
  };

  useEffect(() => {
    fetchAndParse();
  }, []);
  return (
    <List
      itemLayout="vertical"
      size="large"
      loading={recommendationLoading}
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
    />
  );
};
