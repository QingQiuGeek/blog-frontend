// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/tag/addTag */
export async function addTag(
  body: API.TagDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRLong>('/admin/tag/addTag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin/tag/delete/${param0} */
export async function deleteTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTagParams,
  options?: { [key: string]: any },
) {
  const { tagId: param0, ...queryParams } = params;
  return request<API.BRBoolean>(`/admin/tag/delete/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/tag/getTags */
export async function getAdminTags(
  body: API.AdminTagPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BRPageListTags>('/admin/tag/getTags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/tag/updateTag */
export async function updateTag(
  body: API.TagDTO,
  options?: { [key: string]: any },
) {
  return request<API.BRBoolean>('/admin/tag/updateTag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
