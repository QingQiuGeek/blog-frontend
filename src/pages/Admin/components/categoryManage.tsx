/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addCategory,
  deleteCategory,
  getAdminCategories,
  updateCategory,
} from '@/services/blog/adminCategoryController';
import { validateNum } from '@/utils/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import React, { useRef, useState } from 'react';

type CategoryType = {
  categoryId: number;
  categoryName: string;
  description: string;
  updateTime: number;
  createTime: number;
};

// 类别描述限制40字，类别名和标签名5字
export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(10); // 默认每页10条
  const delCategory = async (categoryId: number) => {
    if (!categoryId) {
      message.error('删除失败,categoryId不存在');
      return;
    }
    try {
      const res: API.BRBoolean = await deleteCategory({
        categoryId,
      });
      if (res) {
        message.success('删除成功');
        setDataSource(
          dataSource.filter((item) => item.categoryId !== categoryId),
        );
        setTotal(total - 1);
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      message.error('删除异常：' + error);
    }
  };
  const columns: ProColumns<CategoryType>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: '类别ID',
      search: false,
      align: 'center',
      dataIndex: 'categoryId',
      readonly: true,
      sorter: (a, b) => a.categoryId - b.categoryId,
    },
    {
      title: '类别ID',
      align: 'center',
      dataIndex: 'categoryId',
      hideInTable: true,
    },
    {
      title: '类别名',
      align: 'center',
      width: 120,
      copyable: true,
      dataIndex: 'categoryName',
      ellipsis: true,
      fieldProps: {
        maxLength: 5,
        showCount: true,
      },
    },
    {
      title: '类别描述',
      align: 'center',
      dataIndex: 'description',
      width: 150,
      ellipsis: true,
      copyable: true,
      search: false,
      fieldProps: {
        maxLength: 40,
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
            action?.startEditable?.(record.categoryId);
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key={'delete'}
          title="确定删除该类别吗?"
          onConfirm={() => {
            delCategory(record.categoryId);
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
      <EditableProTable<CategoryType>
        //TODO rowKey要设置成categoryId，否则编辑错位
        rowKey="categoryId"
        headerTitle="类别列表"
        actionRef={actionRef}
        scroll={{
          // 不能删，删掉表格的列宽设置会失效
          x: 960,
        }}
        recordCreatorProps={{
          position: 'top',
          record: () => ({
            // 新建的行的类别ID，用new_区分
            categoryId: 'new_' + (Math.random() * 1000000).toFixed(0),
          }),
        }}
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        request={async (params, sort, filter) => {
          const queryParam = {
            currentPage: currentPage, // 当前页码
            pageSize: pageSize, // 每页显示的记录数
            endTime: params?.endTime,
            startTime: params?.startTime,
            categoryId: validateNum(params?.categoryId)
              ? params?.categoryId
              : undefined,
            categoryName: params?.categoryName,
          };
          try {
            const res: API.BRPageListCategory = await getAdminCategories(
              queryParam,
            );
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
            // console.log('row.categoryId' + row.categoryId);
            // console.log('data.categoryId' + data.categoryId);
            // console.log(typeof data.categoryId);
            // console.log(data.categoryId.startsWith('new_'));
            if (String(data.categoryId).startsWith('new_')) {
              //categoryId以new_开头说明是新增行，执行add
              if (!data.categoryName || !data.description) {
                // 校验新增行的输入数据
                message.error('请填写完整的数据');
                return null; // 如果没有填写必要的数据，阻止保存
              }
              const updateTime = Date.now();
              const createTime = Date.now();
              try {
                const res: API.BRLong = await addCategory({
                  categoryName: data.categoryName,
                  description: data.description,
                  updateTime: updateTime,
                  createTime: createTime,
                });
                if (res) {
                  message.success('添加成功');
                  console.log('res：' + res);
                  //用回传的数据库的categoryId更换之前的临时id
                  data.categoryId = res;
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
              // 如果 categoryName 改变了，添加到 updateParam 中
              const updateParam = {};
              if (data.categoryName !== row.categoryName) {
                // console.log('data.categoryName' + data.categoryName);
                // console.log('row.categoryName' + row.categoryName);
                updateParam.categoryName = data.categoryName;
              }
              // 如果 description 改变了，添加到 updateParam 中
              if (data.description !== row.description) {
                updateParam.description = data.description;
              }
              //如果categoryName和description都没变化就不执行更新
              if (
                updateParam.categoryName === undefined &&
                updateParam.description === undefined
              ) {
                // console.log('no update' + updateParam);
                return;
              }
              const updateTime = Date.now();
              updateParam.categoryId = data.categoryId;
              updateParam.updateTime = updateTime;
              // console.log(updateParam);
              try {
                const res: API.BRBoolean = await updateCategory(updateParam);
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
