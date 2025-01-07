import {
  LinkedinOutlined,
  MoonOutlined,
  SkinOutlined,
} from '@ant-design/icons';

import { Dropdown, Menu, message } from 'antd';
//插件引入 Emoji, ExportPDF, Mark, OriginalImg
import { Emoji, ExportPDF, Mark, OriginalImg } from '@vavt/rt-extension';
import '@vavt/rt-extension/lib/asset/Emoji.css';
import { MdEditor, config } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
// https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/Mark/README.md
import MarkExtension from 'markdown-it-mark';
//https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/ExportPDF/README.md
import { getTokenIsExpiry } from '@/utils/utils';
import { lineNumbers } from '@codemirror/view';
import '@vavt/rt-extension/lib/asset/ExportPDF.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../index.css';
config({
  editorConfig: {
    // 延迟渲染设置为0
    renderDelay: 0,
  },
  markdownItConfig(md) {
    // mark插件
    md.use(MarkExtension);
  },
  codeMirrorExtensions(_theme, extensions) {
    //行标记插件
    return [...extensions, lineNumbers()];
  },
});
interface handleContentProps {
  handleContentProps: (content: string) => void;
}
const MdEditorRT: React.FC<handleContentProps> = ({ handleContentProps }) => {
  //编辑器内容
  const [text, setText] = useState('');
  useEffect(() => {
    handleContentProps(text);
  }, [text]);
  //编辑主题
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const handleThemeChange = (newTheme: any) => {
    setTheme(newTheme);
  };
  const themeMenu = (
    <Menu selectedKeys={[theme]}>
      <Menu.Item key="light" onClick={() => handleThemeChange('light')}>
        白昼
      </Menu.Item>
      <Menu.Item key="dark" onClick={() => handleThemeChange('dark')}>
        黑夜
      </Menu.Item>
    </Menu>
  );

  //预览主题
  const [previewTheme, setPreviewTheme] = useState<
    'default' | 'cyanosis' | 'github' | 'mk-cute' | 'smart-blue' | 'vuepress'
  >('default');
  const handlePreviewThemeChange = (newPreviewTheme: any) => {
    setPreviewTheme(newPreviewTheme);
  };
  const previewThemeMenu = (
    <Menu selectedKeys={[previewTheme]}>
      <Menu.Item
        key="default"
        onClick={() => handlePreviewThemeChange('default')}
      >
        default
      </Menu.Item>
      <Menu.Item
        key="cyanosis"
        onClick={() => handlePreviewThemeChange('cyanosis')}
      >
        cyanosis
      </Menu.Item>
      <Menu.Item
        key="github"
        onClick={() => handlePreviewThemeChange('github')}
      >
        github
      </Menu.Item>
      <Menu.Item
        key="mk-cute"
        onClick={() => handlePreviewThemeChange('mk-cute')}
      >
        mk-cute
      </Menu.Item>
      <Menu.Item
        key="smart-blue"
        onClick={() => handlePreviewThemeChange('smart-blue')}
      >
        smart-blue
      </Menu.Item>
      <Menu.Item
        key="vuepress"
        onClick={() => handlePreviewThemeChange('vuepress')}
      >
        vuepress
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    const token = getTokenIsExpiry();
    if (!token) {
      message.warning('登录后创作的内容才可以保存哦~');
    }
  }, []);
  const onUploadImg = async (files: File[], callback: any) => {
    // 用于存储上传成功的文件
    const validFiles = [];
    // 校验图片格式和大小
    for (const file of files) {
      if (
        !['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(
          file.type,
        )
      ) {
        message.error('只支持上传 jpg、png、jpeg、gif 格式的图片');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        message.error('图片上传失败，文件最大2MB');
        return;
      }
      // 格式和大小均符合，保存有效文件
      validFiles.push(file);
    }
    // 如果没有有效的文件需要上传，提前退出
    if (validFiles.length === 0) {
      return;
    }
    try {
      const res = await Promise.all(
        validFiles.map((file: File) => {
          return new Promise((rev, rej) => {
            const form = new FormData();
            form.append('file', file);
            const token = getTokenIsExpiry();
            if (token) {
              axios
                .post('/api/passage/uploadPassageImg', form, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `${token}`,
                  },
                })
                .then((res: any) => rev(res))
                .catch((error: any) => rej(error));
            } else {
              message.warning('请登录');
            }
          });
        }),
      );
      // console.log('res：' + stringify(res));
      if (res[0].data.code === 200) {
        const urls = res.map((item: any) => item.data.data);
        // console.log('urls：' + urls);
        callback(urls);
      } else {
        message.error('图片上传失败ing');
      }
    } catch (error) {
      message.error('操作异常：' + error);
    }
  };

  const onSave = (v: any, h: any) => {
    // console.log('v：' + v);
    // console.log('h：' + stringify(h));
    // h.then((html: any) => {
    //   console.log('html：' + html);
    // });
  };
  const onBlur = (event: any) => {
    // console.log('onBlur：', event);
    //失去焦点时也触发onSave
    onSave(text, null);
  };
  return (
    <MdEditor
      onSave={onSave}
      onBlur={onBlur}
      // transformImgUrl={}
      onUploadImg={onUploadImg}
      // onUploadImg={async (files: Array<File>) => {
      //   const uploadedUrls = await Promise.all(
      //     files.map(async (file) => {
      //       if (
      //         !['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(
      //           file.type,
      //         )
      //       ) {
      //         message.error('只支持上传 jpg、png、jpeg、gif 格式的图片');
      //         return '';
      //       }
      //       if (file.size > 1 * 1024 * 1024) {
      //         // 限制上传文件大小不超过 1MB
      //         message.error('文件太大，最大支持1MB');
      //         return '';
      //       }
      //       const url = await uploadImg(file);
      //       return url || ''; // 防止返回 undefined
      //     }),
      //   );
      //   return uploadedUrls.filter((url) => url !== ''); // 过滤掉上传失败的空链接
      // }}
      toolbars={[
        'revoke',
        'next',
        'save',
        4,
        'catalog',
        'title',
        'bold',
        'underline',
        'italic',
        1,
        'strikeThrough',
        'quote',
        5,
        0,
        '-',
        'codeRow',
        'code',
        '-',
        'image',
        'unorderedList',
        'orderedList',
        'task',
        'table',
        '-',
        'mermaid',
        'katex',
        'sub',
        'sup',
        '-',
        2,
        'prettier',
        3,
        '-',
        '=',
        '-',
        'preview',
        'previewOnly',
        'htmlPreview',
        'pageFullscreen',
        'fullscreen',
      ]}
      defToolbars={[
        <Emoji key="emoji" />,
        <Mark key="mark" title="高亮"></Mark>,
        <Dropdown key="theme" overlay={themeMenu}>
          <MoonOutlined />
        </Dropdown>,
        <Dropdown key="previewTheme" overlay={previewThemeMenu}>
          <SkinOutlined />
        </Dropdown>,
        <ExportPDF key="ExportPDF" modelValue={text}></ExportPDF>,
        <OriginalImg
          key="originalImg"
          trigger={<LinkedinOutlined />}
          title="插入<img/>"
        ></OriginalImg>,
      ]}
      footers={['scrollSwitch', 'markdownTotal', '=', 0]}
      defFooters={[<div key="localTime">{new Date().toLocaleString()}</div>]}
      className="custom-md-editor"
      theme={theme}
      value={text}
      onChange={setText}
      previewTheme={previewTheme}
      maxLength={10000}
      autoDetectCode={true}
    />
  );
};

export default MdEditorRT;
