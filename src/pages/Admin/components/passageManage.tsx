import {
  getPassageList,
  publishPassage,
  rejectPassage,
} from '@/services/blog/adminPassageController';
import { deleteByPassageId } from '@/services/blog/passageController';
import { validateNum } from '@/utils/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Flex, Popconfirm, Tag, message } from 'antd';
import { useRef, useState } from 'react';

type PassageItem = {
  accessTime: number;
  authorId: number;
  collectNum: number;
  commentNum: number;
  passageId: number;
  ptagsMap: Record<string, any>;
  thumbNum: number;
  title: string;
  viewNum: number;
  status: number;
};
const rejPassage = async (passageId: number) => {
  try {
    const res: API.BRBoolean = await rejectPassage({
      passageId: passageId,
    });
    if (res) {
      message.success('文章驳回');
    } else {
      message.error('驳回失败');
    }
  } catch (error) {
    message.error('审核异常：' + error);
  }
};
const pubPassage = async (passageId: number) => {
  try {
    const res: API.BRBoolean = await publishPassage({
      passageId: passageId,
    });
    if (res) {
      message.success('审核通过');
    } else {
      message.error('审核失败');
    }
  } catch (error) {
    message.error('审核异常：' + error);
  }
};

//TODO 切换分页，首列序号变化
const PassageManage = () => {
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<PassageItem[]>([]);
  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(10); // 默认每页10条
  const [loading, setLoading] = useState<boolean>(true);
  const deletePassage = async (passageId: number) => {
    try {
      const res: API.BRBoolean = await deleteByPassageId({
        passageId: passageId,
      });
      if (res) {
        message.success('删除成功');
        setDataSource(
          dataSource.filter((item) => item.passageId !== passageId),
        );
        setTotal(total - 1);
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      message.error('删除异常：' + error);
    }
  };
  const columns: ProColumns<PassageItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: 'PID',
      dataIndex: 'passageId',
      copyable: true,
      ellipsis: true,
      width: 100,
      sorter: (a, b) => a.passageId - b.passageId,
      align: 'center',
    },
    {
      title: 'UID',
      dataIndex: 'authorId',
      width: 50,
      sorter: (a, b) => a.authorId - b.authorId,
      align: 'center',
    },
    {
      //TODO 标题搜索模糊查询
      title: '标题',
      copyable: true,
      align: 'center',
      width: 100,
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '文章状态',
      dataIndex: 'status',
      align: 'center',
      search: false,
      width: 100,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        0: {
          text: '草稿',
          status: 'default',
        },
        1: {
          text: '待审核',
          status: 'processing',
        },
        2: {
          text: '已发布',
          status: 'success',
        },
        3: {
          text: '驳回',
          status: 'error',
        },
      },
    },
    {
      title: '点赞',
      search: false,
      dataIndex: 'thumbNum',
      width: 60,
      sorter: (a, b) => a.thumbNum - b.thumbNum,
      align: 'center',
    },
    {
      title: '收藏',
      search: false,
      dataIndex: 'collectNum',
      width: 60,
      sorter: (a, b) => a.collectNum - b.collectNum,
      align: 'center',
    },
    {
      title: '评论',
      search: false,
      dataIndex: 'commentNum',
      width: 60,
      sorter: (a, b) => a.commentNum - b.commentNum,
      align: 'center',
    },
    {
      title: '浏览',
      search: false,
      dataIndex: 'viewNum',
      width: 60,
      sorter: (a, b) => a.viewNum - b.viewNum,
      align: 'center',
    },
    {
      //TODO 内容太长被遮挡
      title: '文章标签',
      dataIndex: 'pTags',
      ellipsis: true,
      align: 'center',
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
          {Object.entries(record.ptagsMap || {})?.map(([key, tag]) => (
            <Tag key={key} color="#13c2c2" style={{ marginBottom: '15px' }}>
              {tag}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      title: '创建时间',
      align: 'center',
      key: 'accessTime',
      width: 100,
      dataIndex: 'accessTime',
      valueType: 'dateTime',
      sorter: (a, b) => a.accessTime - b.accessTime,
      hideInSearch: true,
    },
    {
      title: '发布时间',
      dataIndex: 'accessTime',
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
      ellipsis: true,
      key: 'option',
      render: (text, record, _, action) => {
        const status = record.status;
        if (record.status === 0) {
          return null;
        }
        return [
          <>
            {status === 1 && (
              <>
                <Button
                  type={'default'}
                  variant="filled"
                  size="small"
                  key={'ban'}
                  onClick={() => {
                    rejPassage(record.passageId);
                  }}
                  style={{ color: 'orange' }}
                >
                  驳回
                </Button>
                <Button
                  type={'default'}
                  variant="filled"
                  size="small"
                  key={'ban'}
                  onClick={() => {
                    pubPassage(record.passageId);
                  }}
                  style={{ color: 'green' }}
                >
                  通过
                </Button>
              </>
            )}
            {status === 2 && (
              <>
                <Button
                  type={'default'}
                  variant="filled"
                  size="small"
                  key={'ban'}
                  onClick={() => {
                    rejPassage(record.passageId);
                  }}
                  style={{ color: 'orange' }}
                >
                  驳回
                </Button>
                <Popconfirm
                  key={'delete'}
                  // TODO 后期可以加上驳回、删除理由功能
                  title="确定删除该文章吗?"
                  onConfirm={() => {
                    deletePassage(record.passageId);
                  }}
                >
                  <Button
                    variant="filled"
                    size="small"
                    style={{ color: 'red' }}
                  >
                    删除
                  </Button>
                </Popconfirm>
              </>
            )}
            {status === 3 && (
              <>
                <Button
                  type={'default'}
                  variant="filled"
                  size="small"
                  key={'ban'}
                  onClick={() => {
                    pubPassage(record.passageId);
                  }}
                  style={{ color: 'green' }}
                >
                  通过
                </Button>
                <Popconfirm
                  key={'delete'}
                  // TODO 后期可以加上驳回、删除理由功能
                  title="确定删除该文章吗?"
                  onConfirm={() => {
                    deletePassage(record.passageId);
                  }}
                >
                  <Button
                    variant="filled"
                    size="small"
                    style={{ color: 'red' }}
                  >
                    删除
                  </Button>
                </Popconfirm>
              </>
            )}
          </>,
        ];
      },
    },
  ];
  return (
    <ProTable<PassageItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      debounceTime={500}
      loading={loading}
      dataSource={dataSource}
      request={async (params, sort, filter) => {
        // console.log('params：' + stringify(params));
        const queryParam = {
          currentPage: currentPage, // 当前页码
          pageSize: pageSize, // 每页显示的记录数
          endTime: params?.endTime,
          startTime: params?.startTime,
          authorId: validateNum(params?.authorId)
            ? params?.authorId
            : undefined,
          passageId: validateNum(params?.passageId)
            ? params?.passageId
            : undefined,
          title: params?.title,
        };
        try {
          const res: API.BRPageListAdminPassageVO = await getPassageList(
            queryParam,
          );
          if (res && res.records) {
            setDataSource(res.records.flat());
            setTotal(res.total); //总记录数
            setLoading(false);
            // console.log(stringify(res.records.flat()));
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
        onChange(value) {
          // console.log('value: ', value);
        },
      }}
      rowKey="index"
      search={{
        labelWidth: 'auto',
        defaultCollapsed: false,
        collapseRender: false,
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
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
      pagination={{
        pageSizeOptions: [10, 20, 30],
        pageSize: pageSize,
        total: total,
        showTotal: (total, range) => `${range[0]}-${range[1]} | 共 ${total}`,
        current: currentPage,
        showSizeChanger: true,
        onChange: (page, pageSize) => {
          setPageSize(pageSize);
          setCurrentPage(page);
        },
      }}
      onSubmit={() => {
        message.info('onSubmit');
        actionRef.current?.reload();
      }}
      dateFormatter="number"
      headerTitle="文章列表"
    />
  );
};

export default PassageManage;
