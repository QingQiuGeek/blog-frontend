import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const defaultMessage = '青秋博客';
const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'CSDN',
          title: '我的CSDN',
          href: 'https://blog.csdn.net/qq_73181349?spm=1010.2135.3001.5343',
          blankTarget: true,
        },
        {
          key: 'Github',
          title: <GithubOutlined />,
          href: 'https://github.com/YB-win',
          //用户点击后跳转新页面
          blankTarget: true,
        },
        {
          key: 'Gitee',
          title: '我的Gitee',
          href: 'https://gitee.com/serein-gitee',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
