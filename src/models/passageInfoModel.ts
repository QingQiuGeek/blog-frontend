// 全局共享数据示例
import { getPassageInfoUsingGet } from '@/services/blog/passageController';
import { formatTimestamp } from '@/utils/utils';
import { message } from 'antd';

//TODO bug 1.点击作者其他文章，返回后仅文章内容变化，摘要、时间、标签这些存在sessionStorage中的不变
//2.文章详情页，刷新后文章标签消失
//umi dva实现
export default {
  //定义命名空间
  namespace: 'passageInfo',
  state: {
    accessTime: null,
    title: '默认标题',
    thumbNum: 0,
    ptagsMap: Map<number, string>,
    viewNum: 0,
    collectNum: 0,
    commentNum: 0,
    isCollect: false,
    isThumb: false,
    summary: '默认摘要',
  },

  effects: {
    *effectSetPassageInfo({ payload }, { call, put }) {
      const pid = payload.passageId;
      try {
        // 调用后端接口请求数据
        const response: API.PassageInfoVO = yield call(getPassageInfoUsingGet, {
          pid,
        }); // 假设我们有一个 getPassageInfo 的 API 请求
        if (response) {
          //时间戳格式化
          response.accessTime = formatTimestamp(response.accessTime);
          // console.log('response：' + stringify(response));
          // 如果请求成功，更新 state
          yield put({ type: 'reduceSetPassageInfo', payload: response });
        }
      } catch (error) {
        message.error('获取 PassageInfo 信息失败');
      }
    },
  },
  //reducers是同步action，
  reducers: {
    //state 是当前 model中存储的状态数据。此处指passageInfo
    //payload 是传入该 reducer 的参数，也可以从 effects 中通过 yield put() 触发的
    reduceSetPassageInfo(state: any, { payload }: any) {
      // console.log('reduceSetPassageInfoPayload：' + payload);

      //state是旧数据
      //payload是传入的新数据
      //防止页面刷新后数据消失，这里存入sessionStorage
      // const encryptPassageInfo = encrypt(payload);
      // const pid = payload.passageId;
      // console.log('response.pid：' + payload.passageId);
      // const oldData = sessionStorage.getItem(`passageInfo:${pid}`);
      // if (oldData) {
      //   return { ...JSON.parse(oldData) };
      // }
      // sessionStorage.setItem(`passageInfo:${pid}`, payload);
      // console.log(stringify(payload));
      // console.log(stringify(state));
      return {
        ...state,
        ...payload,
      };
    },
    // 添加一个新的reducer来获取并解密数据
    reduceGetPassageInfo(state: any, { payload }: string) {
      const pid = payload;
      const encryptedData = sessionStorage.getItem(`passageInfo:${pid}`);
      // console.log('reduceGetPassageInfo：' + encryptedData);
      // message.error('请返回上一界面重新进入');
      if (encryptedData) {
        // const data = JSON.parse(encryptedData);
        // const decryptedData = decrypt(encryptedData);
        return {
          ...state,
          ...{ encryptedData },
        };
      }
      return state;
    },
  },
};
