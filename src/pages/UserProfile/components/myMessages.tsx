import { formatTimestampMinutes } from '@/utils/utils';
import { history, useDispatch, useSelector } from '@umijs/max';
import { Avatar, Button, List, Popover } from 'antd';
import { useEffect, useState } from 'react';

//该组件展示我的文章的评论

const MessageList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const page = new URLSearchParams(location.search).get('page');

  // const comment: API.CommentVO[] = useSelector((state: any) => state.comment);
  const { records, total } = useSelector((state) => ({
    records: state.comment.records,
    total: state.comment.total,
  }));
  // console.log('records：' + stringify(records));
  // console.log('total：' + stringify(records));

  // const [total, setTotal] = useState(0); // 数据总数，用于分页
  const loadMoreData = () => {
    setLoading(true);
    //我的消息和文章评论都是commentVO，那么用同一个state
    dispatch({
      type: 'comment/effectGetMyMessage',
      payload: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
    });
    setLoading(false);
  };

  useEffect(() => {
    // 从 URL 获取页码
    // const page = searchParams.get('page');
    if (localStorage.getItem('loginUser')) {
      if (page) {
        setCurrentPage(Number(page)); // 更新分页
      } else {
        setCurrentPage(1);
      }
      loadMoreData();
      // setTotal(records.length);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // 从 URL 获取页码
    // const page = searchParams.get('page');
    if (localStorage.getItem('loginUser')) {
      if (page) {
        setCurrentPage(Number(page)); // 更新分页
      } else {
        setCurrentPage(1);
      }
      loadMoreData();
      // setTotal(records.length);
    }
    setLoading(false);
  }, [currentPage, page]);

  //控制删除提示框的显隐
  const [popoverVisible, setPopoverVisible] = useState(null);
  // 删除评论
  const handleDelete = (commentId: number, passageId: string) => {
    // console.log(commentId);

    dispatch({
      type: 'comment/effectDeleteComment',
      payload: { commentId, passageId },
    });
  };
  //是否删除评论的提示框
  const deleteConfirmContent = (commentId: number, passageId: string) => (
    <div>
      <Button
        type="primary"
        danger
        size="small"
        onClick={() => handleDelete(commentId, passageId)}
        style={{ marginRight: 8 }}
      >
        确认
      </Button>
      <Button size="small" onClick={() => setPopoverVisible(null)}>
        取消
      </Button>
    </div>
  );

  return (
    <List
      loading={loading}
      pagination={{
        onChange: (page, pageSize) => {
          setPageSize(pageSize);
          setCurrentPage(page);
          history.push(`?page=${page}`);
        },
        showTotal: (total, range) => `${range[0]}-${range[1]} | 共 ${total} 条`,
        pageSize: pageSize,
        position: 'top',
        total: total,
        current: currentPage,
      }}
      dataSource={records}
      renderItem={(item) => (
        <List.Item key={item.commentId}>
          <List.Item.Meta
            avatar={
              <>
                <Avatar src={item.avatarUrl} />
              </>
            }
            title={
              <>
                <b>{item.userName}</b>
                <h5>
                  {formatTimestampMinutes(item.commentTime)}
                  &nbsp;&nbsp;&nbsp; IP：{item.ipAddress}
                </h5>
              </>
            }
            description={
              <text style={{ color: 'black', fontSize: '13px' }}>
                {item.content}
              </text>
            }
          />
          {item.canDelete && (
            <Popover
              title="确定删除此评论?"
              trigger="click"
              placement="top"
              overlayStyle={{ width: '130px' }}
              content={deleteConfirmContent(item.commentId, item.passageId)}
              visible={popoverVisible === item.commentId}
              onVisibleChange={(visible) => {
                if (!visible) {
                  setPopoverVisible(null); // 关闭时清空
                } else {
                  setPopoverVisible(item.commentId); // 点击时打开Popover
                }
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  width: '50px',
                  cursor: 'pointer',
                  color: 'red',
                }}
              >
                删除
              </div>
            </Popover>
          )}
        </List.Item>
      )}
    />
  );
};

export default MessageList;
