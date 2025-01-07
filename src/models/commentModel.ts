// 全局共享数据示例

import {
  commentPassageUsingPost,
  deleteCommentUsingPost,
  getCommentByCursorUsingPost,
} from '@/services/blog/commentController';
import { myMessageUsingPost } from '@/services/blog/userController';
import { decrypt } from '@/utils/utils';
import { message } from 'antd';

//umi dva实现
export default {
  //定义命名空间

  namespace: 'comment',
  state: {
    records: [], // 记录数据，初始化为空数组
    total: 0, // 总数，初始化为 0
  },
  effects: {
    //从后端请求评论
    *effectGetComments({ payload }: any, { call, put }) {
      try {
        // console.log(payload);
        const res: API.BaseResponsePageListCommentVO_ = yield call(
          getCommentByCursorUsingPost,
          payload,
        );
        if (res) {
          // console.log(stringify(res));
          const records = res.records.flat();
          const total = res.total;
          // console.log('model-records：' + stringify(records));
          // console.log('model-total：' + total);

          yield put({
            type: 'reducerSetComments',
            payload: { records, total },
          });
        } else {
          message.error('评论获取失败');
        }
      } catch (error) {
        message.error('评论获取失败' + error);
      }
    },
    // 处理异步操作，提交评论
    *effectSubmitComment({ payload }: any, { call, put }) {
      try {
        const res: number = yield call(commentPassageUsingPost, payload);
        // console.log(res);

        if (res) {
          const updatedComment = {
            ...payload, // 保持原来的 payload 数据
            commentId: res, // 将生成的 commentID 添加到 payload 中
          };
          // console.log(stringify(updatedComment));
          //返回值res是插入数据库后生成的commentId
          // 提交成功后更新评论列表
          yield put({
            type: 'reducerAddComment', // 调用 reducer 更新评论列表
            payload: updatedComment, // 新添加的评论
          });
          message.success('评论成功');
        } else {
          message.error('评论失败');
        }
      } catch (error) {
        message.error('出错了，请稍后再试' + error);
      }
    },
    // 处理异步操作
    *effectDeleteComment({ payload }: any, { call, put }) {
      // console.log(payload);

      try {
        const res: boolean = yield call(deleteCommentUsingPost, {
          commentId: payload.commentId,
          passageId: payload.passageId,
        });
        // console.log(res);
        if (res) {
          yield put({
            type: 'reducerDeleteComment',
            payload: payload,
          });
          message.success('该评论已删除');
        } else {
          message.error('删除失败，请稍后再试');
        }
      } catch (error) {
        message.error('出错了，请稍后再试' + error);
      }
    },
    //获取我的消息，即我的所有文章的所有评论
    *effectGetMyMessage({ payload }: any, { call, put }) {
      // console.log('payload：' + payload);
      try {
        // console.log(payload);
        const res: API.BaseResponsePageListCommentVO_ = yield call(
          myMessageUsingPost,
          payload,
        );
        if (res) {
          // console.log(stringify(res));
          const records = res.records.flat();
          const total = res.total;
          yield put({
            type: 'reducerSetComments',
            payload: { records, total },
          });
        } else {
          message.error('我的消息获取失败');
        }
      } catch (error) {
        message.error('我的消息获取失败' + error);
      }
    },
  },
  reducers: {
    reducerDeleteComment(state: any, { payload }: any) {
      // return state.filter(
      //   (comment: API.CommentVO) => comment.commentId !== payload.commentId,
      // );
      return {
        ...state,
        records: state.records.filter(
          (comment: API.CommentVO) => comment.commentId !== payload.commentId,
        ),
        total: state.total - 1,
      };
    },
    reducerSetComments(state: any, { payload }: any) {
      // console.log(stringify(payload));
      return {
        ...state,
        // ...payload,
        //注意新加载的评论不要覆盖老的评论，而是追加
        total: payload.total,
        records: [...state.records, ...payload.records],
      };
      // return Array.isArray(payload) ? payload : state; // 仅当 payload 是数组时才替换
    },
    reducerAddComment(state: any, { payload }: any) {
      // console.log(payload);

      //TODO 评论时获取登录用户的头像，用户名等信息
      const encryptData = localStorage.getItem('loginUser');
      const loginUser: API.LoginUserVO = decrypt(encryptData);
      // console.log(stringify(loginUser));

      // 将登录用户信息添加到 payload 中
      const commentWithUserInfo = {
        ...payload,
        avatarUrl: loginUser.avatarUrl,
        ipAddress: loginUser.ipAddress,
        userName: loginUser.userName,
        canDelete: true,
      };

      // 将新评论添加到评论列表前面
      return {
        ...state,
        total: state.total + 1,
        records: [commentWithUserInfo, ...state.records],
      };
    },
  },
};
