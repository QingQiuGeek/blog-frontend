import { HomeAboutAuthor } from '@/constants/URLResources';
import { MailOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Avatar, Divider, Flex, Tag, Tooltip, Typography } from 'antd';

const { Paragraph, Text, Title } = Typography;
const AboutAuthor = () => {
  return (
    <>
      <ProCard
        colSpan="100%"
        title="博主介绍"
        hoverable
        bordered
        wrap
        style={{ border: '1px solid #13C2C2' }}
      >
        <Flex justify="space-between" align="center" gap="16px">
          <Tooltip
            title="我宣布Java是最好的语言🤣🤏，不接受反驳🤓👍"
            overlayStyle={{ width: '150px' }}
          >
            <Avatar
              size={90}
              style={{ width: '150px', bottom: '10px' }}
              shape="square"
              src={<img src={HomeAboutAuthor} alt="头像"></img>}
            />
          </Tooltip>

          <Flex gap="8px 0px" wrap>
            <Tag color="magenta">Java</Tag>
            <Tag color="volcano">大数据</Tag>
            <Tag color="orange">前端UI</Tag>
            <Tag color="purple">自媒体</Tag>
            <Tag color="green">准全栈</Tag>
            <Tag color="gold">😐不喜欢废话</Tag>
          </Flex>
        </Flex>
        <text
          style={{
            fontWeight: 'bold',
            display: 'inline-black',
            marginLeft: '20px',
            marginRight: '22px',
          }}
        >
          联系我:
        </text>
        &nbsp;&nbsp;&nbsp;
        <Tag
          icon={<MailOutlined />}
          color="#13c2c2"
          style={{ fontSize: '12px', fontWeight: 'normal' }}
        >
          wwqqblog@qq.com
        </Tag>
        <br></br>
        <Paragraph>
          <Text mark style={{ fontWeight: 'bold' }}>
            Java、大数据在学，对Web3、AIGC、自媒体也感兴趣
            ，希望能成为独立开发、数字游民 or
            大数据攻城狮。保持浪漫，热爱生活🐭~
          </Text>
        </Paragraph>
      </ProCard>
      <Divider />

      <ProCard
        title="博客技术栈"
        hoverable
        bordered
        style={{ border: '1px solid #13C2C2' }}
      >
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
      </ProCard>
      <Divider />
    </>
  );
};

export default AboutAuthor;
