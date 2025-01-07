// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** commentPassage POST /api/comment */
export async function commentPassageUsingPost(
  body: API.CommentDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteComment POST /api/comment/delete */
export async function deleteCommentUsingPost(
  body: API.DeleteCommentDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/comment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCommentByCursor POST /api/comment/getCommentByCursor */
export async function getCommentByCursorUsingPost(
  body: API.CursorCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListCommentVO_>(
    '/api/comment/getCommentByCursor',
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
