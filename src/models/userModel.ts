// 全局共享数据示例
import { DEFAULT_USER } from '@/constants/DefaultUser';
import {
  getLoginUserUsingGet,
  loginUsingPost,
  logoutUsingPost,
  registerUsingPost,
} from '@/services/blog/userController';
import { formatTimestamp, setTokenWithExpiry } from '@/utils/utils';
import { message } from 'antd';

//umi数据流实现
//函数名必须是Page，不然useState用不了！
//在 Page 组件中使用了 useState 来管理 loginUser，并通过 setLoginUser 更新它，但这种方式只会在 Page 组件的局部状态中生效。
//如果你希望在其他地方修改 userModel 的状态，并且能够跨组件共享这些状态，单纯的 useState 是不够的。你需要通过 dva（或其它类似的全局状态管理工具）来共享和管理跨组件的状态。
// export default function Page() {
//   const [loginUser, setLoginUser] = useState<API.LoginUserVO>(DEFAULT_USER);
//   console.log(stringify(loginUser));
//   return { loginUser, setLoginUser };
// }

//umi dva实现
export default {
  //定义命名空间
  namespace: 'loginUser',
  state: {
    // loginUser: DEFAULT_USER,
    avatarUrl: '',
    createTime: '',
    interestTag: [],
    mail: '',
    profiles: '',
    sex: 2,
    token: '',
    userName: '',
    ipAddress: '',
    role: '',
  },
  //effects是异步action，适合登录、退出逻辑
  effects: {
    *FetchLoginUser(_, { call, put }) {
      const res: API.LoginUserVO = yield call(getLoginUserUsingGet); // 调用后端接口
      // console.log('执行fetchLoginUser');
      if (res) {
        yield put({
          type: 'SaveLoginUser',
          payload: {
            loginUser: res,
          },
        });
        // sessionStorage.setItem('loginUser', JSON.stringify(res)); // 存储到sessionStorage
      }
    },
    *LoginUser({ payload }, { put, call }) {
      try {
        //打印payload参数
        // console.log('LoginUser：' + stringify(payload));
        // 在此处处理异步请求（如登录接口请求）
        const res: API.LoginUserVO = yield call(
          loginUsingPost,
          payload.loginRequest as API.LoginRequest,
        );
        if (res) {
          //执行saveLoginUser，把登陆的用户信息保存在sessionStorage
          yield put({
            type: 'SaveLoginUser',
            payload: {
              loginUser: res,
            },
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          message.success('登陆成功');
        }
      } catch (error) {
        message.error('dva-登录出错！' + error);
      }
    },
    *RegisterUser({ payload }, { put, call }) {
      try {
        // 在此处处理异步请求（如登录接口请求）
        const res: API.LoginUserVO = yield call(
          registerUsingPost,
          payload.registerRequest as API.RegisterRequest,
        ); // 假设 loginApi 是登录请求的 API 函数
        if (res) {
          yield put({
            type: 'SaveLoginUser',
            payload: {
              loginUser: res, // 假设 API 返回的数据包含用户信息
            },
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          message.success('注册成功');
        }
      } catch (error) {
        message.error('dva 注册出错！' + error);
      }
    },
    *LogoutUser(_, { put, call }) {
      try {
        //请求后端删除token
        const res: boolean = yield call(logoutUsingPost);
        if (res) {
          yield put({
            type: 'RemoveLoginUser',
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          message.success('退出登录成功');
        }
      } catch (error) {
        message.error('退出登录时出错！' + error);
      }
    },
  },

  //reducers是同步action，适合登陆后保存用户信息
  reducers: {
    //state 是当前 model中存储的状态数据。此处指loginUser
    //payload 是传入该 reducer 的参数，通常是从 effects 中通过 yield put() 触发的
    SaveLoginUser(state: any, { payload }) {
      const loginUser: API.LoginUserVO = payload.loginUser;
      // console.log('saveLoginUser：' + stringify(payload.loginUser));
      loginUser.createTime = formatTimestamp(loginUser.createTime);

      // const encryptLoginUser = encrypt(loginUser);
      // sessionStorage.setItem('loginUser', encryptLoginUser);

      //把token存到sessionStorage
      // const encryptToken = encrypt(loginUser.token);
      setTokenWithExpiry(loginUser);
      // sessionStorage.setItem('authorization', encryptToken);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);

      return {
        ...state,
        ...loginUser,
      };
    },
    getLoginUser(state: any) {
      const loginUser = localStorage.getItem('loginUser');
      // console.log('getLoginUser：' + loginUser);
      if (loginUser) {
        return {
          ...state,
          ...{ loginUser },
        };
      }
      // console.log('getLoginUser NO');
      return state;
      // console.log(stringify(loginUser));
    },
    RemoveLoginUser(state: any) {
      // 清除 localStorage 中存储的 token 和过期时间
      localStorage.removeItem('loginUser');
      localStorage.removeItem('authorization');
      window.location.reload();
      return {
        ...state,
        loginUser: DEFAULT_USER,
      };
    },
  },
};
