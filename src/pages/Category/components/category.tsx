import { getCategoriesUsingPost } from '@/services/blog/categoryController';
import { history, useLocation } from '@umijs/max';
import { Card, List, Typography, message } from 'antd';
import { useEffect, useState } from 'react';

const data = [];
for (let i = 1; i <= 15; i++) {
  data.push({ title: `Title ${i}`, tags: `Tags${i}` });
}
const { Title, Paragraph } = Typography;

const Category = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const location = useLocation();
  const [categories, setCategories] = useState<API.CategoryVO[]>();
  const page = new URLSearchParams(location.search).get('page');
  useEffect(() => {
    // 从 URL 获取页码
    if (page) {
      setCurrentPage(Number(page)); // 更新分页
    } else {
      setCurrentPage(1);
    }
    const getCategories = async () => {
      try {
        const res: API.BaseResponsePageListCategoryVO_ =
          await getCategoriesUsingPost({
            currentPage: currentPage,
            pageSize: 9,
          });
        if (res) {
          setTotal(res.total);
          setCategories(res.records.flat());
        } else {
          message.error('文章类别加载失败');
        }
      } catch (error) {
        message.error('文章类别加载异常：' + error);
      }
    };
    getCategories();
    setLoading(false);
  }, [currentPage, page]);

  const handleClick = (item: API.CategoryVO) => {
    history.push(
      `search/searchResult?page=1&type=category&id=${item.categoryId}&text=${item.categoryName}`,
    );
  };
  return (
    <List
      pagination={{
        total: total,
        current: currentPage,
        pageSize: 9,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} `,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          history.push(`?page=${page}`);
        },
      }}
      grid={{
        gutter: 16,
        xs: 2,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={categories}
      renderItem={(item) => (
        <List.Item>
          <a onClick={() => handleClick(item)}>
            <Card
              size="small"
              loading={loading}
              hoverable
              style={{
                height: '160px',
                border: '1px solid #13C2C2',
              }}
              key={item.categoryId}
              title=<span style={{ fontSize: '22px' }}>
                {item.categoryName}
              </span>
              extra={<span>(●'◡'●)</span>}
            >
              <span
                style={{
                  fontSize: '15px',
                }}
              >
                {item.description}
              </span>
            </Card>
          </a>
        </List.Item>
      )}
    />
  );
};
export default Category;
