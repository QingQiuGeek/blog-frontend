// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/category/addCategory */
export async function addCategory(
  body: API.CategoryDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRLong>('/admin/category/addCategory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin/category/delete/${param0} */
export async function deleteCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCategoryParams,
  options?: { [key: string]: any },
) {
  const { categoryId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/admin/category/delete/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/category/getCategories */
export async function getAdminCategories(
  body: API.AdminCategoryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListCategory>('/admin/category/getCategories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/category/updateCategory */
export async function updateCategory(
  body: API.CategoryDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRBoolean>('/admin/category/updateCategory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
