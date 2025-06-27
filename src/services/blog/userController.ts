// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /user/find/${param0} */
export async function getUserListByName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListByNameParams,
  options?: { [key: string]: any },
) {
  const { userName: param0, ...queryParams } = params;
  return request<API.BRListUserVO>(`/user/find/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /user/follow/${param0} */
export async function follow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.followParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/user/follow/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/getLoginUser */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.BRLoginUserVO>('/user/getLoginUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/getUserInfo/${param0} */
export async function getUserInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInfoParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.BRUserVO>(`/user/getUserInfo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/login */
export async function login(
  body: API.LoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRLoginUserVO>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.BRBoolean>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/myCollect */
export async function myCollectPassage(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListPassageInfoVO>('/user/myCollect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/myFollow */
export async function myFollow(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListUserVO>('/user/myFollow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/myFollowers */
export async function myFollowers(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListUserVO>('/user/myFollowers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/myMessage */
export async function myMessage(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListCommentVO>('/user/myMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/myPassages */
export async function myPassages(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListPassageInfoVO>('/user/myPassages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/myThumb */
export async function myThumbPassage(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListPassageInfoVO>('/user/myThumb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/register */
export async function register(
  body: API.RegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRLoginUserVO>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/sendRegisterCode */
export async function sendRegisterCode(
  body: API.RegisterCodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRBoolean>('/user/sendRegisterCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/updateUser */
export async function updateUser(
  body: API.UpdateUserDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRBoolean>('/user/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/uploadAvatar */
export async function uploadAvatar(body: {}, options?: { [key: string]: any }) {
  return request<API.BRString>('/user/uploadAvatar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/userInfoData */
export async function getUserInfoData(options?: { [key: string]: any }) {
  return request<API.BRUserInfoDataVO>('/user/userInfoData', {
    method: 'GET',
    ...(options || {}),
  });
}
