// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getCategories POST /api/category/getCategories */
export async function getCategoriesUsingPost(
  body: API.CategoryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListCategoryVO_>(
    '/api/category/getCategories',
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

/** getCategoriesAndTags GET /api/category/getCategoriesAndTags */
export async function getCategoriesAndTagsUsingGet(options?: {
  [key: string]: any;
}) {
  return request<API.BaseResponseListCategoryAndTags_>(
    '/api/category/getCategoriesAndTags',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
