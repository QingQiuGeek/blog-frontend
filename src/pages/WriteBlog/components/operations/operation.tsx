import {
  nowPublish,
  savePassage,
  timePublish,
} from '@/services/blog/passageController';
import {
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, DatePicker, DatePickerProps, Modal, message } from 'antd';
import zh from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import SelectTags from './selectTags';
import TextSummary from './textSummary';
import UpLoadImg from './upload';
interface TitleProps {
  getTitle: string;
  getContent: string;
}
// type=0 保存 4定时发布 2立即发布，前端根据type区分操作，后端接口根据type区分操作，并检查对应的参数
const Operation: React.FC<TitleProps> = ({ getTitle, getContent }) => {
  const [isDisable, setIsDisable] = useState<boolean>(false);
  useEffect(() => {
    const loginUser = localStorage.getItem('loginUser');
    if (!loginUser) {
      setIsDisable(true);
    }
  }, []);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  // 回调函数，用来接收子组件传递的 selectedTags
  const handleSelectedTagsChange = (tags: number[]) => {
    setSelectedTags(tags); // 更新父组件的状态
  };
  // console.log(stringify(selectedTags));

  const [summary, setSummary] = useState<string>('');
  const handleSummary = (summary: string) => {
    setSummary(summary);
  };
  // console.log(summary);
  const [passageId, setPassageId] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string>();
  const handleUploadImg = (imgUrl: string) => {
    setImgUrl(imgUrl);
  };
  // console.log(imgUrl);
  // const editPassage = useSelector((state: any) => state.editPassage);
  // useEffect(() => {
  //   setSummary(editPassage.summary);
  //   setImgUrl(editPassage.thumbnail);
  //   setSelectedTags(editPassage.ptags);
  // }, [editPassage]);
  const check = () => {
    if (getTitle.trim().length === 0) {
      message.error('请输入文章标题！');
      return 1;
    }
    if (getContent.trim().length === 0) {
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

  const save = debounce(async () => {
    if (check()) {
      return;
    }
    try {
      const res: API.BRString = await savePassage({
        summary: summary,
        title: getTitle,
        content: getContent,
        tagIdList: selectedTags,
        thumbnail: imgUrl,
        passageId: passageId,
      });
      if (res) {
        message.success('文章保存成功');
        setPassageId(res);
        sessionStorage.setItem('editPid', res);
      } else {
        message.error('文章保存失败');
      }
    } catch (error) {
      message.error('文章保存异常:' + error);
    }
  }, 1000);

  const nowPub = debounce(async () => {
    if (check()) {
      return;
    }
    try {
      const res: API.BRString = await nowPublish({
        summary: summary,
        title: getTitle,
        content: getContent,
        tagIdList: selectedTags,
        thumbnail: imgUrl,
        passageId: passageId,
      });
      if (res) {
        message.success('文章发布成功');
        // message.info(res);
        setPassageId(res);
        setTimeout(() => {
          window.location.reload();
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

  const timePub = debounce(async () => {
    if (check()) {
      return;
    }

    try {
      const res: API.BRString = await timePublish({
        summary: summary,
        title: getTitle,
        content: getContent,
        tagIdList: selectedTags,
        thumbnail: imgUrl,
        passageId: passageId,
        publishTime: publishTime,
      });
      if (res) {
        message.success('文章定时发布成功');
        // message.info(res);
        setPassageId(res);
        setTimeout(() => {
          window.location.reload();
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
    // console.log('datenow：' + Date.now());
    setPublishTime(timestamp);
  };
  return (
    <ProCard direction="column">
      <ProForm
        layout="horizontal"
        submitter={{
          render: () => {
            return [
              <Button
                htmlType="button"
                onClick={save}
                disabled={isDisable}
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
                disabled={isDisable}
                key="time"
                size="large"
              >
                定时发布
              </Button>,
              <Button
                htmlType="button"
                onClick={nowPub}
                disabled={isDisable}
                key="now"
                size="large"
              >
                立即发布
              </Button>,
              <Modal
                key="timeModal"
                title="选择定时发布时间"
                open={isModalOpen}
                onOk={timePub}
                onCancel={() => setIsModalOpen(false)}
              >
                <div
                  style={{
                    display: 'flex', // 使用 flex 布局
                    justifyContent: 'center', // 水平居中
                    alignItems: 'center', // 垂直居中
                    height: '100%',
                  }}
                >
                  <DatePicker
                    width={250}
                    style={{
                      fontWeight: 'bolder',
                      fontSize: '20px',
                    }}
                    size="large"
                    maxDate={dayjs().add(1, 'month')}
                    minDate={dayjs()}
                    defaultValue={dayjs()}
                    showTime
                    locale={zhLocale}
                    onChange={onChange}
                  />
                </div>
              </Modal>,
            ];
          },
        }}
      >
        <ProFormSelect
          label="文章标签"
          name="select"
          rules={[{ required: true, message: '请选择文章标签!' }]}
        >
          <SelectTags
            onTagsChange={handleSelectedTagsChange}
            isDisable={isDisable}
          ></SelectTags>
        </ProFormSelect>

        {/* 文章摘要 */}

        <ProFormText
          label="文章摘要"
          name="name"
          rules={[{ required: true, message: '请输入文章摘要!' }]}
        >
          <TextSummary
            onSummaryChange={handleSummary}
            isDisable={isDisable}
          ></TextSummary>
        </ProFormText>

        {/* 文章封面 */}
        <UpLoadImg
          handleUploadImg={handleUploadImg}
          isDisable={isDisable}
        ></UpLoadImg>
      </ProForm>
    </ProCard>
  );
};
export default Operation;
