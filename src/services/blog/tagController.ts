// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /tag/getRandomTags */
export async function getRandomTags(options?: { [key: string]: any }) {
  return request<API.BRListTagVO>('/tag/getRandomTags', {
    method: 'GET',
    ...(options || {}),
  });
}
