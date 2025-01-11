import { ProCard } from '@ant-design/pro-components';
import { history, useLocation } from '@umijs/max';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import FansList from './components/fansList';
import FollowsList from './components/followsList';
import MyCollections from './components/myCollections';
import MyMessages from './components/myMessages';
import MyPassages from './components/myPassages';
import MyThumbs from './components/myThumbs';
import UserInfo from './components/userInfo';

export default () => {
  //兄弟组件借助父组件传参
  // const [followerNum, setFollowerNum] = useState<number>();
  // const [followNum, setFollowNum] = useState<number>();
  // const [passageNum, setPassageNum] = useState<number>();
  // const [collectNum, setCollectNum] = useState<number>();
  // const [thumbNum, setThumbNum] = useState<number>();

  // 如果未登录，就不请求后端接口，这里可以用token或者状态管理判断
  //此处用token
  // useEffect(() => {
  //   if (localStorage.getItem('authorization') === null) return;
  //   //获取我的粉丝列表
  //   const fetchMyFollowers = async () => {
  //     try {
  //       const res: API.BaseResponseListUserVO_ = await myFollowersUsingGet();
  //       // 提取并转换数据为 DataItem[] 类型
  //       // const convertedData =
  //       //   res?.map((user) => ({
  //       //     id: user.userId?.toString() || '', // 假设 userId 是数字，需要转为字符串
  //       //     name: user.userName || '',
  //       //     image: user.avatarUrl || '',
  //       //     desc: user.profiles || '', // 假设 profiles 是描述
  //       //     interestTag: user.interestTag || [],
  //       //   })) || [];
  //       // console.log('res: ' + stringify(res));
  //       // console.log('convertedData: ' + convertedData);
  //       // setFollowers(convertedData); // 更新 dataSource
  //       setFollowers(res);
  //     } catch (error) {
  //       message.error('我的粉丝列表获取失败' + error);
  //     }
  //   };
  //   fetchMyFollowers();

  //   //获取我的文章列表
  //   const fetchMyPassages = async () => {
  //     try {
  //       const res: API.BaseResponseListPassageVO_ = await myPassagesUsingGet();
  //       console.log('res: ' + stringify(res));
  //       setPassages(res);
  //     } catch (error) {
  //       message.error('我的文章列表获取失败' + error);
  //     }
  //   };
  //   fetchMyPassages();

  //   //获取我的收藏列表
  //   const fetchMyCollects = async () => {
  //     try {
  //       const res: API.BaseResponseListPassageVO_ =
  //         await myCollectPassageUsingGet();
  //       console.log('res: ' + stringify(res));
  //       setCollects(res);
  //     } catch (error) {
  //       message.error('我的收藏文章列表获取失败' + error);
  //     }
  //   };
  //   fetchMyCollects();

  //   //获取我的点赞列表
  //   const fetchMyThumbs = async () => {
  //     try {
  //       const res: API.BaseResponseListPassageVO_ =
  //         await myThumbPassageUsingGet();
  //       console.log('res: ' + stringify(res));
  //       setThumbs(res);
  //     } catch (error) {
  //       message.error('我的点赞文章列表获取失败' + error);
  //     }
  //   };
  //   fetchMyThumbs();

  //   //获取我的关注列表
  //   const fetchMyFollows = async () => {
  //     try {
  //       const res: API.BaseResponseListUserVO_ = await myFollowUsingGet();
  //       setFollows(res); // 更新 dataSource
  //     } catch (error) {
  //       message.error('我的关注列表获取失败' + error);
  //     }
  //   };
  //   fetchMyFollows();
  // }, []);
  // console.log('followers:' + stringify(followers));
  // console.log('passages:' + stringify(passages));
  // console.log('collects:' + stringify(collects));
  // console.log('follows:' + stringify(follows));
  const location = useLocation();
  // 从 URL 中获取当前 tab 信息
  const currentTab = location.pathname.split('/')[2] || 'myPassages'; // 默认选中 'MyPassages'

  const handleTabChange = (key: string) => {
    // 路由变化，更新 URL
    history.push(`/userProfile/${key}`);
  };

  const tagItems: TabsProps['items'] = [
    {
      key: 'myPassages',
      label: '我的文章',
      children: <MyPassages></MyPassages>,
    },
    {
      key: 'myCollections',
      label: '收藏列表',
      children: <MyCollections></MyCollections>,
    },
    {
      key: 'myThumbs',
      label: '点赞列表',
      children: <MyThumbs></MyThumbs>,
    },
    {
      key: 'myFans',
      label: '粉丝列表',
      children: <FansList></FansList>,
    },
    {
      key: 'myFollows',
      label: '我的关注',
      children: <FollowsList></FollowsList>,
    },

    {
      key: 'myMessages',
      label: '我的消息',
      children: <MyMessages></MyMessages>,
    },
  ];
  return (
    <ProCard split="vertical">
      <ProCard colSpan="30%">
        <h2>我的信息</h2>
        <UserInfo></UserInfo>
      </ProCard>
      <ProCard headerBordered key={location.pathname}>
        <Tabs
          defaultActiveKey={currentTab}
          items={tagItems}
          onChange={handleTabChange}
        />
      </ProCard>
    </ProCard>
  );
};
