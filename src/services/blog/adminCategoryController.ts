// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addCategory POST /api/admin/category/addCategory */
export async function addCategoryUsingPost(
  body: API.CategoryDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/admin/category/addCategory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCategory PUT /api/admin/category/delete/${param0} */
export async function deleteCategoryUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCategoryUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { categoryId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(
    `/api/admin/category/delete/${param0}`,
    {
      method: 'PUT',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** getAdminCategories POST /api/admin/category/getCategories */
export async function getAdminCategoriesUsingPost(
  body: API.AdminCategoryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListCategory_>(
    '/api/admin/category/getCategories',
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

/** updateCategory POST /api/admin/category/updateCategory */
export async function updateCategoryUsingPost(
  body: API.CategoryDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>(
    '/api/admin/category/updateCategory',
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
