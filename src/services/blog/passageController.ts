// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 PUT /passage/collect/${param0} */
export async function collectPassage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.collectPassageParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/passage/collect/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /passage/content/${param0}/${param1} */
export async function getPassageContentByPassageId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPassageContentByPassageIdParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, pid: param1, ...queryParams } = params;
  return request<API.BRPassageContentVO>(
    `/passage/content/${param0}/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 DELETE /passage/delete/${param0} */
export async function deleteByPassageId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteByPassageIdParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/passage/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /passage/editPassage/${param0} */
export async function getEditPassage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEditPassageParams,
  options?: { [key: string]: any },
) {
  const { pid: param0, ...queryParams } = params;
  return request<API.BREditPassageVO>(`/passage/editPassage/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /passage/homePassageList */
export async function getHomePassageList(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListPassageInfoVO>('/passage/homePassageList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /passage/nowPublish */
export async function nowPublish(
  body: API.ParentPassageDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRBoolean>('/passage/nowPublish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /passage/otherPassages/${param0} */
export async function getOtherPassagesByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOtherPassagesByUserIdParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.BRListPassageTitleVO>(`/passage/otherPassages/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /passage/passageInfo/${param0} */
export async function getPassageInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPassageInfoParams,
  options?: { [key: string]: any },
) {
  const { pid: param0, ...queryParams } = params;
  return request<API.BRPassageInfoVO>(`/passage/passageInfo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /passage/save */
export async function savePassage(
  body: API.ParentPassageDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRString>('/passage/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /passage/search */
export async function searchPassage(
  body: API.SearchPassageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListPassageInfoVO>('/passage/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /passage/setPrivate/${param0} */
export async function setPassagePrivate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setPassagePrivateParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/passage/setPrivate/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /passage/thumb/${param0} */
export async function thumbPassage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.thumbPassageParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/passage/thumb/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /passage/timePublish */
export async function timePublish(
  body: API.ParentPassageDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRBoolean>('/passage/timePublish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /passage/topPassages */
export async function getTopPassages(options?: { [key: string]: any }) {
  return request<API.BRListPassageTitleVO>('/passage/topPassages', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /passage/uploadPassageCover */
export async function uploadPassageCover(
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.BRString>('/passage/uploadPassageCover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /passage/uploadPassageImg */
export async function uploadPassageImg(
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.BRString>('/passage/uploadPassageImg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
