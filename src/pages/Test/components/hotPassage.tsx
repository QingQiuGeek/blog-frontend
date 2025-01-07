import { ProCard } from '@ant-design/pro-components';
import { Badge, Divider, Flex, Tag } from 'antd';

const HotPassage = () => {
  return (
    <>
      <Badge.Ribbon text="Hot" color="red">
        <ProCard
          title="文章推荐"
          hoverable
          bordered
          style={{ border: '1px solid #13C2C2' }}
        >
          段落示意：蚂蚁金服设计平台
          design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
          design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
          design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
          design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
          design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
        </ProCard>
      </Badge.Ribbon>

      <Divider />
      <Badge.Ribbon text="Hot" color="red">
        <ProCard
          title="热门标签"
          hoverable
          bordered
          style={{ border: '1px solid #13C2C2' }}
        >
          <Flex gap="10px 0px" wrap>
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="lime">lime</Tag>
            <Tag color="green">green</Tag>
            <Tag color="cyan">cyan</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="geekblue">geekblue</Tag>
            <Tag color="purple">purple</Tag>
          </Flex>
        </ProCard>
      </Badge.Ribbon>
    </>
  );
};

export default HotPassage;
