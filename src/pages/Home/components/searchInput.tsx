import { history } from '@umijs/max';
import type { GetProps } from 'antd';
import { Input, message } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
  if (!value) {
    message.info('请输入搜索内容！');
    return;
  }
  history.push(
    `/search/searchResult?page=1&type=search&id=${null}&text=${value}`,
  );
};

export default () => {
  return (
    <Search
      placeholder="请输入搜索内容"
      onSearch={onSearch}
      enterButton
      maxLength={50}
      showCount
      size="large"
      color="#13C2C2"
      style={{ marginBottom: '20px', width: '60vw' }}
    />
  );
};
