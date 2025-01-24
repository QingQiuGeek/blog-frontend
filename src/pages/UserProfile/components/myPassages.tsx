import PassageContent from '@/pages/Home/components/passageSummary';
import {
  deleteByPassageIdUsingDelete,
  setPassagePrivateUsingGet,
} from '@/services/blog/passageController';
import { myPassagesUsingPost } from '@/services/blog/userController';
import { formatTimestamp } from '@/utils/utils';
import {
  ClockCircleOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Link, history } from '@umijs/max';
import {
  Button,
  Flex,
  List,
  Popconfirm,
  PopconfirmProps,
  Space,
  Tag,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';

const MyPassages = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [passages, setPassages] = useState<API.PassageInfoVO[]>([]);

  const [total, setTotal] = useState(0); // 数据总数，用于分页
  const [currentPage, setCurrentPage] = useState<number>(1); // 保存当前页
  const [pageSize, setPageSize] = useState<number>(5); // 默认每页5条
  const page = new URLSearchParams(location.search).get('page');

  const fetchMyPassages = async () => {
    setLoading(true);
    try {
      const res: API.BaseResponsePageListPassageInfoVO_ =
        await myPassagesUsingPost({
          pageSize: pageSize,
          currentPage: currentPage,
        });
      // console.log('res: ' + stringify(res));
      setPassages(res.records.flat()); // 更新 dataSource
      setTotal(res.total);
      setLoading(false);
    } catch (error) {
      message.error('我的文章列表获取失败' + error);
    }
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
      fetchMyPassages();
    }
  }, [currentPage, page]);
  // const loginUser: API.LoginUserVO = useSelector(
  //   (state: any) => state.loginUser,
  // );
  // useEffect(() => {
  //   if (localStorage.getItem('loginUser')) {
  //     //获取我的文章列表
  //     fetchMyPassages();
  //     setLoading(false);
  //   }
  // }, []); //监控空列表

  // console.log('myPassage：' + stringify(passages));
  // setPassageNum(passages.length);
  const data = passages.map((passage: API.PassageInfoVO) => ({
    href: `/passage/passageDetails/${passage.authorId}/${passage.passageId}`,
    title: passage.title,
    description: (
      <Flex gap="4px 0" wrap>
        {Object.entries(passage.ptagsMap || {})?.map(([key, tag]) => (
          <Tag
            key={key}
            color="#13c2c2"
            style={{ height: '24px', right: '15px', top: '3px' }}
          >
            {tag}
          </Tag>
        ))}
      </Flex>
    ),
    summary: passage.summary,
    viewNum: passage.viewNum,
    commentNum: passage.commentNum,
    collectNum: passage.collectNum,
    thumbNum: passage.thumbNum,
    accessTime: formatTimestamp(passage.accessTime), // 发布时间
    passageId: passage.passageId,
    thumbnail: passage.thumbnail,
    status: passage.status,
    isPrivate: passage.isPrivate,
  }));

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const setPrivate = async (passageId: number) => {
    try {
      const res: API.BaseResponseBoolean_ = await setPassagePrivateUsingGet({
        passageId: passageId,
      });
      if (res) {
        // 假设 passages 是一个数组，包含多个 passage 对象
        // const passage = passages.find((p) => p.passageId === passageId); // 找到对应的 passage
        // 更新 passages 数组中的某个 passage 的 isPrivate 字段
        setPassages((prevPassages) =>
          prevPassages.map((passage) =>
            passage.passageId === passageId
              ? { ...passage, isPrivate: passage.isPrivate ^ 1 } // 更新 isPrivate 字段
              : passage,
          ),
        );
        message.success('操作成功');
      } else {
        message.error('文章更新失败');
      }
    } catch (error) {
      message.error('文章更新异常：' + error);
    }
  };
  const handleDelete = async (passageId: number) => {
    try {
      const res = await deleteByPassageIdUsingDelete({
        passageId: passageId,
      });
      if (res) {
        message.success('删除成功');
        setPassages((prevPassages) =>
          prevPassages.filter((passage) => passage.passageId !== passageId),
        );
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      message.error('删除异常：' + error);
    }
  };

  const editPassage = (passageId: number) => {
    if (!passageId) {
      message.error('找不到文章ID');
      return;
    }
    history.push(`/editPassage/${passageId}`);
  };
  const confirm: PopconfirmProps['onConfirm'] = (e, passageId: number) => {
    handleDelete(passageId);
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      loading={loading}
      pagination={{
        onChange: (page, pageSize) => {
          setPageSize(pageSize);
          setCurrentPage(page);
          history.push(`?page=${page}`);
        },
        showTotal: (total, range) => `${range[0]}-${range[1]} | 共 ${total} 篇`,
        pageSize: pageSize,
        position: 'top',
        total: total,
        current: currentPage,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={EyeOutlined}
              text={String(item.viewNum)}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={StarOutlined}
              text={String(item.collectNum)}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text={String(item.thumbNum)}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text={String(item.commentNum)}
              key="list-vertical-message"
            />,
            <IconText
              icon={ClockCircleOutlined}
              text={item.accessTime}
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              style={{
                height: 'auto',
                objectFit: 'contain',
                width: '140px',
              }}
              src={item.thumbnail}
            />
          }
        >
          <List.Item.Meta
            title={
              <>
                <b>标题：</b>
                <Link to={item.href}>{item.title}</Link>
              </>
            }
            description={
              <>
                <Flex style={{ display: 'inline-flex' }} gap="4px 5px">
                  <Button
                    onClick={() => editPassage(item?.passageId)}
                    style={{
                      marginLeft: '20px',
                      width: '55px',
                      right: '20px',
                      fontSize: '11px',
                      height: '30px',
                      fontWeight: 'bold',
                      border: '1px solid #13c2c2',
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    onClick={() => setPrivate(item.passageId)}
                    style={{
                      width: '55px',
                      right: '20px',
                      fontSize: '11px',
                      height: '30px',
                      fontWeight: 'bold',
                      border: '1px solid #13c2c2',
                    }}
                  >
                    {item.isPrivate === 1 ? '设为私密' : '设为公开'}
                  </Button>
                  <Popconfirm
                    title="删除文章"
                    description="确定删除文章吗?"
                    onConfirm={(e) => confirm(e, item.passageId)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      style={{
                        width: '55px',
                        right: '20px',
                        fontSize: '11px',
                        height: '30px',
                        fontWeight: 'bold',
                        border: '1px solid #13c2c2',
                      }}
                    >
                      删除
                    </Button>
                  </Popconfirm>
                  <Tag
                    color="magenta"
                    style={{ height: '24px', right: '15px', top: '3px' }}
                  >
                    {item.status === 0
                      ? '草稿'
                      : item.status === 1
                      ? '待审核'
                      : item.status === 2
                      ? '已发布'
                      : '驳回'}
                  </Tag>
                  {item.description}
                </Flex>
              </>
            }
          />
          <Link to={item.href}>
            <PassageContent>{item.summary}</PassageContent>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default MyPassages;
