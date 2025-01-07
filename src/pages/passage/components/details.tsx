import {
  collectPassageUsingPut,
  getPassageContentByPassageIdUsingGet,
  getPassageInfoUsingGet,
  thumbPassageUsingPut,
} from '@/services/blog/passageController';
import { formatTimestamp } from '@/utils/utils';
import {
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  ShareAltOutlined,
  StarOutlined,
  StarTwoTone,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useParams } from '@umijs/max';
import {
  Button,
  Divider,
  Flex,
  FloatButton,
  Input,
  Popover,
  QRCode,
  Skeleton,
  Space,
  Tag,
  Typography,
  message,
} from 'antd';
import { debounce } from 'lodash';
import { MdPreview } from 'md-editor-rt';
import { useEffect, useState } from 'react';

const { Title } = Typography;
const PassageDetails = () => {
  //从url中获取路径参数
  const { authorId, passageId } = useParams();

  const currentUrl = location.href;
  // console.log('authorId：' + authorId + '--passageId：' + passageId);
  // const passageInfo = useSelector((state: any) => state.passageInfo);
  const dispatch = useDispatch();

  //标签、sessionstrage null 已解决，原因：后端返回的passageInfo没有passageId
  const [passageInfo, setPassageInfo] = useState<API.PassageInfoVO>();
  const [isthumb, setIsThumb] = useState<boolean>(false);
  const [iscollect, setIsCollect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [passageContent, setPassageContent] = useState<API.PassageContentVO>();
  useEffect(() => {
    //监控passageInfo加载完后设置点赞收藏状态
    setIsCollect(passageInfo?.isCollect);
    setIsThumb(passageInfo?.isThumb);
  }, [passageInfo]);
  const fetchPassageInfo = async () => {
    try {
      const info: API.BaseResponsePassageInfoVO_ = await getPassageInfoUsingGet(
        {
          pid: passageId,
        },
      );
      setPassageInfo(info);
      // console.log('info' + info);
    } catch (error) {
      message.error('文章信息获取失败' + error);
    }
  };
  const fetchPassageContent = async () => {
    try {
      const content: API.PassageContentVO =
        await getPassageContentByPassageIdUsingGet({
          uid: Number(authorId),
          pid: passageId,
        });
      setPassageContent(content);
    } catch (error) {
      message.error('文章内容获取失败' + error);
    }
  };
  // console.log('content:' + stringify(passageContent));
  useEffect(() => {
    fetchPassageInfo();
    fetchPassageContent();
    setLoading(false);
  }, [passageId, authorId]); //这里监控空数组[]，每次进入该页面都渲染一次，而不是只渲染第一次

  const doCollect = debounce(async () => {
    if (!localStorage.getItem('loginUser')) {
      message.info('未登录');
    } else {
      try {
        const res = await collectPassageUsingPut({ passageId: passageId });
        if (res) {
          message.success(iscollect ? '取消收藏成功' : '收藏成功');
          setIsCollect(!iscollect);
        } else {
          message.error('操作失败');
        }
      } catch (error) {
        message.error('出错了，请稍后再试' + error);
      }
    }
  }, 300);
  const doThumb = debounce(async () => {
    if (!localStorage.getItem('loginUser')) {
      message.info('未登录');
    } else {
      try {
        const res = await thumbPassageUsingPut({ passageId: passageId });
        if (res) {
          message.success(isthumb ? '取消点赞成功' : '点赞成功');
          setIsThumb(!isthumb);
        } else {
          message.error('操作失败');
        }
      } catch (error) {
        message.error('出错了，请稍后再试' + error);
      }
    }
  }, 300);

  const [comment, setComment] = useState('');
  const [visible, setVisible] = useState(false); // 用于控制Popover的显示与隐藏
  const doComment = () => {
    if (!localStorage.getItem('loginUser')) {
      message.info('未登录');
    } else {
      if (!comment.trim()) {
        message.info('评论不能为空');
      } else {
        // 评论内容得emoj表情存储到数据库会变成问号,但是前端拿到数据仍然正常展示emoj标签
        const params = {
          content: comment,
          passageId: passageId,
          commentTime: Date.now(),
          authorId: authorId,
        };
        // console.log('effectSubmitComment：' + stringify(params));
        dispatch({ type: 'comment/effectSubmitComment', payload: params });
        setVisible(false);
        setComment('');
      }
    }
  };
  const { TextArea } = Input;
  const popoverContent = (
    <Space direction="vertical">
      <TextArea
        showCount
        maxLength={200}
        style={{ height: '100px', width: '350px', resize: 'none' }}
        value={comment}
        onChange={(e) => setComment(e.target.value)} // 更新评论输入框的内容
        placeholder="请输入评论..."
      />
      <Button style={{ height: '30px' }} onClick={doComment}>
        发表
      </Button>
    </Space>
  );

  // 使用 lodash.debounce 包装该函数，防止短时间内多次触发
  // const debouncedHandleCollectPassage = debounce(doCollect, 3000);
  return (
    <>
      <ProCard
        loading={loading}
        style={{
          bottom: '20px',
          backgroundColor: '#8EC5FC',
          backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
        }}
      >
        <Flex gap="4px 0" wrap>
          <Tag color="#55acee">
            <b style={{ fontSize: '13px' }}>发布时间：</b>
            {formatTimestamp(passageInfo?.accessTime)}
          </Tag>
          <Tag color="#cd201f">
            <b style={{ fontSize: '13px' }}>收藏数量：</b>
            {passageInfo?.collectNum}
          </Tag>
          <Tag color="#3b5999">
            <b style={{ fontSize: '13px' }}>浏览数量：</b>
            {passageInfo?.viewNum}
          </Tag>
          <Tag color="#55acee">
            <b style={{ fontSize: '13px' }}>评论数量：</b>
            {passageInfo?.commentNum}
          </Tag>
          <Tag color="gold">
            <b style={{ fontSize: '13px' }}>点赞数量：</b>
            {passageInfo?.thumbNum}
          </Tag>
          {Object.entries(passageInfo?.ptagsMap || {})?.map(([key, tag]) => (
            <Tag key={key} color="#13c2c2">
              {tag}
            </Tag>
          ))}
        </Flex>
      </ProCard>
      <Typography>
        <Title level={2}>{passageInfo?.title}</Title>
        <Divider
          orientation="left"
          orientationMargin="0"
          style={{ fontWeight: 'bold' }}
        >
          🔖摘要
        </Divider>
        {passageInfo?.summary}
        <Divider
          orientation="left"
          orientationMargin="0"
          style={{ fontWeight: 'bold' }}
        >
          🔖正文
        </Divider>
        {loading ? <Skeleton /> : <MdPreview value={passageContent?.content} />}
      </Typography>
      {/* 1370 */}
      <FloatButton.Group>
        <FloatButton
          icon={iscollect ? <StarTwoTone /> : <StarOutlined />}
          onClick={doCollect}
        />
        <FloatButton
          icon={isthumb ? <HeartTwoTone /> : <HeartOutlined />}
          onClick={doThumb}
        />
        <Popover
          content={popoverContent}
          visible={visible}
          onVisibleChange={(newVisible) => setVisible(newVisible)}
          title="发表一条友善的评论吧🥰~"
          placement="left"
          // 设置为click，这样评论时输入框不会消失
          trigger="click"
        >
          <FloatButton
            icon={<MessageOutlined />}
            onClick={() => setVisible(true)}
          />
        </Popover>

        {/*根据url生成value  */}
        <Popover
          placement="left"
          content={<QRCode value={currentUrl} bordered={false} size={100} />}
        >
          <FloatButton icon={<ShareAltOutlined />} />
        </Popover>
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
    </>
  );
};

export default PassageDetails;
// export default connect(({ passageInfo }) => ({ passageInfo }))(PassageDetails);
