import { getRandomTagsUsingGet } from '@/services/blog/tagController';
import { getRandomColor } from '@/utils/utils';
import { ProCard } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Flex, Tag, message } from 'antd';
import { useEffect, useState } from 'react';

const Tags = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<API.TagVO[]>([]);

  useEffect(() => {
    const loadRandomTags = async () => {
      const res: API.BaseResponseListTagVO_ = await getRandomTagsUsingGet();
      try {
        if (res) {
          // console.log(stringify(res));
          setTags(res);
          setLoading(false);
        } else {
          message.error('文章标签加载失败');
        }
      } catch (error) {
        message.error('文章标签加载异常：' + error);
      }
    };
    loadRandomTags();
  }, []);

  const handleClick = (item: API.TagVO) => {
    history.push(
      `search/searchResult?page=1&type=tag&id=${item.tagId}&text=${item.tagName}`,
    );
    // search?type=tag&id=${id}&text=${tagName}
    // search?type=category&id=${id}&text=${categoryName}
    // search?type=search&id=${id}&text=${tagName}
  };
  return (
    <>
      <ProCard
        hoverable
        bordered
        style={{ border: '1px solid #13C2C2' }}
        loading={loading}
      >
        <Flex gap="15px 5px" wrap align="center">
          {tags.map((tag) => (
            <a onClick={() => handleClick(tag)} key={tag.tagId}>
              <Tag
                style={{
                  fontSize: '15px',
                  height: '30px',
                  lineHeight: '30px',
                }}
                bordered
                key={tag.tagId}
                color={getRandomColor()}
              >
                {tag.tagName}
              </Tag>
            </a>
          ))}
        </Flex>
      </ProCard>
    </>
  );
};
export default Tags;
