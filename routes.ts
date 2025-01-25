export default [
  {
    path: '/',
    redirect: '/home',
    icon: 'HomeTwoTone',
  },
  {
    path: '/about',
    name: '关于博客',
    component: './About',
    icon: 'QuestionCircleTwoTone',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
    icon: 'HomeTwoTone',
  },
  // {
  // 	name: '测试页',
  // 	path: '/tests',
  // 	component: './Test',
  // },
  {
    path: '/category',
    name: '分类专栏',
    icon: 'TagsTwoTone',
    component: './Category',
  },
  {
    path: '/writeBlog',
    name: '创作博文',
    icon: 'EditTwoTone',
    component: './WriteBlog',
  },
  {
    path: '/editPassage/:passageId',
    name: '编辑博文',
    hideInMenu: true,
    icon: 'HighlightTwoTone',
    component: './EditPassage',
  },
  {
    path: '/ai',
    name: 'AI',
    icon: 'GiftTwoTone',
    component: './Ai',
  },
  {
    path: '/passage/passageDetails/:authorId/:passageId',
    name: '文章详情',
    hideInMenu: true,
    icon: 'BookTwoTone',
    // 不在菜单中显示
    component: './passage/passageDetails/$index.tsx',
  },
  {
    path: '/search/searchResult',
    name: '搜索结果',
    icon: 'LayoutTwoTone',
    hideInMenu: true, // 不在菜单中显示
    component: './search/searchResult/$index.tsx',
  },
  {
    path: '/userProfile',
    name: '个人主页',
    icon: 'SmileTwoTone',
    component: './UserProfile',
    routes: [
      {
        path: '/userProfile/myPassages',
        component: './UserProfile/components/myPassages', // 这里指向你 `MyArticles` 子组件
      },
      {
        path: '/userProfile/myCollections',
        component: './UserProfile/components/myCollections', // 这里指向你 `MyCollections` 子组件
      },
      {
        path: '/userProfile/myFans',
        component: './UserProfile/components/fansList', // 这里指向你 `MyFans` 子组件
      },
      {
        path: '/userProfile/myFollows',
        component: './UserProfile/components/followsList', // 这里指向你 `MyFollows` 子组件
      },
      {
        path: '/userProfile/myThumbs',
        component: './UserProfile/components/myThumbs', // 这里指向你 `MyThumbs` 子组件
      },
      {
        path: '/userProfile/myMessages',
        component: './UserProfile/components/myMessages', // 这里指向你 `MyMessages` 子组件
      },
    ],
  },
  {
    name: '管理页',
    path: '/admin',
    access: 'canAdmin',
    component: './Admin',
    icon: 'CrownTwoTone',
    routes: [
      {
        path: '/admin/userManage',
        component: './Admin/components/userManage',
      },
      {
        path: '/admin/passageManage',
        component: './Admin/components/passageManage',
      },
      {
        path: '/admin/commentManage',
        component: './Admin/components/commentManage',
      },
      {
        path: '/admin/categoryManage',
        component: './Admin/components/categoryManage',
      },
      {
        path: '/admin/tagManage',
        component: './Admin/components/tagManage',
      },
      {
        path: '/admin/analysis',
        component: './Admin/components/analysis',
      },
    ],
  },
];
