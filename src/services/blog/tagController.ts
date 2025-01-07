// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getRandomTags GET /api/tag/getRandomTags */
export async function getRandomTagsUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListTagVO_>('/api/tag/getRandomTags', {
    method: 'GET',
    ...(options || {}),
  });
}
