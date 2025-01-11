import { Link, useDispatch } from '@umijs/max';
import { Button, Drawer, Switch } from 'antd';
import { useState } from 'react';
import { requestConfig } from '../requestConfig';
import NotAuthErrorPage from './components/ErrorPage/notAuthErrorPage';
import NotFoundErrorPage from './components/ErrorPage/notFoundErrorPage';
import Footer from './components/Footer/footer';
import { appList } from './components/HeaderAppList/appList';
import Login from './components/Login/login';
import { DEFAULT_USER } from './constants/DefaultUser';
import { LOGO } from './constants/URLResources';
import { decrypt } from './utils/utils';

const Layout = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const doLogOut = async () => {
    dispatch({
      type: 'loginUser/LogoutUser',
    });
    onClose();
  };

  // const { initialState, setInitialState } = useModel('@@initialState');

  // const loginUser = useSelector((state: any) => state.loginUser);
  // setInitialState(DEFAULT_USER);
  const loginUserEncrypt = localStorage.getItem('loginUser');
  let loginUser: API.LoginUserVO;
  if (loginUserEncrypt) {
    loginUser = decrypt(loginUserEncrypt);
    // setInitialState(loginUser);
  }

  // const loginUser = JSON.parse(loginUserDecrypt);
  // console.log('app--loginUser：' + );
  //因为每次页面刷新，dva的state就会消失，那么使用useEffect监控页面，每次刷新都从后端重新请求loginUserVO存入state
  // useEffect(() => {
  //   dispatch({
  //     type: 'loginUser/getLoginUser',
  //   });
  //   console.log('Current loginUser:', stringify(loginUser));
  // }, []);
  // const { loginUser } = useModel('userModel');
  // const { initialState, setInitialState } = useModel('@@initialState');
  // console.log('initialState：' + initialState);
  // const { loginUser }: API.LoginUserVO = initialState;
  // const loginUser: API.LoginUserVO = useSelector(
  //   (state: any) => state.loginUser.loginUser,
  // );
  // console.log(stringify(loginUser));

  // useEffect(() => {
  //   //// 如果从dva中获取不到loginUser了，就getLoginUser获取登录用户信息存到dva的state，确保刷新后会有数据
  //   if (!loginUser) {
  //     dispatch({
  //       type: 'loginUser/getLoginUser',
  //     });
  //   }
  // }, [dispatch, loginUser]);
  // console.log('app.tsx-loginUser：' + stringify(loginUser));

  return {
    // 自定义 403 页面
    unAccessible: <NotAuthErrorPage></NotAuthErrorPage>,
    // 自定义 404 页面
    noFound: <NotFoundErrorPage></NotFoundErrorPage>,
    layout: 'top',
    splitMenus: true,
    fixedHeader: true,
    title: '青秋博客',
    logo: LOGO,
    appList: appList,
    // 默认布局调整
    footerRender: () => <Footer />,
    menuItemRender: (item: any, dom: any) => (
      <div>
        <Link to={item.path ?? '/home'}>{dom}</Link>
      </div>
    ),
    avatarProps: {
      src: loginUser?.avatarUrl ?? DEFAULT_USER.avatarUrl,
      alt: '默认头像',
      shape: 'square',
      render: (props: any, dom: any) => {
        // userId不存在说明未登录
        if (!loginUser) {
          return (
            <>
              <Switch
                checkedChildren="白昼"
                unCheckedChildren="黑夜"
                defaultChecked
                style={{ marginRight: '20px' }}
              />
              {dom}
              <Button onClick={showDrawer}>登陆注册</Button>
              <Drawer
                title="登陆注册ing"
                onClose={onClose}
                open={open}
                width={500}
              >
                <Login onClose={onClose}></Login>
              </Drawer>
            </>
          );
        }
        return (
          <>
            <Switch
              checkedChildren="白昼"
              unCheckedChildren="黑夜"
              defaultChecked
              style={{ marginRight: '20px' }}
            />
            {dom}
            <Link to="/home">
              {/* 退出登录后刷新并跳转到主页 */}
              <Button onClick={doLogOut}>退出登陆</Button>
            </Link>
          </>
        );
      },
    },
    bgLayoutImgList: [
      {
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    token: {
      header: {
        colorTextMenu: 'black',
        colorTextMenuSelected: '#fff',
        colorBgMenuItemSelected: '#13C2C2',
      },
    },
    actionsRender: (props: any) => {
      if (props.isMobile) return [];
      return [
        <div
          key="SearchOutlined"
          aria-hidden
          style={{
            display: 'flex',
            alignItems: 'center',
            marginInlineEnd: 24,
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        ></div>,
        // ) : undefined,
      ];
    },
    // 其他属性见：https://procomponents.ant.design/components/layout#prolayout
  };
};

export const layout = Layout;
//必须带上
export const request = requestConfig;
