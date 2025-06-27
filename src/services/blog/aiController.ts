// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /ai/chat/sse */
export async function chatSse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatSseParams,
  options?: { [key: string]: any },
) {
  return request<API.SseEmitter>('/ai/chat/sse', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
