import type { GetProps } from 'antd';
import { Input } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  console.log(info?.source, value);

const SearchPassage = () => {
  return (
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      enterButton
      size="large"
      color="#13C2C2"
      style={{ marginBottom: '20px' }}
    />
  );
};

export default SearchPassage;
