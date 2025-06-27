/* eslint-disable @typescript-eslint/no-unused-vars */
// 全局共享数据示例
import { getPassageInfo } from '@/services/blog/passageController';
import { message } from 'antd';

export default {
  //定义命名空间
  namespace: 'editPassage',
  state: {
    title: '',
    content: '',
    ptags: [],
    summary: '',
    thumbnail: '',
  },
  effects: {
    *effectGetEditPassage({ payload }, { call, put }) {
      const editPassageId = sessionStorage.getItem('editPid');
      if (!editPassageId) {
        return;
      }
      try {
        const response: API.PassageInfoVO = yield call(getPassageInfo, {
          editPassageId,
        }); // 假设我们有一个 getPassageInfo 的 API 请求
        if (response) {
          // 如果请求成功，更新 state
          yield put({ type: 'reduceSetEditPassage', payload: response });
        }
      } catch (error) {
        message.error('获取编辑文章信息失败');
      }
    },
  },
  reducers: {
    reduceSetPassageInfo(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
