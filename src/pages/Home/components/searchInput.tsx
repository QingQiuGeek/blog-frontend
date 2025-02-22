import { history, useSearchParams } from '@umijs/max';
import type { GetProps } from 'antd';
import { Input, message } from 'antd';
import { useState } from 'react';

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
  if (!value) {
    message.info('请输入搜索内容！');
    return;
  }
  try {
    history.push(
      `/search/searchResult?page=1&type=search&id=${null}&text=${value}`,
    );
  } catch (error) {
    message.error('搜索请求失败，请稍后重试');
  }
};
export default () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('text') || '');
  return (
    <Search
      placeholder="请输入搜索内容"
      onSearch={onSearch}
      enterButton
      maxLength={50}
      showCount
      size="large"
      color="#13C2C2"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      style={{ marginBottom: '20px', width: '60vw' }}
    />
  );
};
