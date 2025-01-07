// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getPassageList POST /api/admin/passage/getPassageList */
export async function getPassageListUsingPost(
  body: API.AdminPassageQueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListAdminPassageVO_>(
    '/api/admin/passage/getPassageList',
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

/** publishPassage GET /api/admin/passage/publish/${param0} */
export async function publishPassageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.publishPassageUsingGETParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(
    `/api/admin/passage/publish/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** rejectPassage GET /api/admin/passage/reject/${param0} */
export async function rejectPassageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.rejectPassageUsingGETParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(
    `/api/admin/passage/reject/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
