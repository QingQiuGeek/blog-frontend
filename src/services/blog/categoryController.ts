// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /category/getCategories */
export async function getCategories(
  body: API.CategoryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListCategoryVO>('/category/getCategories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /category/getCategoriesAndTags */
export async function getCategoriesAndTags(options?: { [key: string]: any }) {
  return request<API.BRListCategoryAndTags>('/category/getCategoriesAndTags', {
    method: 'GET',
    ...(options || {}),
  });
}
