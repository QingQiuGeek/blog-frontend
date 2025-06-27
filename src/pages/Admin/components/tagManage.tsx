import {} from '@/services/blog/adminCategoryController';
import {
  addTag,
  deleteTag,
  getAdminTags,
  updateTag,
} from '@/services/blog/adminTagController';

import { validateNum } from '@/utils/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import React, { useRef, useState } from 'react';

type TagType = {
  tagId: number;
  categoryId: number;
  tagName: string;
  updateTime: number;
  createTime: number;
};

// 类别描述限制40字，类别名和标签名5字
export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly TagType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(10); // 默认每页10条
  const delTag = async (tagId: number) => {
    if (!tagId) {
      message.error('删除失败,tagId不存在');
      return;
    }
    try {
      const res: API.BRBoolean = await deleteTag({
        tagId,
      });
      if (res) {
        message.success('删除成功');
        setDataSource(dataSource.filter((item) => item.tagId !== tagId));
        setTotal(total - 1);
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      message.error('删除异常：' + error);
    }
  };
  const columns: ProColumns<TagType>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },

    {
      title: '所属类别ID',
      width: 120,
      align: 'center',
      dataIndex: 'categoryId',
      formItemProps: () => {
        return {
          rules: [{ pattern: /^[1-9]\d*$/, message: '请输入纯数字' }],
        };
      },
      sorter: (a, b) => a.categoryId - b.categoryId,
    },
    {
      title: '标签ID',
      search: false,
      align: 'center',
      width: 120,
      dataIndex: 'tagId',
      readonly: true,
      sorter: (a, b) => a.tagId - b.tagId,
    },
    {
      title: '标签ID',
      align: 'center',
      dataIndex: 'tagId',
      hideInTable: true,
    },
    {
      title: '标签名',
      align: 'center',
      width: 120,
      copyable: true,
      dataIndex: 'tagName',
      ellipsis: true,
      fieldProps: {
        maxLength: 5,
        showCount: true,
      },
    },
    {
      title: '创建时间',
      key: 'createTime',
      align: 'center',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      readonly: true,
      sorter: (a, b) => a.createTime - b.createTime,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      key: 'updateTime',
      align: 'center',
      dataIndex: 'updateTime',
      readonly: true,
      valueType: 'dateTime',
      sorter: (a, b) => a.updateTime - b.updateTime,
      hideInSearch: true,
    },
    {
      title: '查询时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          if (!value || !value[0] || !value[1]) {
            return {};
          }
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      width: 150,
      render: (text, record, index, action) => [
        <Button
          key="editable"
          type={'default'}
          variant="filled"
          size="small"
          onClick={() => {
            action?.startEditable?.(record.tagId);
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key={'delete'}
          title="确定删除该标签吗?"
          onConfirm={() => {
            delTag(record.tagId);
          }}
        >
          <Button variant="filled" size="small" style={{ color: 'red' }}>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];
  const actionRef = useRef<ActionType>();

  return (
    <>
      <EditableProTable<TagType>
        //TODO rowKey要设置成tagId，否则编辑错位
        rowKey="tagId"
        headerTitle="标签列表"
        actionRef={actionRef}
        scroll={{
          // 不能删，删掉表格的列宽设置会失效
          x: 960,
        }}
        recordCreatorProps={{
          position: 'top',
          record: () => ({
            // 新建的行的类别ID，用new_区分
            tagId: 'new_' + (Math.random() * 1000000).toFixed(0),
          }),
        }}
        loading={loading}
        columns={columns}
        request={async (params, sort, filter) => {
          const queryParam = {
            currentPage: currentPage, // 当前页码
            pageSize: pageSize, // 每页显示的记录数
            endTime: params?.endTime,
            startTime: params?.startTime,
            tagId: validateNum(params?.tagId) ? params?.tagId : undefined,
            categoryId: validateNum(params?.categoryId)
              ? params?.categoryId
              : undefined,
            tagName: params?.tagName,
          };
          try {
            const res: API.BRPageListCategory = await getAdminTags(queryParam);
            if (res && res.records) {
              setDataSource(res.records.flat());
              setTotal(res.total); //总记录数
              setLoading(false);
              return {
                data: res.records.flat(),
                total: res.total,
                success: true,
              };
            } else {
              message.error('请求数据失败');
              return { data: [], total: 0, success: false }; // 如果请求失败，返回空数据和0总记录数
            }
          } catch (error) {
            message.error('请求数据异常：' + error);
            return { data: [], total: 0, success: false }; // 如果请求失败，返回空数据和0总记录数
          }
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
          collapseRender: false,
        }}
        value={dataSource}
        pagination={{
          pageSizeOptions: [10, 20, 30],
          pageSize: pageSize,
          total: total,
          showTotal: (total, range) => `${range[0]}-${range[1]} | 共 ${total} `,
          current: currentPage,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPageSize(pageSize);
            setCurrentPage(page);
          },
        }}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            // console.log('row.tagId' + row.tagId);
            // console.log('data.tagId' + data.tagId);
            // console.log(typeof data.tagId);
            // console.log(data.tagId.startsWith('new_'));
            if (String(data.tagId).startsWith('new_')) {
              //tagId以new_开头说明是新增行，执行add
              if (!data.tagName) {
                // 校验新增行的输入数据
                message.error('请填写完整的数据');
                return null; // 如果没有填写必要的数据，阻止保存
              }
              const updateTime = Date.now();
              const createTime = Date.now();
              try {
                const res: API.BRLong = await addTag({
                  tagName: data.tagName,
                  updateTime: updateTime,
                  createTime: createTime,
                  categoryId: data.categoryId,
                });
                if (res) {
                  message.success('添加成功');
                  // console.log('res：' + res);
                  //用回传的数据库的tagId更换之前的临时id
                  data.tagId = res;
                  data.updateTime = updateTime;
                  data.createTime = createTime;
                } else {
                  message.error('添加失败');
                }
              } catch (error) {
                message.error('添加异常：' + error);
              }
            } else {
              // row是老数据
              //data是改后的新数据
              // console.log(data);
              // 如果 tagName 改变了，添加到 updateParam 中
              const updateParam = {};
              if (data.tagName !== row.tagName) {
                // console.log('data.tagName' + data.tagName);
                // console.log('row.tagName' + row.tagName);
                updateParam.tagName = data.tagName;
              }
              //如果tagName和description都没变化就不执行更新
              if (updateParam.tagName === undefined) {
                // console.log('no update' + updateParam);
                return;
              }
              const updateTime = Date.now();
              updateParam.tagId = data.tagId;
              updateParam.updateTime = updateTime;
              // console.log(updateParam);
              try {
                const res: API.BRBoolean = await updateTag(updateParam);
                if (res) {
                  message.success('更新成功');
                  data.updateTime = updateTime;
                } else {
                  message.error('更新失败');
                }
              } catch (error) {
                message.error('更新异常：' + error);
              }
            }
          },
          onChange: setEditableRowKeys,
          actionRender: (row, config, defaultDom) => {
            return [defaultDom.save, defaultDom.cancel];
          },
        }}
        onSubmit={() => {
          message.info('onSubmit');
          actionRef.current?.reload();
        }}
      />
    </>
  );
};
