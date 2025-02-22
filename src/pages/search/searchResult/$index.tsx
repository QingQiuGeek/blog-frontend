import SearchInput from '@/pages/Home/components/searchInput';
import { ProCard } from '@ant-design/pro-components';
import SearchFind from '../components/SearchFind';
import SearchList from '../components/SearchList';

export default () => {
  return (
    <>
      <SearchInput />
      <ProCard split="vertical">
        <ProCard colSpan="60%" title="搜索结果">
          <SearchList></SearchList>
        </ProCard>
        <ProCard title="搜索发现">
          <SearchFind></SearchFind>
        </ProCard>
      </ProCard>
    </>
  );
};
