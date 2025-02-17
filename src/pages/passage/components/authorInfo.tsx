import {
  followUsingPut,
  getUserInfoUsingGet,
} from '@/services/blog/userController';
import { ProCard } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import type { DescriptionsProps } from 'antd';
import {
  Avatar,
  Button,
  Descriptions,
  Flex,
  Tag,
  Typography,
  message,
} from 'antd';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const { Text } = Typography;
const AuthorInfo = ({ passageNum }) => {
  //从url中拿到作者id
  const { authorId } = useParams();
  const [authorInfo, setAuthorInfo] = useState<API.UserVO>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState(false);
  useEffect(() => {
    //根据authorID获取作者信息
    const fetchAuthorInfo = async () => {
      try {
        const res: API.UserVO = await getUserInfoUsingGet({
          uid: authorId,
        });
        // console.log('authorInfo: ' + res);
        setAuthorInfo(res);
        setIsFollowed(res.isFollow);
      } catch (error) {
        message.error('文章作者信息获取失败' + error);
      }
    };
    fetchAuthorInfo();
  }, [authorId]); // 当 id 变化时重新请求数据

  const userItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户名',
      children: authorInfo?.userName,
    },
    {
      key: '2',
      label: '粉丝数量',
      children: authorInfo?.followerNum,
    },
    {
      key: '3',
      label: '文章数量',
      children: passageNum,
    },
    {
      key: '4',
      label: 'IP属地',
      children: authorInfo?.ipAddress,
    },
  ];

  // 处理按钮点击事件
  const handleClick = debounce(async () => {
    if (localStorage.getItem('loginUser')) {
      setLoading(true); // 开始加载状态
      try {
        //请求后端
        const res = await followUsingPut({
          userId: authorId,
        });
        if (res) {
          setIsFollowed(!isFollowed);
          message.success(isFollowed ? '取消关注成功' : '关注成功');
        } else {
          message.error('操作失败');
        }
      } catch (error) {
        message.error('出错了，请稍后再试');
      }
      setLoading(false); // 请求完成后关闭加载状态
    } else {
      message.info('当前未登录，请登录或注册！');
    }
  }, 300);

  //点击其他文章时监控url是否发生变化，提前把passageInfo存入dva
  // const { authorId, passageId } = useParams();
  // console.log('other-passageId：' + passageId);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   //把数据传入dva，在passageDetails组件中获取
  //   dispatch({
  //     type: 'passageInfo/effectSetPassageInfo',
  //     payload: { passageId },
  //   });
  // }, [authorId, passageId]);

  return (
    <>
      <ProCard
        hoverable
        style={{
          border: '1px solid #13C2C2',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <Avatar
            shape="square"
            size={100}
            style={{ right: '10px', width: '160px' }}
            src={<img src={authorInfo?.avatarUrl} alt="头像"></img>}
          />
          <Flex
            gap="5px 0px"
            wrap
            style={{
              width: '100%',
              alignItems: 'flex-start', // 让子元素顶部对齐
            }}
          >
            <div style={{ width: 'auto' }}>
              <Button
                type={isFollowed ? 'primary' : 'default'}
                onClick={handleClick}
                loading={loading}
                style={{
                  width: '50px',
                  fontSize: '11px',
                  height: '25px',
                  fontWeight: 'bold',
                  border: '1px solid #13c2c2',
                }}
              >
                {isFollowed ? '取关' : '关注'}
              </Button>
              <br></br>
              <Text
                mark
                style={{
                  fontWeight: 'bold',
                }}
              >
                Ta的介绍
              </Text>
              <br></br>
              <Text style={{ fontSize: '13px' }}>{authorInfo?.profiles}</Text>
            </div>
          </Flex>
        </div>

        <br />
        <Descriptions
          items={userItems}
          column={2}
          title={authorInfo?.interestTag.map((tag, index) => (
            // console.log(tag),
            <>
              <Tag key={index} color="#13c2c2">
                {tag}
              </Tag>
            </>
          ))}
        />
      </ProCard>
    </>
  );
};

export default AuthorInfo;
