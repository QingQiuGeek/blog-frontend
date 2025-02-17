import { ProCard } from '@ant-design/pro-components';
import { Divider } from 'antd';
import HotPassage from './components/hotPassage';
import ItInformation from './components/itInformation';
import PassageList from './components/passageList';
import SearchInput from './components/searchInput';
import './css/index.css';

export default () => {
  return (
    <>
      <ProCard>
        <ProCard wrap className="left-outer">
          <ProCard>
            <SearchInput />
          </ProCard>
          <ProCard>
            <PassageList></PassageList>
          </ProCard>
        </ProCard>
        <ProCard colSpan="25%" wrap className="right-outer">
          <HotPassage />
          <Divider />
          <ItInformation />
        </ProCard>
      </ProCard>
    </>
  );
};
