/* eslint-disable react/display-name */

import { ProCard } from '@ant-design/pro-components';
import { Image, Space, Timeline } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import TimeLineEvents from './components/TimeLineEvents';
import './css/about.css';
export default () => {
  const { Divider } = ProCard;
  const [responsive, setResponsive] = useState(false);
  return (
    <ProCard split="vertical">
      <ProCard colSpan="30%">
        <ProCard
          title="博客时间线"
          colSpan="100%"
          hoverable
          bordered
          style={{ height: '500px', overflowY: 'auto', paddingRight: '10px' }}
        >
          <Timeline
            mode="right"
            pending="recording"
            items={[
              {
                label: '2024-10-29',
                children: (
                  <TimeLineEvents
                    title={'前后端模板搭建'}
                    content={'前后端模板搭建，实现后端文章、用户模块'}
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-11-05',
                children: (
                  <TimeLineEvents
                    title={'登陆注册'}
                    content={'博客登陆、注册、跨域CORS'}
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-11-08',
                children: (
                  <TimeLineEvents
                    title={'实现文章展示及跳转'}
                    content={'首页文章展示、文章详情页跳转'}
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-11-14',
                children: (
                  <TimeLineEvents
                    title={'优化文章加载'}
                    content={
                      '首页只获取文章基本信息，不获取文章内容，文章基本信息保存在localStorage给文章详情复用，优化文章加载'
                    }
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-11-15',
                children: (
                  <TimeLineEvents
                    title={'实现点赞收藏关注功能'}
                    content={'文章详情页和个人主页的点赞、收藏、关注'}
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-11-16~17',
                children: (
                  <TimeLineEvents
                    title={'优化返回数据模型、前端数据获取及流动'}
                    content={
                      '精细化后端接口返回的数据模型、优化组件展示数据的获取'
                    }
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-11-18~19',
                children: (
                  <TimeLineEvents
                    title={'实现前端登录态存储和权限校验'}
                    content={
                      '登录态和token采用AES加密存储在localStorage，实现管理页权限校验'
                    }
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-11-21~22',
                children: (
                  <TimeLineEvents
                    title={'实现前后端评论功能'}
                    content={
                      '用户可以对文章进行评论，删除自己的评论，管理员可以删除所有文章的所有评论，文章作者可以删除自己文章的所有评论'
                    }
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-11-22',
                children: (
                  <TimeLineEvents
                    title={'切换node版本和markdown编辑器'}
                    content={
                      '把最初的byteMD切换为更好用的MdEditorRT，并对MdEditorRT进行扩展修改。因为该编辑器的扩展要求node版本>20，所以把node从18.2换成20.10'
                    }
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-12-02',
                children: (
                  <TimeLineEvents
                    title={'实现管理页的用户管理和文章管理'}
                    content={
                      '实现管理页的用户管理和文章管理，后端动态拼接查询条件'
                    }
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-12-04',
                children: (
                  <TimeLineEvents
                    title={
                      '实现编辑器图片上传，修复文章详情页刷新后显示信息消失的问题'
                    }
                    content={
                      '实现编辑器图片上传，修复文章详情页刷新后显示信息消失的问题'
                    }
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-12-08',
                children: (
                  <TimeLineEvents
                    title={'实现前后端分类专栏的文章类别展示及搜索输入框跳转'}
                    content={
                      '实现前后端分类专栏的文章类别、文章标签展示及搜索输入框跳转'
                    }
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-12-12',
                children: (
                  <TimeLineEvents
                    title={'实现管理页功能'}
                    content={'实现管理页标签、文章、类别、评论增删改查'}
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-12-17',
                children: (
                  <TimeLineEvents
                    title={'实现前端评论滚动加载'}
                    content={'实现前端评论滚动加载及验证码异步发送'}
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-12-18',
                children: (
                  <TimeLineEvents
                    title={'实现用户个人信息更新'}
                    content={'实现用户个人信息更新及标签修改'}
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-12-22',
                children: (
                  <TimeLineEvents
                    title={'实现前后端文章插入、更新、保存、定时发布'}
                    content={'实现前后端文章插入、更新、保存、定时发布'}
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2024-12-25',
                children: (
                  <TimeLineEvents
                    title={'实现我的文章编辑发布'}
                    content={'实现我的文章编辑发布'}
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2025-01-20',
                children: (
                  <TimeLineEvents
                    title={'引入星火大模型'}
                    content={'引入星火大模型'}
                  ></TimeLineEvents>
                ),
              },
              {
                label: '2025-01-21',
                children: (
                  <TimeLineEvents
                    title={'部署上线'}
                    content={'部署上线'}
                  ></TimeLineEvents>
                ),
              },
            ]}
          />
        </ProCard>
      </ProCard>
      <ProCard>
        <RcResizeObserver
          key="resize-observer"
          onResize={(offset) => {
            setResponsive(offset.width < 596);
          }}
        >
          <ProCard.Group
            title="数据概览"
            bordered
            hoverable
            direction={responsive ? 'column' : 'row'}
          >
            <ProCard
              title="今日访问量"
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
              }}
            >
              79
            </ProCard>
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <ProCard
              title="总访问量"
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
              }}
            >
              112890
            </ProCard>
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <ProCard
              title="今日新增用户"
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
              }}
            >
              93
            </ProCard>
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <ProCard
              title="总用户数"
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
              }}
            >
              112893
            </ProCard>
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <ProCard
              title="已运行天数"
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
              }}
            >
              66
            </ProCard>
          </ProCard.Group>
        </RcResizeObserver>
        <Divider></Divider>

        <div style={{ height: 'auto' }}>
          <ProCard
            bordered
            hoverable
            // colSpan='100%'
            style={{ marginBlockStart: 8 }}
            gutter={8}
          >
            <RcResizeObserver
              key="resize-observer"
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <ProCard.Group
                // bordered
                // hoverable
                direction={responsive ? 'column' : 'row'}
              >
                <ProCard
                  hoverable
                  bordered
                  title="博客开源地址"
                  style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                  }}
                ></ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard
                  hoverable
                  bordered
                  title="小程序端"
                  style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                  }}
                >
                  {/* <QRCode
                    errorLevel="H"
                    value="https://blog.csdn.net/qq_73181349?spm=1000.2115.3001.5343"
                    icon="https://ooo.0x0.ooo/2024/10/19/ODGrrN.jpg"
                  /> */}
                </ProCard>
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <ProCard
                  hoverable
                  bordered
                  title="奖励博主"
                  style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                  }}
                >
                  <Space>
                    <Image src="https://ooo.0x0.ooo/2024/10/19/ODGtqU.jpg"></Image>
                    <Image src="https://ooo.0x0.ooo/2024/10/19/ODGPVp.jpg"></Image>
                  </Space>
                  <br />
                </ProCard>
              </ProCard.Group>
            </RcResizeObserver>
          </ProCard>
        </div>
      </ProCard>
    </ProCard>
  );
};
