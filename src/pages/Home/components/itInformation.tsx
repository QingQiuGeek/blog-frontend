import { ITInformationURL } from '@/constants/URLResources';
import { ProCard } from '@ant-design/pro-components';
import { Badge, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { fetch } from 'umi-request';

const { Paragraph } = Typography;

type ItInformationVO = {
  url?: string;
  title?: string;
};

export default () => {
  const getItInformationList = async () => {
    try {
      const response = await fetch(ITInformationURL);
      if (!response.ok) {
        throw new Error('网络响应失败');
      }
      return await response.json();
    } catch (error) {
      console.error('获取IT资讯失败:', error);
      throw error;
    }
  };

  const [itInformationList, setItInformationList] = useState<ItInformationVO[]>(
    [],
  );

  const [loading, setLoading] = useState<boolean>(true);

  const loadItInformationList = async () => {
    try {
      const res = await getItInformationList();
      console.log(res);
      if (res.success) {
        console.log(res.data);
        setItInformationList(res.data.slice(0, 10));
        setLoading(false);
      } else {
        message.error('获取每日IT资讯失败');
      }
    } catch (error) {
      message.error('获取每日IT资讯异常：' + error);
    }
  };
  useEffect(() => {
    loadItInformationList();
  }, []);

  return (
    <>
      <Badge.Ribbon text="Hot" color="red">
        <ProCard
          loading={loading}
          title="每日IT资讯"
          hoverable
          bordered
          style={{ border: '1px solid #13C2C2' }}
        >
          {itInformationList?.map((information: ItInformationVO, index) => {
            return (
              <Paragraph key={index}>
                <ul style={{ fontSize: '15px', fontWeight: 'bold' }}>
                  <li>
                    <a
                      style={{
                        display: 'inline-block',
                        overflow: 'hidden',
                        textDecoration: 'none',
                        width: '15vw',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                      href={information.url}
                    >
                      {information.title}
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
