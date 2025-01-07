import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic } = StatisticCard;

const Analysis = () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="数据概览"
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                hoverable
                statistic={{
                  title: '已运行',
                  value: '82',
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                hoverable
                statistic={{
                  title: '今日新增用户',
                  value: 234,
                  description: (
                    <Statistic title="昨日" value="85" trend="down" />
                  ),
                }}
              />
              <StatisticCard
                hoverable
                statistic={{
                  title: '总用户',
                  value: '134',
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                hoverable
                statistic={{
                  title: '今日访问量',
                  value: 234,
                  description: <Statistic title="昨日" value="8" trend="up" />,
                }}
              />
              <StatisticCard
                hoverable
                statistic={{
                  title: '总访问量',
                  value: '134',
                }}
              />
            </ProCard>

            <ProCard split="vertical">
              <StatisticCard
                hoverable
                statistic={{
                  title: '今日新增博客',
                  value: 234,
                  description: <Statistic title="昨日" value="8" trend="up" />,
                }}
              />
              <StatisticCard
                hoverable
                statistic={{
                  title: '总博客',
                  value: '134',
                }}
              />
            </ProCard>
          </ProCard>
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};

export default Analysis;
