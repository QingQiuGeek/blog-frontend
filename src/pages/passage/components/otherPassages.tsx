import HotPassage from '@/pages/Home/components/hotPassage';
import { getOtherPassagesByUserId } from '@/services/blog/passageController';
import { ProCard } from '@ant-design/pro-components';
import { history, useDispatch, useParams } from '@umijs/max';
import { Typography, message } from 'antd';
import { useEffect, useState } from 'react';

const { Paragraph } = Typography;
const OhterPassages = ({ setPassageNum }: any) => {
  //点击其他文章时监控url是否发生变化，提前把passageInfo存入dva
  const { authorId, passageId } = useParams();
  // console.log('other-passageId：' + passageId);

  const [authorPassages, setAuthorPassages] = useState<API.PassageTitleVO[]>(
    [],
  );

  useEffect(() => {
    const fetchAuthorPassages = async () => {
      try {
        const res = await getOtherPassagesByUserId({
          uid: authorId,
        });
        // console.log('authorPassages: ' + stringify(res));
        setAuthorPassages(res);
      } catch (error) {
        message.error('作者其他文章获取失败' + error);
      }
    };
    fetchAuthorPassages();
  }, [authorId, passageId]); // 当 id 变化时重新请求数据
  setPassageNum(authorPassages.length);
  // console.log('authorPassages：' + stringify(authorPassages));
  const dispatch = useDispatch();
  const otherPassage = (authorId: any, passageId: any) => {
    history.push(`/passage/passageDetails/${authorId}/${passageId}`);
    //跳转到其他文章后，url发生变化，那么dispatch从后端请求要跳转文章的passageInfo
    dispatch({
      type: 'passageInfo/effectSetPassageInfo',
      payload: { passageId },
    });
  };
  return (
    <>
      {authorPassages.length > 1 ? (
        <ProCard
          style={{
            border: '1px solid  #13C2C2',
          }}
          hoverable
          title="作者的其他文章"
        >
          {authorPassages.map(
            (passage: API.PassageTitleVO, index) =>
              passage.passageId !== passageId && (
                <Paragraph key={index}>
                  <ul style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    <li>
                      <a
                        onClick={() =>
                          otherPassage(authorId, passage.passageId)
                        }
                      >
                        {passage.title}
                      </a>
                    </li>
                  </ul>
                </Paragraph>
              ),
          )}
        </ProCard>
      ) : (
        <HotPassage />
      )}
    </>
  );
};

export default OhterPassages;
