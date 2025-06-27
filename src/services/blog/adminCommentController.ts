// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/comment/getComments/ */
export async function getComments(
  body: API.AdminCommentPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListCommentVO>('/admin/comment/getComments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
