// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getUserListByName GET /api/user/find/${param0} */
export async function getUserListByNameUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListByNameUsingGETParams,
  options?: { [key: string]: any },
) {
  const { userName: param0, ...queryParams } = params;
  return request<API.BaseResponseListUserVO_>(`/api/user/find/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** follow PUT /api/user/follow/${param0} */
export async function followUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.followUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/user/follow/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/getLoginUser */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/getLoginUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getUserInfo GET /api/user/getUserInfo/${param0} */
export async function getUserInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.BaseResponseUserVO_>(`/api/user/getUserInfo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** login POST /api/user/login */
export async function loginUsingPost(
  body: API.LoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** logout POST /api/user/logout */
export async function logoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** myCollectPassage POST /api/user/myCollect */
export async function myCollectPassageUsingPost(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListPassageInfoVO_>(
    '/api/user/myCollect',
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

/** myFollow POST /api/user/myFollow */
export async function myFollowUsingPost(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListUserVO_>('/api/user/myFollow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** myFollowers POST /api/user/myFollowers */
export async function myFollowersUsingPost(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListUserVO_>('/api/user/myFollowers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** myMessage POST /api/user/myMessage */
export async function myMessageUsingPost(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListCommentVO_>('/api/user/myMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** myPassages POST /api/user/myPassages */
export async function myPassagesUsingPost(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListPassageInfoVO_>(
    '/api/user/myPassages',
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

/** myThumbPassage POST /api/user/myThumb */
export async function myThumbPassageUsingPost(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListPassageInfoVO_>('/api/user/myThumb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** register POST /api/user/register */
export async function registerUsingPost(
  body: API.RegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** sendRegisterCode POST /api/user/sendRegisterCode */
export async function sendRegisterCodeUsingPost(
  body: API.RegisterCodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/sendRegisterCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/user/updateUser */
export async function updateUserUsingPost(
  body: API.UpdateUserDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** uploadAvatar POST /api/user/uploadAvatar */
export async function uploadAvatarUsingPost(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseString_>('/api/user/uploadAvatar', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** getUserInfoData GET /api/user/userInfoData */
export async function getUserInfoDataUsingGet(options?: {
  [key: string]: any;
}) {
  return request<API.BaseResponseUserInfoDataVO_>('/api/user/userInfoData', {
    method: 'GET',
    ...(options || {}),
  });
}
