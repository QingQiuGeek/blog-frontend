// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /comment */
export async function commentPassage(
  body: API.CommentDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRLong>('/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /comment/delete */
export async function deleteComment(
  body: API.DeleteCommentDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRBoolean>('/comment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /comment/getCommentByCursor */
export async function getCommentByCursor(
  body: API.CursorCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListCommentVO>('/comment/getCommentByCursor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
