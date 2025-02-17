import { HomeAboutAuthor } from '@/constants/URLResources';
import { Avatar, Flex, Tag, Tooltip, Typography } from 'antd';

const { Paragraph, Text } = Typography;
export default () => {
  return (
    <>
      <Flex justify="space-between" align="center" gap="16px">
        <Tooltip
          title="我宣布Java是最好的语言🤣🤏，不接受反驳🤓👍"
          overlayStyle={{ width: '150px' }}
        >
          <Avatar
            size={90}
            shape="square"
            src={<img src={HomeAboutAuthor} alt="头像"></img>}
          />
        </Tooltip>

        <Flex gap="8px 0px" wrap>
          <Tag color="magenta">Java</Tag>
          <Tag color="volcano">大数据</Tag>
          <Tag color="orange">React</Tag>
          <Tag color="green">准全栈</Tag>
          <Tag color="gold">😐不喜欢废话</Tag>
        </Flex>
      </Flex>
      <br></br>
      <Paragraph>
        <Text mark style={{ fontWeight: 'bold' }}>
          Java、大数据在学，对AIGC、独立开发、自媒体也感兴趣。保持浪漫，热爱生活🐭~
        </Text>
      </Paragraph>
    </>
  );
};
