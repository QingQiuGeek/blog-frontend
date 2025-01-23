import { formatTimestampMinutes } from '@/utils/utils';
import { useDispatch, useParams, useSelector } from '@umijs/max';
import { Avatar, Button, Divider, List, Popover, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Comments = () => {
  const [loading, setLoading] = useState(false);

  // const [comment, setComment] = useState<API.CommentVO[]>([]);
  const { authorId, passageId } = useParams();
  let { records, total } = useSelector((state) => ({
    records: state.comment.records,
    total: state.comment.total,
  }));

  // const {comment,total} = useSelector((state: any) => state.comment);
  // console.log(stringify(comment));
  const dispatch = useDispatch();

  const loadMoreData = () => {
    const params = {
      passageId: passageId,
      authorId: authorId,
      lastCommentId:
        records.length > 0 ? records[records.length - 1].commentId : null,
    };
    dispatch({ type: 'comment/effectGetComments', payload: params });
  };

  useEffect(() => {
    setLoading(true);
    loadMoreData();
    setLoading(false);
  }, [passageId]);

  //控制删除提示框的显隐
  const [popoverVisible, setPopoverVisible] = useState(null);
  // 删除评论
  const handleDelete = (commentId: number, passageId: string) => {
    // console.log(commentId);
    // records = records.filter(
    //   (comment: API.CommentVO) => comment.commentId !== commentId,
    // );
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
  // console.log('total：' + total);
  // console.log('records：' + stringify(records));
  // console.log('records.total：' + records.length());
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={records.length}
        next={loadMoreData}
        hasMore={records.length < total}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>我是有底线的! 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={records}
          loading={loading}
          // pagination={{ position: 'top' }}
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
      </InfiniteScroll>
    </div>
  );
};

export default Comments;
