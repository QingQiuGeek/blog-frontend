import { getTokenIsExpiry } from '@/utils/utils';
import { RequestConfig } from '@umijs/max';
// 除了 errorConfig, requestInterceptors, responseInterceptors 以外其它配置都直接透传 axios 的 request 配置

interface ResponseStructure {
  code?: number;
  data: any;
  message: string;
}

//umi4使用了axios，https://axios-http.com/docs/interceptors
//umi3是umi-request ，https://github.com/umijs/umi-request#request-options
export const requestConfig: RequestConfig = {
  baseURL: 'http://127.0.0.1:8081',
  withCredentials: true,
  timeout: 5000,
  // 请求拦截器
  //它需要接收 request config 作为参数，并且将它返回。
  requestInterceptors: [
    (config: any) => {
      // const { loginUser } = useModel('userModel');
      // const token = getTokenIsExpiry();
      // const loginUser = localStorage.getItem('loginUser');
      // console.log('loginUSer：' + loginUser);
      // console.log('loginUSerToken：' + loginUser.token);
      // const token = loginUser.token;
      // const token = getTokenIsExpiry();
      // const tokenEncrypt = localStorage.getItem('authorization');
      const token = getTokenIsExpiry();
      // let token: string;
      if (token) {
        // token = decrypt(tokenEncrypt);
        config.headers['authorization'] = token;
      }
      // 如果未过期，输出 token；如果已过期，输出 null
      //token存在就带上token，不存在就不携带
      // if (token) {
      //   config.headers['authorization'] = token;
      //   // console.log(token);
      //   //如果用户有token并且未过期，那么用户发请求时刷新token有效期
      //   setTokenWithExpiry(token as string, TokenExpiryTIME);
      // }
      // console.log(token);
      // console.log(config.headers);
      return config;
    },
  ],

  // 响应拦截器
  //接收 axios 的 response 作为参数，并且将它返回。
  //通过打印可知response直接返回的数据格式{"data":{code,data,message},"status":xxx,...}
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const res = response.data as ResponseStructure;
      if (res.code !== 200) {
        // console.log(res);
        // message.error('请求失败！' + res.message);
        //异常要抛出去，其他地方才能捕获并显示异常
        throw new Error(res.message);
      }
      return res;
    },
  ],
};

// 定义一个用于生成请求配置的函数
// export default () => {
//   const loginUser = useSelector((state) => state.loginUser.loginUser); // 获取登录用户信息
//   const token = loginUser ? loginUser.token : null; // 获取 token

//   return {
//     baseURL: 'http://localhost:8081/api',
//     withCredentials: true,
//     timeout: 100000,

//     // 请求拦截器
//     requestInterceptors: [
//       (config) => {
//         // 如果 token 存在，就在请求头中添加 Authorization
//         if (token) {
//           config.headers['authorization'] = token;
//         }
//         console.log(token);
//         console.log(config.headers);
//         return config;
//       },
//     ],

//     responseInterceptors: [
//       (response) => {
//         // 拦截响应数据，进行个性化处理
//         const res = response.data as ResponseStructure;
//         if (res.code !== 200) {
//           console.log(res);
//           message.error('请求失败！' + res.message);
//           throw new Error(res.message);
//         }
//         return res;
//       },
//     ],
//   };
// };
