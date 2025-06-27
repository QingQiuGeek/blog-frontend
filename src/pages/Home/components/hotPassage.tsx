import { getTopPassages } from '@/services/blog/passageController';
import { ProCard } from '@ant-design/pro-components';
import { history, useDispatch } from '@umijs/max';
import { Badge, Typography, message } from 'antd';
import { useEffect, useState } from 'react';

const { Paragraph } = Typography;

const HotPassage = () => {
  const [topPassages, setTopPassages] = useState<API.PassageTitleVO[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const getTopPassage = async () => {
    try {
      const res: API.BRListPassageTitleVO = await getTopPassages();
      if (res) {
        setTopPassages(res);
      } else {
        message.error('获取爆款文章失败');
      }
    } catch (error) {
      message.error('获取爆款文章异常：' + error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTopPassage();
  }, []);
  const dispatch = useDispatch();

  const handleClick = (authorId: any, passageId: any) => {
    history.push(`/passage/passageDetails/${authorId}/${passageId}`);
    //跳转到其他文章后，url发生变化，那么dispatch从后端请求要跳转文章的passageInfo
    dispatch({
      type: 'passageInfo/effectSetPassageInfo',
      payload: { passageId },
    });
  };
  return (
    <>
      <Badge.Ribbon text="Hot" color="red">
        <ProCard
          loading={loading}
          title="文章推荐"
          hoverable
          bordered
          style={{ border: '1px solid #13C2C2' }}
        >
          {topPassages?.map((passage: API.PassageTitleVO, index) => {
            return (
              <Paragraph key={index}>
                <ul>
                  <li>
                    <a
                      onClick={() =>
                        handleClick(passage.authorId, passage.passageId)
                      }
                    >
                      {passage.title}
                    </a>
                  </li>
                </ul>
              </Paragraph>
            );
          })}
        </ProCard>
      </Badge.Ribbon>
    </>
  );
};

export default HotPassage;
