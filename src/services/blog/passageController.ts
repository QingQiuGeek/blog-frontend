// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** collectPassage PUT /api/passage/collect/${param0} */
export async function collectPassageUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.collectPassageUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/passage/collect/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getPassageContentByPassageId GET /api/passage/content/${param1}/${param0} */
export async function getPassageContentByPassageIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPassageContentByPassageIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { pid: param0, uid: param1, ...queryParams } = params;
  return request<API.BaseResponsePassageContentVO_>(
    `/api/passage/content/${param1}/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** deleteByPassageId DELETE /api/passage/delete/${param0} */
export async function deleteByPassageIdUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteByPassageIdUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/passage/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getEditPassage GET /api/passage/editPassage/${param0} */
export async function getEditPassageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEditPassageUsingGETParams,
  options?: { [key: string]: any },
) {
  const { pid: param0, ...queryParams } = params;
  return request<API.BaseResponseEditPassageVO_>(
    `/api/passage/editPassage/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** getHomePassageList POST /api/passage/homePassageList */
export async function getHomePassageListUsingPost(
  body: API.QueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListPassageInfoVO_>(
    '/api/passage/homePassageList',
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

/** getOtherPassagesByUserId GET /api/passage/otherPassages/${param0} */
export async function getOtherPassagesByUserIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOtherPassagesByUserIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.BaseResponseListPassageTitleVO_>(
    `/api/passage/otherPassages/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** getPassageInfo GET /api/passage/passageInfo/${param0} */
export async function getPassageInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPassageInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  const { pid: param0, ...queryParams } = params;
  return request<API.BaseResponsePassageInfoVO_>(
    `/api/passage/passageInfo/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** addPassage POST /api/passage/save */
export async function addPassageUsingPost(
  body: API.ParentPassageDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/passage/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** searchPassage POST /api/passage/search */
export async function searchPassageUsingPost(
  body: API.SearchPassageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListPassageInfoVO_>(
    '/api/passage/search',
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

/** setPassagePrivate GET /api/passage/setPrivate/${param0} */
export async function setPassagePrivateUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setPassagePrivateUsingGETParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(
    `/api/passage/setPrivate/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** thumbPassage PUT /api/passage/thumb/${param0} */
export async function thumbPassageUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.thumbPassageUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/passage/thumb/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getTopPassages GET /api/passage/topPassages */
export async function getTopPassagesUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListPassageTitleVO_>(
    '/api/passage/topPassages',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** uploadPassageCover POST /api/passage/uploadPassageCover */
export async function uploadPassageCoverUsingPost(
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

  return request<API.BaseResponseString_>('/api/passage/uploadPassageCover', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** uploadPassageImg POST /api/passage/uploadPassageImg */
export async function uploadPassageImgUsingPost(
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

  return request<API.BaseResponseString_>('/api/passage/uploadPassageImg', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
