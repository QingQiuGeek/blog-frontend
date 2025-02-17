import { ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import AboutAuthor from './components/aboutAuthor';
import BlogTimeLine from './components/BlogTimeLine';
import OpenAddress from './components/openAddress';
import Stack from './components/stack';
import './css/about.css';
export default () => {
  return (
    <ProCard>
      <ProCard
        colSpan="30%"
        title="博客时间线"
        hoverable
        bordered
        style={{ height: '500px', overflowY: 'auto', paddingRight: '10px' }}
      >
        <BlogTimeLine />
      </ProCard>
      <ProCard>
        <Row gutter={8}>
          <Col span={12}>
            <ProCard
              title="博主介绍"
              hoverable
              bordered
              wrap
              style={{ border: '1px solid #13C2C2' }}
            >
              <AboutAuthor />
            </ProCard>
            <ProCard
              hoverable
              title="博客开源地址"
              style={{
                border: '1px solid #13C2C2',
                marginTop: '10px',
              }}
            >
              <OpenAddress />
            </ProCard>
          </Col>
          <Col span={12}>
            <ProCard
              title="博客技术栈"
              hoverable
              bordered
              style={{ border: '1px solid #13C2C2' }}
            >
              <Stack />
            </ProCard>
          </Col>
        </Row>
      </ProCard>
    </ProCard>
  );
};
