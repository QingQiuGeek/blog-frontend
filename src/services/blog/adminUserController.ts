// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/user/addUser */
export async function addUser(
  body: API.AddUserDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRLong>('/admin/user/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /admin/user/delete/${param0} */
export async function deleteUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserByIdParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/admin/user/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/user/disable/${param0} */
export async function banUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.banUserParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/admin/user/disable/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/user/getByIdList */
export async function getByIdList(
  body: API.GetUserByIdListRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRListAdminUserVO>('/admin/user/getByIdList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/user/getUserList */
export async function getUserList(
  body: API.AdminUserQueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListAdminUserVO>('/admin/user/getUserList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
