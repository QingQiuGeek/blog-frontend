import { Timeline } from 'antd';
import TimeLineEvents from './TimeLineEvents';

export default () => {
  return (
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
              content={'精细化后端接口返回的数据模型、优化组件展示数据的获取'}
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
              content={'实现管理页的用户管理和文章管理，后端动态拼接查询条件'}
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
  );
};
