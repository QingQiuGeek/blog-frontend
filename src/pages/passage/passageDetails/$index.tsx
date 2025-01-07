/* eslint-disable react/display-name */
// 文章详情页

import { ProCard } from '@ant-design/pro-components';
import { Divider } from 'antd';
import { useState } from 'react';
import AuthorInfo from '../components/authorInfo';
import Comments from '../components/comments';
import PassageDetails from '../components/details';
import OhterPassages from '../components/otherPassages';
import './index.css';

export default () => {
  const [passageNum, setPassageNum] = useState<number>();

  return (
    <ProCard split="vertical">
      <ProCard className="right-outer" wrap bordered colSpan="25%">
        <h2>作者介绍</h2>
        <AuthorInfo passageNum={passageNum}></AuthorInfo>
        <OhterPassages setPassageNum={setPassageNum}></OhterPassages>
      </ProCard>
      <ProCard title="文章内容" headerBordered wrap>
        <ProCard>
          <PassageDetails></PassageDetails>
        </ProCard>

        <Divider></Divider>
        <h2>评论区</h2>
        <ProCard>
          <Comments></Comments>
        </ProCard>
      </ProCard>
    </ProCard>
  );
};
