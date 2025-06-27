// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/passage/getPassageList */
export async function getPassageList(
  body: API.AdminPassageQueryPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListAdminPassageVO>(
    '/admin/passage/getPassageList',
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

/** 此处后端没有提供注释 GET /admin/passage/publish/${param0} */
export async function publishPassage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.publishPassageParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/admin/passage/publish/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/passage/reject/${param0} */
export async function rejectPassage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.rejectPassageParams,
  options?: { [key: string]: any },
) {
  const { passageId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/admin/passage/reject/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
