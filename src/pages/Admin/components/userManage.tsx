import {
  deleteUserByIdUsingDelete,
  disableUserUsingGet,
  getUserListUsingPost,
} from '@/services/blog/adminUserController';
import { validateNum } from '@/utils/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Flex, Popconfirm, Tag, message } from 'antd';
import { useRef, useState } from 'react';
type UserItem = {
  userId: number;
  userName: string;
  interestTag: string[];
  status: number;
  createTime: number;
  role: string;
};

//TODO 用户管理和文章管理，url回退问题
const UserManage = () => {
  const actionRef = useRef<ActionType>();
  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(10); // 默认每页10条
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<UserItem[]>([]);

  // 从 URL 获取当前页和 pageSize
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const current = parseInt(queryParams.get('current') || '1', 10);
  //   const size = parseInt(queryParams.get('pageSize') || '10', 10);
  //   setCurrentPage(current);
  //   setPageSize(size);
  // }, [location.search]);

  const disableUserById = async (uid: number, isDisabled: boolean) => {
    try {
      const res = await disableUserUsingGet({
        userId: uid,
      });
      if (res) {
        message.success(isDisabled ? '禁用成功' : '解禁成功');
        setDataSource((prevData) =>
          prevData?.map((item) =>
            item.userId === uid
              ? { ...item, status: isDisabled ? 0 : 1 }
              : item,
          ),
        );
      }
    } catch (error) {
      message.error('操作失败：' + error);
    }
  };
  const deleteUserById = async (uid: number) => {
    // console.log(uid);
    try {
      const res = await deleteUserByIdUsingDelete({
        userId: uid,
      });
      if (res) {
        message.success('删除成功');
        setDataSource((prevData) =>
          prevData?.filter((item) => item.userId !== uid),
        );
        setTotal(total - 1);
      }
    } catch (error) {
      message.error('删除失败：' + error);
    }
  };
  const columns: ProColumns<UserItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: '用户名',
      align: 'center',

      dataIndex: 'userName',
      ellipsis: true,
    },
    {
      title: 'UID',
      dataIndex: 'userId',
      width: 50,
      sorter: (a, b) => a.userId - b.userId,
      align: 'center',
    },
    {
      title: '权限',
      align: 'center',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        user: {
          text: '用户',
        },
        admin: {
          text: '管理员',
        },
      },
      dataIndex: 'role',
      search: false,
      width: 70,
      render: (_, record) => (
        <Flex>
          <Tag color={record.role === 'admin' ? 'gold' : ''}>{record.role}</Tag>
        </Flex>
      ),
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      align: 'center',
      search: false,
      width: 100,
      filters: true,
      valueType: 'select',
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Error',
        },
        1: {
          text: '正常',
          status: 'Success',
        },
      },
    },
    {
      title: '用户标签',
      dataIndex: 'interestTag',
      ellipsis: true,
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Flex
          style={{
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          {record.interestTag?.map((tag) => (
            <Tag color={'#13c2c2'} key={tag}>
              {tag}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: (a, b) => a.createTime - b.createTime,
      hideInSearch: true,
    },
    {
      //TODO 时间查询只能选相邻两个月，且必须同时选择
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
      valueType: 'option',
      ellipsis: true,
      key: 'option',
      render: (text, record, _, action) => {
        const isDisabled: boolean = record.status === 1;
        const uid = record.userId;
        return [
          <Button
            style={{ color: isDisabled ? 'orange' : 'green' }}
            variant="filled"
            size="small"
            key={'ban'}
            onClick={() => disableUserById(uid, isDisabled)}
          >
            {isDisabled ? '禁用' : '解禁'}
          </Button>,
          <Popconfirm
            key={'delete'}
            title="确定删除该用户吗?"
            onConfirm={() => deleteUserById(record.userId)}
          >
            <Button variant="filled" size="small" style={{ color: 'red' }}>
              删除
            </Button>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <ProTable<UserItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      dataSource={dataSource}
      debounceTime={500}
      loading={loading}
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
      // request可以直接请求后端数据返回数据源，和dataSource选一个即可
      request={async (params, sort, filter) => {
        // console.log('params：' + stringify(params));
        const queryParam = {
          currentPage: currentPage, // 当前页码
          pageSize: pageSize, // 每页显示的记录数
          endTime: params?.endTime,
          startTime: params?.startTime,
          userId: validateNum(params?.userId) ? params?.userId : undefined,
          userName: params?.userName,
        };
        try {
          const res = await getUserListUsingPost(queryParam);
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
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
      }}
      rowKey="index"
      search={{
        labelWidth: 'auto',
        defaultCollapsed: false,
        collapseRender: false,
      }}
      onSubmit={() => {
        message.info('onSubmit');
        actionRef.current?.reload();
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      dateFormatter="number"
      headerTitle="用户列表"
    />
  );
};

export default UserManage;
