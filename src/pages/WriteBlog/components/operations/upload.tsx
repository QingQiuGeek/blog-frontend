import { getTokenIsExpiry } from '@/utils/utils';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
interface UploadImgProps {
  handleUploadImg: (imgUrl: string) => void;
  isDisable: boolean;
}
const UpLoadImg: React.FC<UploadImgProps> = ({
  handleUploadImg,
  isDisable,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [imgUrl, setImgUrl] = useState<string>();
  // const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   // console.log(fileList[1]);
  // };

  const onChange = ({ fileList: newFileList, file }) => {
    setFileList(newFileList);

    // console.log('file：' + stringify(file));
    // console.log('res：' + stringify(file.response));

    if (file.status === 'done') {
      // 假设你的服务器返回的文件信息在 file.response 中包含 URL
      // console.log('file：' + stringify(file));
      // console.log('res：' + stringify(file.response));
      const imageUrl = file.response?.data;
      if (imageUrl) {
        setImgUrl(imageUrl);
        handleUploadImg(imageUrl);
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

  const beforeUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      message.error('图片上传失败，文件最大2MB');
      return false;
    }
  };

  return (
    <>
      <span>&nbsp;&nbsp;&nbsp;文章封面：</span>
      <div style={{ display: 'inline-block' }}>
        <ImgCrop rotationSlider>
          <Upload
            disabled={isDisable}
            style={{ display: 'inline-block' }}
            //添加了beforeUpload，onChange的status就会失效
            // beforeUpload={beforeUpload}
            accept=".jpeg,.png,.gif,.jpg,"
            action="/api/passage/uploadPassageCover"
            maxCount={1}
            name="file"
            listType="picture-card"
            headers={{
              authorization: getTokenIsExpiry(),
            }}
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            onRemove={() => setFileList([])} // 移除文件时清空列表
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </div>
      <br></br>
      <span
        style={{ marginBottom: '10px', marginTop: '10px', display: 'block' }}
      >
        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;只支持上传
        jpg、png、jpeg、gif 格式的图片，图片最大2MB
      </span>
    </>
  );
};

export default UpLoadImg;
