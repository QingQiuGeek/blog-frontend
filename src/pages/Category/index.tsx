import { ProCard } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import type { GetProps } from 'antd';
import { Card, Divider, Input, Typography, message } from 'antd';
import Category from './components/category';
import Tags from './components/tags';

const { Title, Paragraph, Text, Link } = Typography;
type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
  if (!value) {
    message.info('请输入搜索内容！');
  }
  history.push(
    `search/searchResult?page=1&type=search&id=${null}&text=${value}`,
  );
};

export default () => {
  return (
    <Card>
      <Search
        style={{ width: '700px' }}
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        size="large"
        maxLength={50}
        showCount
      />
      <Divider></Divider>
      <ProCard split="vertical">
        <ProCard colSpan="70%">
          <Title level={3}>文章类别</Title>
          <Category></Category>
        </ProCard>
        <ProCard>
          <Title level={3}>文章标签</Title>
          <Tags></Tags>
        </ProCard>
      </ProCard>
    </Card>
  );
};
