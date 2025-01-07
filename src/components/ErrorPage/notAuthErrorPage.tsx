import { Button, Result } from 'antd';
import React from 'react';

const NotAuthErrorPage: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="你无权访问该页面"
    extra={
      <Button type="primary" href="/">
        返回主页
      </Button>
    }
  />
);

export default NotAuthErrorPage;
