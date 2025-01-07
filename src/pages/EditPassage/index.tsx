import {
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

import {
  Button,
  Cascader,
  CascaderProps,
  DatePickerProps,
  Dropdown,
  FloatButton,
  Input,
  Menu,
  Upload,
  UploadFile,
  message,
} from 'antd';

import { getTokenIsExpiry } from '@/utils/utils';
import {
  LinkedinOutlined,
  MoonOutlined,
  SkinOutlined,
} from '@ant-design/icons';

import { lineNumbers } from '@codemirror/view';
import zh from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import MarkExtension from 'markdown-it-mark';
import { useEffect, useState } from 'react';

import { PUBLISH, SAVE, TIME_PUBLISH } from '@/constants/OperationPassageType';
import { getCategoriesAndTagsUsingGet } from '@/services/blog/categoryController';
import {
  addPassageUsingPost,
  getEditPassageUsingGet,
} from '@/services/blog/passageController';
import { useNavigate, useParams } from '@umijs/max';
import { Emoji, ExportPDF, Mark, OriginalImg } from '@vavt/rt-extension';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import { debounce } from 'lodash';
import { MdEditor, config } from 'md-editor-rt';
import './index.css';
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
const { TextArea } = Input;
interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}
export default () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState<string>('');
  const [passageId, setPassageId] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string>();
  //编辑主题
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [options, setOptions] = useState<Option[]>();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [status, setStatus] = useState();
  const loadEditPassage = async (passageId: string) => {
    try {
      const res: API.BaseResponseEditPassageVO_ = await getEditPassageUsingGet({
        pid: passageId,
      });
      if (res) {
        setTitle(res.title);
        setImgUrl(res.thumbnail);
        setText(res.content);
        setSummary(res.summary);
        setStatus(res.status);
      } else {
        message.error('文章加载失败');
      }
    } catch (error) {
      message.error('文章加载异常：' + error);
    }
  };
  const params = useParams();

  useEffect(() => {
    loadEditPassage(params.passageId);
    setPassageId(params.passageId);
  }, []);
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
  const titleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTitle(e.target.value);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChangeImg = ({ fileList: newFileList, file }) => {
    setFileList(newFileList);
    if (file.status === 'done') {
      const imageUrl = file.response?.data;
      if (imageUrl) {
        setImgUrl(imageUrl);
        // console.log('返回的图片 URL：' + imgUrl);
      } else {
        message.error('图片上传失败');
      }
    } else if (file.status === 'error') {
      message.error(`${file.name} 文件上传失败`);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const check = () => {
    if (title.trim().length === 0) {
      message.error('请输入文章标题！');
      return 1;
    }
    if (text.trim().length === 0) {
      message.error('请输入文章内容！');
      return 1;
    }
    if (summary.trim().length === 0) {
      message.error('请输入文章摘要！');
      return 1;
    }
    if (selectedTags.length > 3) {
      message.error('最多选择3个标签！');
      return 1;
    }
    if (selectedTags.length === 0) {
      message.error('请选择文章标签！');
      return 1;
    }
  };
  let navigate = useNavigate();
  const save = debounce(async () => {
    if (check()) {
      // console.log(2);
      return;
    }
    // console.log(3);

    try {
      const res: API.BaseResponseString_ = await addPassageUsingPost({
        summary: summary,
        title: title,
        content: text,
        tagIdList: selectedTags.map((subArray) => subArray[1]),
        thumbnail: imgUrl,
        passageId: passageId,
        type: SAVE,
      });
      if (res) {
        message.success('文章保存成功');
        // console.log(stringify(res));
        setPassageId(res);
        sessionStorage.setItem('editPid', res as string);
      } else {
        message.error('文章保存失败');
      }
    } catch (error) {
      message.error('文章保存异常:' + error);
    }
  }, 1000);

  const nowPublish = debounce(async () => {
    if (check()) {
      return;
    }
    try {
      const res: API.BaseResponseString_ = await addPassageUsingPost({
        summary: summary,
        title: title,
        content: text,
        tagIdList: selectedTags.map((subArray) => subArray[1]),
        thumbnail: imgUrl,
        passageId: passageId,
        type: PUBLISH,
      });
      if (res) {
        message.success('文章发布成功');
        // message.info(res);
        setPassageId(res);
        setTimeout(() => {
          navigate('/userProfile', { replace: true });
        }, 1000);

        // const passageId = encrypt(res);
        // localStorage.setItem('editPassageId', passageId);
      } else {
        message.error('文章发布失败');
      }
    } catch (error) {
      message.error('文章发布异常:' + error);
    }
  }, 1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publishTime, setPublishTime] = useState<number>();

  const timePublish = debounce(async () => {
    if (check()) {
      return;
    }

    try {
      const res: API.BaseResponseString_ = await addPassageUsingPost({
        summary: summary,
        title: title,
        content: text,
        tagIdList: selectedTags,
        thumbnail: imgUrl,
        passageId: passageId,
        publishTime: publishTime,
        type: TIME_PUBLISH,
      });
      if (res) {
        message.success('文章定时发布成功');
        // message.info(res);
        setPassageId(res);
        setTimeout(() => {
          navigate('/userProfile', { replace: true });
        }, 1000);

        // const passageId = encrypt(res);
        // localStorage.setItem('editPassageId', passageId);
      } else {
        message.error('文章定时发布失败');
      }
    } catch (error) {
      message.error('文章定时发布异常:' + error);
    }
    setIsModalOpen(false);
  }, 1000);

  const zhLocale: typeof zh = {
    ...zh,
    lang: {
      ...zh.lang,
      fieldDateFormat: 'YYYY-MM-DD', // 日期格式：年-月-日
      fieldDateTimeFormat: 'YYYY-MM-DD HH:mm:ss', // 日期时间格式：年-月-日 时:分:秒
      yearFormat: 'YYYY', // 年格式
      cellYearFormat: 'YYYY', // 单元格中的年格式
    },
  };
  const onChange: DatePickerProps['onChange'] = (_, dateStr) => {
    const timestamp = dayjs(dateStr).valueOf();
    // console.log(timestamp);
    // console.log('datenow：' + Date.now());
    setPublishTime(timestamp);
  };
  const onChangeSummary = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSummary(e.target.value);
  };
  const [loadTag, setLoadTag] = useState<boolean>();

  const loadData = async (visible: boolean) => {
    if (visible) {
      setLoadTag(true);
      try {
        const res: API.BaseResponseListCategoryAndTags_ =
          await getCategoriesAndTagsUsingGet();
        if (res) {
          // console.log(stringify(res));
          const convertedOptions = res.map((category) => {
            // 将 category 转换为 Option
            const categoryOption: Option = {
              value: category.categoryId ?? '',
              label: category.categoryName ?? '',
              // 3. 将 tagVOList 转换为 children
              children: category.tagVOList?.map((tag) => ({
                value: tag.tagId ?? '',
                label: tag.tagName ?? '',
              })),
            };
            return categoryOption;
          });
          // 4. 设置到 state
          setOptions(convertedOptions);
        } else {
          message.error('标签加载失败');
        }
      } catch (error) {
        message.error('标签加载异常:' + error);
      }
      setLoadTag(false);
    }
  };

  const onChangeTags: CascaderProps<Option, 'value', true>['onChange'] = (
    value,
  ) => {
    if (value.length === 4) {
      message.error('最多选择3个标签！');
      return;
    }
    setSelectedTags(value);
  };
  return (
    <ProCard direction="column">
      <Input
        showCount
        maxLength={20}
        style={{ width: '50vw', height: '40px', marginBottom: '10px' }}
        onChange={titleInput}
        value={title}
        placeholder="请输入文章标题"
        size="large"
        variant="outlined"
      />
      <MdEditor
        onUploadImg={onUploadImg}
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
      <ProForm
        layout="horizontal"
        submitter={{
          render: () => {
            if (status === 0) {
              // status 为 0 时显示所有按钮
              return [
                <Button
                  htmlType="button"
                  onClick={save}
                  key="save"
                  size="large"
                >
                  保存博客
                </Button>,
                <Button
                  htmlType="button"
                  onClick={() => {
                    setIsModalOpen(true);
                    setPublishTime(dayjs(dayjs()).valueOf());
                  }}
                  key="time"
                  size="large"
                >
                  定时发布
                </Button>,
                <Button
                  htmlType="button"
                  onClick={nowPublish}
                  key="now"
                  size="large"
                >
                  立即发布
                </Button>,
              ];
            } else if (status === 2) {
              // status 为 2 时只显示 "保存博客" 按钮
              return [
                <Button
                  htmlType="button"
                  onClick={save}
                  key="save"
                  size="large"
                >
                  保存博客
                </Button>,
              ];
            }
            // 如果状态不为 0 或 2，返回空数组
            return [];
          },
        }}
        style={{ marginTop: '20px' }}
      >
        <ProFormSelect
          label="文章标签"
          name="select"
          rules={[{ required: true, message: '请选择文章标签!' }]}
        >
          <Cascader
            key="interestTag"
            options={options}
            onDropdownVisibleChange={loadData}
            expandTrigger="hover"
            loading={loadTag}
            onChange={onChangeTags}
            multiple
            showCheckedStrategy="SHOW_CHILD"
          />
        </ProFormSelect>

        <ProFormText
          label="文章摘要"
          name="name"
          rules={[{ required: true, message: '请输入文章摘要!' }]}
        >
          <TextArea
            showCount
            maxLength={250}
            value={summary}
            onChange={onChangeSummary}
            placeholder="请输入文章摘要"
            style={{ height: 100, width: '100%', resize: 'none' }}
          />
        </ProFormText>

        <div>
          <span>&nbsp;&nbsp;&nbsp;文章封面：</span>
          <div style={{ display: 'inline-block' }}>
            <ImgCrop rotationSlider>
              <Upload
                style={{ display: 'inline-block' }}
                accept=".jpeg,.png,.gif,.jpg,"
                action="/api/passage/uploadPassageCover"
                maxCount={1}
                name="file"
                listType="picture-card"
                headers={{
                  authorization: getTokenIsExpiry(),
                }}
                fileList={fileList}
                onChange={onChangeImg}
                onPreview={onPreview}
                onRemove={() => setFileList([])} // 移除文件时清空列表
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </div>
          <br></br>
          <span
            style={{
              marginBottom: '10px',
              marginTop: '10px',
              display: 'block',
            }}
          >
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;只支持上传
            jpg、png、jpeg、gif 格式的图片，图片最大2MB
          </span>
        </div>
      </ProForm>
      <FloatButton.BackTop />
    </ProCard>
  );
};
