// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getComments POST /api/admin/comment/getComments/ */
export async function getCommentsUsingPost(
  body: API.AdminCommentPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListCommentVO_>(
    '/api/admin/comment/getComments/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
