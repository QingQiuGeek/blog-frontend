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
  // 获取当前路径
  const currentPath = history.location.pathname;
  // 判断当前路径是否是 searchResult 页面
  if (currentPath === '/search/searchResult') {
    const currentSearchParams = new URLSearchParams(history.location.search);
    currentSearchParams.set('text', value);
    currentSearchParams.set('type', 'search');
    currentSearchParams.set('id', 'null');

    // 如果已经在 searchResult 页面，可以不跳转
    // message.info('已经在搜索结果页面！');
    history.push({
      pathname: currentPath,
      search: currentSearchParams.toString(),
    });
  }
  history.push(
    `/search/searchResult?page=1&type=search&id=${null}&text=${value}`,
  );
};

const SearchPassage = () => {
  return (
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      enterButton
      maxLength={50}
      // loading
      showCount
      size="large"
      color="#13C2C2"
      style={{ marginBottom: '20px' }}
    />
  );
};

export default SearchPassage;
