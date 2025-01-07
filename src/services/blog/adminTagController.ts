// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addTag POST /api/admin/tag/addTag */
export async function addTagUsingPost(
  body: API.TagDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/admin/tag/addTag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteTag PUT /api/admin/tag/delete/${param0} */
export async function deleteTagUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTagUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { tagId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/admin/tag/delete/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getAdminTags POST /api/admin/tag/getTags */
export async function getAdminTagsUsingPost(
  body: API.AdminTagPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageListTags_>('/api/admin/tag/getTags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateTag POST /api/admin/tag/updateTag */
export async function updateTagUsingPost(
  body: API.TagDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/admin/tag/updateTag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
