import { ProCard } from '@ant-design/pro-components';
import gemoji from '@bytemd/plugin-gemoji';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import { Editor } from '@bytemd/react';
import { Input, message } from 'antd';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import { useState } from 'react';
// import Editor from 'editor.md';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
//蓝
import '../themeCSS/arknights.scss';
//黑
// import '../themeCSS/geek-black.scss';
//紫
// import '../themeCSS/condensed-night-purple.scss';
//橙
// import '../themeCSS/serene-rose.scss';
//绿
// import '../themeCSS/vuepress.scss';

const plugins = [
  gfm(),
  highlight(),
  mediumZoom(),
  gemoji(),
  math(),
  mediumZoom(),
  breaks(),
  frontmatter(),
];
const titleInput = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  console.log('Change:', e.target.value);
};
const uploadImg = async (file: File) => {
  // 你可以在这里处理上传图片的 API 请求
  const formData = new FormData();
  formData.append('file', file);

  // 假设我们上传图片到一个假设的 API
  try {
    const response = await fetch('https://example.com/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      // 返回上传后的图片 URL
      return data.url; // 假设返回的是图片的 URL
    } else {
      message.error('图片上传失败');
    }
  } catch (error) {
    message.error('上传出错，请重试');
  }
};

const MyEditor = () => {
  const [value, setValue] = useState('');

  if (!localStorage.getItem('loginUser')) {
    message.info({
      content: '登陆后才可以创作哦🤓~',
      style: {
        fontSize: '15px',
        marginTop: '8vh',
      },
    });
  }

  return (
    <div className=".markdown-body">
      <ProCard direction="column" gutter={1}>
        <ProCard>
          <Input
            showCount
            maxLength={20}
            style={{ width: '50vw', height: '60px' }}
            onChange={titleInput}
            placeholder="请输入文章标题"
            size="large"
            variant="outlined"
          />
        </ProCard>
        <ProCard>
          <Editor
            locale={zhHans}
            value={value}
            uploadImages={async (files) => {
              // 处理上传的图片文件
              const uploadedUrls = await Promise.all(
                files.map(async (file) => {
                  const url = await uploadImg(file);
                  return url;
                }),
              );
              return uploadedUrls; // 返回上传的图片 URL
            }}
            plugins={plugins}
            onChange={(v) => {
              setValue(v);
            }}
          />
        </ProCard>
      </ProCard>
    </div>
  );
};
export default MyEditor;
