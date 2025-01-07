import { ProCard } from '@ant-design/pro-components';
import AboutAuthor from './components/aboutAuthor';
import HotPassage from './components/hotPassage';
import PassageList from './components/passageList';
import SearchPassage from './components/search';
import './css/index.css';

export default () => {
  return (
    <>
      {/* <Collapse
        size="small"
        ghost
        style={{ backgroundColor: 'white', borderBottom: '1px solid #13c2c2' }}
        items={[
          {
            key: '1',
            label: (
              <Space>
                <Badge dot>
                  <NotificationOutlined style={{ fontSize: 16 }} />
                </Badge>
                公告
              </Space>
            ),
            children: <p>公告</p>,
          },
        ]}
      /> */}

      <ProCard split="vertical">
        <ProCard wrap className="left-outer">
          <ProCard>
            <SearchPassage></SearchPassage>
          </ProCard>
          <ProCard>
            <PassageList></PassageList>
          </ProCard>
        </ProCard>
        <ProCard colSpan="30%" wrap className="right-outer">
          <AboutAuthor></AboutAuthor>
          <HotPassage></HotPassage>
        </ProCard>
      </ProCard>
    </>
  );
};
