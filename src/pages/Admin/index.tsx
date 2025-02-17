import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import React from 'react';

import Analysis from '@/pages/Admin/components/analysis';
import PassageManage from '@/pages/Admin/components/passageManage';
import UserManage from '@/pages/Admin/components/userManage';
import {
  AppstoreTwoTone,
  FolderOpenTwoTone,
  MessageTwoTone,
  PieChartTwoTone,
  SettingTwoTone,
  TagsTwoTone,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { history, useLocation } from '@umijs/max';
import CategoryManage from './components/categoryManage';
import CommentManage from './components/commentManage';
import TagManage from './components/tagManage';

const onChange = (key: string) => {
  history.push(`/admin/${key}`);
};
//TODO 浏览器点击回退，展示内容有误，包括个人主页
const items: TabsProps['items'] = [
  {
    key: 'userManage',
    label: '用户管理',
    icon: <SettingTwoTone />,
    children: <UserManage></UserManage>,
  },
  {
    key: 'passageManage',
    label: '文章管理',
    icon: <FolderOpenTwoTone />,
    children: <PassageManage></PassageManage>,
  },
  {
    key: 'commentManage',
    label: '评论管理',
    icon: <MessageTwoTone />,
    children: <CommentManage></CommentManage>,
  },
  {
    key: 'categoryManage',
    label: '类别管理',
    icon: <AppstoreTwoTone />,
    children: <CategoryManage></CategoryManage>,
  },
  {
    key: 'tagManage',
    label: '标签管理',
    icon: <TagsTwoTone />,
    children: <TagManage></TagManage>,
  },
  {
    key: 'analysis',
    label: '数据分析',
    icon: <PieChartTwoTone />,
    children: <Analysis></Analysis>,
  },
];

const HomePage: React.FC = () => {
  const location = useLocation();
  // 从 URL 中获取当前 tab 信息
  const currentTab = location.pathname.split('/')[2] || 'userManage';

  return (
    <ProCard key={location.pathname}>
      <Tabs
        animated
        size="large"
        defaultActiveKey={currentTab}
        items={items}
        onChange={onChange}
        tabPosition="left"
      />
    </ProCard>
  );
};

export default HomePage;
