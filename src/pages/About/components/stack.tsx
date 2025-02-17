import { Flex, Tag, Typography } from 'antd';

const { Title } = Typography;

export default () => {
  return (
    <>
      <Title level={5}>前端</Title>
      <Flex gap="4px 0" wrap>
        <Tag bordered={false} color="orange">
          prettier
        </Tag>
        <Tag bordered={false} color="lime">
          node v20.10
        </Tag>
        <Tag bordered={false} color="gold">
          react v18
        </Tag>
        <Tag bordered={false} color="volcano">
          lodash
        </Tag>
        <Tag bordered={false} color="magenta">
          TypeScript
        </Tag>
        <Tag bordered={false} color="geekblue">
          proComponents
        </Tag>
        <Tag bordered={false} color="blue">
          dva
        </Tag>
        <Tag bordered={false} color="processing">
          openapi
        </Tag>
        <Tag bordered={false} color="cyan">
          umiMAX v4
        </Tag>
        <Tag bordered={false} color="success">
          proChat v1.15
        </Tag>
        <Tag bordered={false} color="error">
          MdEditorRT v5.0.2
        </Tag>
        <Tag bordered={false} color="purple">
          antd v5.21
        </Tag>
        <Tag bordered={false} color="volcano">
          crypto-js v4.2
        </Tag>

        <b>......</b>
      </Flex>

      <Title level={5}>后端</Title>
      <Flex gap="4px 0" wrap>
        <Tag bordered={false} color="green">
          JDK11
        </Tag>
        <Tag bordered={false} color="lime">
          SpringBoot2.6
        </Tag>
        <Tag bordered={false} color="gold">
          MySQL8
        </Tag>
        <Tag bordered={false} color="orange">
          Maven
        </Tag>
        <Tag bordered={false} color="volcano">
          ES7.15
        </Tag>
        <Tag bordered={false} color="magenta">
          Redis7.2.4
        </Tag>
        <Tag bordered={false} color="purple">
          knife4j-openapi2
        </Tag>
        <Tag bordered={false} color="cyan">
          STMP
        </Tag>
        <Tag bordered={false} color="success">
          ip2region
        </Tag>
        <Tag bordered={false} color="processing">
          OSS
        </Tag>
        <Tag bordered={false} color="error">
          hikari
        </Tag>
        <Tag bordered={false} color="blue">
          redisson
        </Tag>
        <Tag bordered={false} color="volcano">
          etcd
        </Tag>
        <Tag bordered={false} color="processing">
          JDHotKey
        </Tag>
        <Tag bordered={false} color="purple">
          mybatis-plus
        </Tag>
        <Tag bordered={false} color="cyan">
          knife4j
        </Tag>
        <b>......</b>
      </Flex>
    </>
  );
};
