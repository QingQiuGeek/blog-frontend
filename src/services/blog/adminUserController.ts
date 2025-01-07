// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUser POST /api/admin/user/addUser */
export async function addUserUsingPost(
  body: API.AddUserDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/admin/user/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUserById DELETE /api/admin/user/delete/${param0} */
export async function deleteUserByIdUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserByIdUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/admin/user/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** disableUser GET /api/admin/user/disable/${param0} */
export async function disableUserUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.disableUserUsingGETParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(
    `/api/admin/user/disable/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** getByIdList POST /api/admin/user/getByIdList */
export async function getByIdListUsingPost(
  body: API.GetUserByIdListRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListAdminUserVO_>(
    '/api/admin/user/getByIdList',
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

/** getUserList POST /api/admin/user/getUserList */
export async function getUserListUsingPost(
  body: API.AdminUserQueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListAdminUserVO_>(
    '/api/admin/user/getUserList',
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
