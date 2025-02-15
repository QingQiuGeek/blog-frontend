import { SECRET_KEY, TokenTTL } from '@/constants/Common';
import { history } from '@umijs/max';
import { message } from 'antd';
import CryptoJS from 'crypto-js';

// 生成随机的十六进制颜色
// export const getRandomColor = () => {
//   const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//   return randomColor;
// };

export const getRandomColor = () => {
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
    '#13c2c2',
    '#ed5a65',
    '#ee4866',
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

//自定义时间格式化函数 年-月-日
export function formatTimestamp(timestamp: string): string {
  // 将时间戳转换为数字类型
  const ts = parseInt(timestamp, 10);

  // 创建 Date 对象
  const date = new Date(ts);

  // 获取年月日
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份从0开始，所以加1
  const day = date.getDate();

  // 返回格式化后的日期字符串
  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;
  // const date = new Date(timestamp);
  // const year = date.getFullYear();
  // const month = date.getMonth() + 1; // 月份从0开始，所以加1
  // const day = date.getDate();

  // return `${year}-${month.toString().padStart(2, '0')}-${day
  //   .toString()
  //   .padStart(2, '0')}`;
}

export function formatTimestampMinutes(timestamp: string): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份从0开始，所以加1
  const day = date.getDate();
  const hours = date.getHours(); // 获取小时
  const minutes = date.getMinutes(); // 获取分钟

  // 格式化：年-月-日-时-分
  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}  ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

export const validateNum = (id) => {
  // 使用正则表达式验证是否是纯数字
  return /^[1-9]\d*$/.test(id);
};

//前端把时间戳转换成符合数据库datetime YYYY-MM-DD HH:MM:SS的格式传给后端
export function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toISOString();
  // const date = new Date(timestamp); // 创建 Date 对象
  // const year = date.getFullYear();
  // const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份从0开始，要加1并格式化为2位数
  // const day = ('0' + date.getDate()).slice(-2); // 日
  // const hours = ('0' + date.getHours()).slice(-2); // 时
  // const minutes = ('0' + date.getMinutes()).slice(-2); // 分
  // const seconds = ('0' + date.getSeconds()).slice(-2); // 秒
  // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 加密函数：将多个参数加密，并返回加密后的字符串（Base64 编码）
//默认情况下是使用 AES 的 ECB 模式加密的，这种模式 不需要初始向量 (IV)
export const encrypt = (data: any) => {
  // console.log('encrypt：' + stringify(data));
  // console.log('data：' + data);
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY,
  ).toString();
  // console.log('encrypted：' + encrypted);
  return encrypted;
};

// 解密函数：将加密的字符串解密，并返回原始的多个参数
export const decrypt = (encryptedData: any) => {
  // console.log('encryptedData：' + encryptedData);
  // console.log(stringify(encryptedData));

  // 解密数据
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  // console.log('bytes：' + bytes);
  if (bytes) {
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
  return 'invalid';

  // console.log('decryptedData：' + decryptedData);
};

// 存储token和登录态
export const setTokenWithExpiry = (loginUser: API.LoginUserVO) => {
  // console.log('loginUser：' + stringify(loginUser));
  const encryptLoginUser = encrypt(loginUser);
  localStorage.setItem('loginUser', encryptLoginUser); // 存储 loginUser 和过期时间

  const expiryTime = new Date().getTime() + TokenTTL * 60 * 1000; // 计算过期时间,单位 min
  // console.log('expiryTime');
  const item = {
    token: loginUser.token,
    expiry: expiryTime,
  };
  // console.log('item：' + stringify(item));
  const encryptToken = encrypt(item);
  // console.log('encryptToken');

  localStorage.setItem('authorization', encryptToken);
};

// 获取 token 并检查是否过期，如果过期就删除
export const getTokenIsExpiry = () => {
  const encryptToken = localStorage.getItem('authorization');
  if (!encryptToken) {
    return null; // 如果没有 token，返回 null
  }
  const tokenObj = decrypt(encryptToken);
  const currentTime = new Date().getTime();
  // console.log('tokenObj：' + stringify(tokenObj));

  // 检查 token 是否过期
  if (currentTime > tokenObj.expiry) {
    localStorage.removeItem('authorization'); // 如果过期了，删除 loginUser
    localStorage.removeItem('loginUser'); // 如果过期了，删除 token
    setTimeout(() => {
      window.location.reload();
    }, 400);
    history.replace('/home');
    message.info('登陆凭证过期，请重新登录');
  }
  return tokenObj.token; // 如果没有过期，返回 token
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
