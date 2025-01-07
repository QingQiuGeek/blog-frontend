import { getCommentsUsingPost } from '@/services/blog/adminCommentController';
import { deleteCommentUsingPost } from '@/services/blog/commentController';
import { validateNum } from '@/utils/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Avatar, Button, Popconfirm, message } from 'antd';
import { useRef, useState } from 'react';

type CommentItem = {
  commentId: number;
  commentTime: number;
  authorId: number;
  userName: string;
  avatarUrl: string;
  ipAddress: string;
  commentUserId: number;
  content: string;
  passageId: string;
};

//TODO 切换分页，首列序号变化
const CommentManage = () => {
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<CommentItem[]>([]);
  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(10); // 默认每页10条
  const [loading, setLoading] = useState<boolean>(true);
  const deleteComment = async (commentId: number, passageId: string) => {
    try {
      const res: API.BaseResponseBoolean_ = await deleteCommentUsingPost({
        commentId: commentId,
        passageId: passageId,
      });
      if (res) {
        message.success('删除成功');
        setDataSource(
          dataSource.filter((item) => item.commentId !== commentId),
        );
        setTotal(total - 1);
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      message.error('删除异常：' + error);
    }
  };
  const columns: ProColumns<CommentItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: 'CID',
      tooltip: '评论ID',
      dataIndex: 'commentId',
      width: 85,
      sorter: (a, b) => a.commentId - b.commentId,
      align: 'center',
    },
    {
      title: '评论内容',
      align: 'center',
      width: 100,
      search: false,
      ellipsis: true,
      dataIndex: 'content',
    },
    {
      title: 'PID',
      tooltip: '文章ID',
      dataIndex: 'passageId',
      ellipsis: true,
      width: 160,
      align: 'center',
    },
    {
      title: 'AID',
      tooltip: '文章作者ID',
      dataIndex: 'authorId',
      width: 80,
      sorter: (a, b) => a.authorId - b.authorId,
      align: 'center',
    },
    {
      title: '头像',
      search: false,
      tooltip: '评论用户头像',
      render: (text, record, _, action) => [
        <Avatar size="small" key={record.commentId} src={record.avatarUrl} />,
      ],
      width: 100,
      align: 'center',
    },
    {
      title: '用户名',
      tooltip: '评论用户名',
      align: 'center',
      width: 80,
      search: false,
      dataIndex: 'userName',
      ellipsis: true,
    },
    {
      title: '用户ID',
      tooltip: '评论用户ID',
      align: 'center',
      width: 80,
      dataIndex: 'commentUserId',
    },
    {
      title: 'IP',
      align: 'center',
      tooltip: '评论IP',
      search: false,
      width: 100,
      dataIndex: 'ipAddress',
      ellipsis: true,
    },
    {
      title: '评论时间',
      align: 'center',
      key: 'commentTime',
      width: 100,
      dataIndex: 'commentTime',
      valueType: 'dateTime',
      sorter: (a, b) => a.commentTime - b.commentTime,
      hideInSearch: true,
    },
    {
      title: '评论时间',
      dataIndex: 'commentTime',
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
      width: 80,
      key: 'option',
      render: (text, record, _, action) => {
        return [
          <>
            <Popconfirm
              key={'delete'}
              // TODO 后期可以加上驳回、删除理由功能
              title="确定删除该评论吗?"
              onConfirm={() => {
                deleteComment(record.commentId, record.passageId);
              }}
            >
              <Button variant="filled" size="small" style={{ color: 'red' }}>
                删除
              </Button>
            </Popconfirm>
          </>,
        ];
      },
    },
  ];
  return (
    <ProTable<CommentItem>
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
          passageId: params?.passageId,
          commentId: validateNum(params?.commentId)
            ? params?.commentId
            : undefined,
          commentUserId: validateNum(params?.commentUserId)
            ? params?.commentUserId
            : undefined,
        };
        try {
          const res: API.BaseResponsePageListCommentVO_ =
            await getCommentsUsingPost(queryParam);
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
      headerTitle="评论列表"
    />
  );
};

export default CommentManage;
