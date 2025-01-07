//localStorage中token过期时间
//前端的token有效期最好和后端保持一致
export const TokenTTL = 60;

//5min
export const AutoSaveTime = 300000;

export const MAIL_REGEX =
  /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;

export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,10}$/;

export const USERNAME_REGEX = /^[\u4E00-\u9FA5A-Za-z0-9_]{2,6}$/;

// 定义 AES 密钥
export const SECRET_KEY = 'qazedctgbujmyhnrfvwsxokmuhbtfces';
