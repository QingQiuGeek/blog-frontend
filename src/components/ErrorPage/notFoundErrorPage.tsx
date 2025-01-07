import { Button, Result } from 'antd';
import React from 'react';

const NotFoundErrorPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry，你访问的页面不存在"
    extra={
      <Button type="primary" href="/">
        返回主页
      </Button>
    }
  />
);

export default NotFoundErrorPage;
