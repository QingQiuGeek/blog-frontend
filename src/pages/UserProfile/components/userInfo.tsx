import { DEFAULT_USER } from '@/constants/DefaultUser';
import { getCategoriesAndTagsUsingGet } from '@/services/blog/categoryController';
import {
  getLoginUserUsingGet,
  getUserInfoDataUsingGet,
  updateUserUsingPost,
} from '@/services/blog/userController';
import { formatTimestamp, getTokenIsExpiry } from '@/utils/utils';
import { SettingTwoTone } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import type {
  CascaderProps,
  DescriptionsProps,
  GetProp,
  UploadFile,
  UploadProps,
} from 'antd';
import {
  Avatar,
  Button,
  Cascader,
  Col,
  Descriptions,
  Flex,
  Form,
  Modal,
  Row,
  Tag,
  Tooltip,
  Upload,
  message,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import { useEffect, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const UserInfo = () => {
  const [form] = Form.useForm();

  const [loginUser, setLoginUser] = useState<API.LoginUserVO>();
  const [formData, setFormData] = useState({});
  // const [imageUrl, setImageUrl] = useState<string>();
  // const [userName, setUserName] = useState<string>();
  // const [sex, setSex] = useState<number>();
  // const [profile, setProfile] = useState<string>();
  // const [address, setAddress] = useState<string>();
  // const [interestTag, setInterestTag] = useState<string[]>();

  //用户的文章数量、收藏点赞数量等
  const [UserData, setUserData] = useState<API.UserInfoDataVO>();
  const [loading, setLoading] = useState<boolean>(true);

  //拿到登录用户的id，那么从后端请求登陆用户的数据时可以直接用id请求接口，也可以用token请求“我的”接口
  // const loginUserId = LoginUserInfo?.userId;
  const fetchData = async () => {
    try {
      const res: API.UserInfoDataVO = await getUserInfoDataUsingGet();
      // console.log('UserData: ' + stringify(res));
      setUserData(res);
    } catch (error) {
      message.error('个人数据获取失败' + error);
    }
  };
  const getLoginUser = async () => {
    try {
      const res: API.LoginUserVO = await getLoginUserUsingGet();
      if (res) {
        setLoginUser(res);
      } else {
        message.error('获取登录用户信息失败');
      }
    } catch (error) {
      message.error('获取登录用户信息异常：' + error);
    }
  };
  useEffect(() => {
    //loginUser信息保存在浏览器中无法实时获取到用户个人基本信息，因为此时的loginUser是从localStorage中获取，拿到的一直是老数据
    const loginUserEncrypt = localStorage.getItem('loginUser');
    // if (loginUserEncrypt) {
    //   setLoginUser(decrypt(loginUserEncrypt));
    // }
    if (!loginUserEncrypt) {
      //未登录就是默认用户
      message.info({
        content: '未登录，当前是默认用户',
        style: {
          fontSize: '15px',
          marginTop: '8vh',
        },
      });
    } else {
      //获取粉丝、文章收藏量、作品数量、关注数量、点赞数量...
      fetchData();
      getLoginUser();
    }
    setLoading(false);
  }, []);

  const userItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户名',
      children: loginUser?.userName || DEFAULT_USER.userName,
    },
    {
      key: '9',
      label: '性别',
      children:
        loginUser?.sex === 1
          ? '男'
          : loginUser?.sex === 0
          ? '女'
          : '未知' || DEFAULT_USER.sex,
    },
    {
      key: '3',
      label: '我的粉丝',
      children: UserData?.followerNum || 0,
    },
    {
      key: '5',
      label: '我的文章',
      children: UserData?.passageNum || 0,
    },
    {
      key: '4',
      label: '我关注的',
      children: UserData?.followNum || 0,
    },

    {
      key: '6',
      label: '我收藏的',
      children: UserData?.collectNum || 0,
    },
    {
      key: '8',
      label: '我点赞的',
      children: UserData?.thumbNum || 0,
    },
    {
      key: '7',
      label: 'IP属地',
      children: loginUser?.ipAddress || DEFAULT_USER.ipAddress,
    },
    {
      key: '2',
      label: '注册时间',
      children: loginUser
        ? formatTimestamp(loginUser?.createTime)
        : DEFAULT_USER?.createTime,
    },
  ];
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    if (loginUser) {
      setOpen(true);
      setFormData({});
    } else {
      message.info('请登录');
    }
  };
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [fileList, setFileList] = useState([]); // 上传的文件列表
  const showUpload = () => {
    setIsUploadVisible(true);
  };
  const cancelUpload = () => {
    setIsUploadVisible(false);
  };

  const okUpload = async () => {
    if (fileList.length === 0) {
      message.error('请上传头像');
      return;
    }
    // 可以添加 loading 状态，等待上传完成
    try {
      const res = await new Promise((rev, rej) => {
        const form = new FormData();
        form.append('file', fileList[0].originFileObj);
        const token = getTokenIsExpiry();
        if (token) {
          axios
            .post('/api/user/uploadAvatar', form, {
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
      if (res.data.code === 200) {
        message.success('上传成功');
        //更换头像后更新loginUserVO
        const newAvatarURL = res.data.data;
        const newLoginUser: API.LoginUserVO = {
          ...loginUser,
          avatarUrl: newAvatarURL,
        };
        setLoginUser(newLoginUser);
        // console.log('返回的图片 URL：' + newAvatarURL);
        // console.log('loginUser：' + stringify(loginUser));

        // 上传成功后关闭模态框
        setIsUploadVisible(false);
      } else {
        message.error('头像上传失败');
      }
    } catch (error) {
      message.error('头像上传出错：' + error);
    }
  };

  const handleChange = ({ fileList: newFileList, file }) => {
    setFileList(newFileList);
  };
  const beforeUpload = (file: FileType) => {
    const fileType = ![
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/jpg',
    ].includes(file.type);
    if (fileType) {
      message.error('只支持上传 jpg、png、jpeg、gif 格式的图片');
      return;
    }
    const fileSize = file.size > 2 * 1024 * 1024;
    if (fileSize) {
      message.error('图片上传失败，文件最大2MB');
      return;
    }
    return fileType && fileSize;
  };
  // 监听字段变化
  const onValuesChange = (changedValues: any) => {
    // 更新表单数据
    setFormData((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
  };
  //selectedTags存储[[1,1],[1,2],[1,3]]类型的数据，是用户修改时选择的
  const [selectedTags, setSelectedTags] = useState([[]]);
  //userTags是从数据库取出来的数据['1','2','3']
  const [options, setOptions] = useState<Option[]>();
  // 根据[1,2]查找tagName的函数
  function findTagName(categoryId: any, tagId: any) {
    // 找到对应的category
    const category = options?.find((c) => c.value === categoryId);
    if (!category) {
      return null; // 如果没有找到category，返回null
    }

    // 在该category下的tagVOList中查找tagId对应的tagName
    const tag = category.children?.find((t) => t.value === tagId);
    return tag ? tag.label : null; // 如果找到tag，则返回tagName，否则返回null
  }
  const handleOk = async () => {
    // 比较当前值与初始值的差异
    const changes = Object.keys(formData).filter(
      (key) => formData[key] !== loginUser[key],
    );

    // 使用 map 获取每个子数组的第二个元素
    if (selectedTags.length > 3) {
      message.error('最多选择3个标签!');
      return;
    }
    const result = selectedTags.map((subArray) => subArray[1]);
    // 排序并转换为字符串进行比较
    const areArraysEqual =
      JSON.stringify(loginUser?.interestTag?.sort((a, b) => a - b)) ===
      JSON.stringify(result.sort((a, b) => a - b));
    // 如果没有字段变化
    if (changes.length === 0 && areArraysEqual) {
      message.info('没有任何变化，不需要更新');
      return;
    }
    // 构建变化的字段对象
    let updatedFields = changes.reduce((acc, key) => {
      acc[key] = formData[key];
      return acc;
    }, {});

    if (!areArraysEqual) {
      updatedFields = {
        ...updatedFields,
        interestTag: JSON.stringify(result),
      };

      // setUserTags(result);
    }
    // console.log('updatedFields：' + stringify(updatedFields));
    setConfirmLoading(true);
    try {
      const res: API.BaseResponseBoolean_ = await updateUserUsingPost(
        updatedFields,
      );
      if (res) {
        message.success('信息修改成功');

        // 更新 loginUserVO 中的变化字段
        let updatedLoginUser = { ...loginUser }; // 复制一份 loginUser 数据
        changes.forEach((key) => {
          updatedLoginUser[key] = formData[key]; // 更新变化的字段
        });
        // ['人工智能', '量子计算', '编程'];
        const newSelectedTags = selectedTags.map(([categoryId, tagId]) =>
          findTagName(categoryId, tagId),
        );
        if (!areArraysEqual) {
          updatedLoginUser = {
            ...updatedLoginUser,
            interestTag: newSelectedTags,
          };
        }
        // 更新登录用户信息
        setLoginUser(updatedLoginUser); // 更新 loginUserVO
      } else {
        message.error('信息修改失败');
      }
    } catch (error) {
      message.error('信息修改异常：' + error);
    }
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 0);
  };
  const handleCancel = () => {
    //setState (比如 setIsModalVisible(false)) 是异步操作，React 会把它放入更新队列，在合适的时机进行批量更新。
    //因此，如果在一个事件处理函数中直接调用 setState，可能会导致 UI 没有立即更新，因为 React 可能会在批量更新中处理状态。
    //通过使用 setTimeout，你将 setIsModalVisible(false) 的调用推迟到当前任务完成后，
    //这样可以确保在当前事件执行完之后，React 会先完成渲染和其它操作，再去执行状态更新。这可以避免一些潜在的渲染问题。
    setTimeout(() => {
      setOpen(false);
    }, 0);
  };
  // console.log(stringify(loginUser));
  const [loadTag, setLoadTag] = useState<boolean>();
  const onChange: CascaderProps<Option, 'value', true>['onChange'] = (
    value,
  ) => {
    // console.log(value);
    if (value.length === 4) {
      message.error('最多选择3个标签！');
      return;
    }
    setSelectedTags(value);
  };

  // 监听 selectedTags 的变化
  useEffect(() => {
    // console.log('selectedTags 更新了:', selectedTags);
  }, [selectedTags]);
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
  // 【兴趣标签、ip、性别、简介、用户名、头像】
  return (
    <>
      <ProCard gutter={[0, 10]} wrap split="vertical" loading={loading}>
        <ProCard
          hoverable
          split="vertical"
          wrap
          style={{ border: '1px solid #13C2C2' }}
          extra=<div>
            <Button size="small" icon=<SettingTwoTone /> onClick={showModal} />
            <Modal
              destroyOnClose
              title="修改我的信息"
              open={open}
              confirmLoading={confirmLoading}
              onOk={handleOk}
              closable={false}
              maskClosable={false}
              onCancel={handleCancel}
            >
              <ProForm
                form={form}
                layout={'vertical'}
                initialValues={loginUser}
                onValuesChange={onValuesChange}
                loading={loading}
                clearOnDestroy={true}
                submitter={{
                  //不显示重置提交按钮
                  render: () => {
                    return null;
                  },
                }}
              >
                <Tooltip title="点击更换头像">
                  <ProCard
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <Avatar
                      alt="默认头像"
                      onClick={showUpload}
                      shape="square"
                      size={100}
                      style={{ border: '3px solid #13c2c2' }}
                      src={<img src={loginUser?.avatarUrl} alt="头像" />}
                    />
                  </ProCard>
                </Tooltip>
                <Modal
                  title="上传头像"
                  width="350px"
                  open={isUploadVisible}
                  onCancel={cancelUpload}
                  onOk={okUpload}
                  confirmLoading={confirmLoading}
                  destroyOnClose
                  style={{
                    marginTop: '100px',
                  }}
                  closable={false}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <ImgCrop rotationSlider>
                      <Upload
                        name="file"
                        listType="picture-card"
                        fileList={fileList}
                        maxCount={1}
                        accept=".jpeg,.png,.gif,.jpg,"
                        // headers={{
                        //   authorization: getTokenIsExpiry(),
                        // }}
                        // action="/api/passage/uploadPassageCover"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        onPreview={onPreview}
                        onRemove={() => setFileList([])} // 移除文件时清空列表
                      >
                        {fileList.length < 1 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                  </div>
                </Modal>
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      fieldProps={{
                        maxLength: 6,
                        showCount: true,
                      }}
                      colProps={{ md: 12, xl: 8 }}
                      name="userName"
                      label="用户名"
                      rules={[
                        {
                          required: true,
                          message: '用户名长度2-6',
                        },
                      ]}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormSelect
                      label="性别"
                      name="sex"
                      width={80}
                      options={[
                        { label: '未知', value: 2 },
                        { label: '男', value: 1 },
                        { label: '女', value: 0 },
                      ]}
                      valueEnum={{
                        0: '女',
                        1: '男',
                        2: '未知',
                      }}
                    />
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '20px' }}>
                  <Col span={18}>
                    兴趣标签：
                    <Cascader
                      key="interestTag"
                      options={options}
                      style={{ width: '470px' }}
                      onDropdownVisibleChange={loadData}
                      expandTrigger="hover"
                      loading={loadTag}
                      onChange={onChange}
                      multiple
                      value={selectedTags}
                      showCheckedStrategy="SHOW_CHILD"
                    />
                  </Col>
                </Row>
                <ProFormTextArea
                  fieldProps={{
                    maxLength: 30,
                    showCount: true,
                    style: { resize: 'none' },
                  }}
                  name="profiles"
                  label="个人简介"
                />
              </ProForm>
            </Modal>
          </div>
        >
          <ProCard>
            <ProCard colSpan="40%">
              <Avatar
                shape="square"
                size={100}
                style={{ right: '30px', bottom: '55px' }}
                src={
                  <img
                    src={loginUser?.avatarUrl || DEFAULT_USER.avatarUrl}
                  ></img>
                }
              />
            </ProCard>

            <ProCard style={{ right: '28px', bottom: '50px' }}>
              <Flex gap="8px 0px" wrap>
                {(loginUser
                  ? loginUser.interestTag
                  : DEFAULT_USER.interestTag
                )?.map((tag, index) => (
                  <Tag key={index} color="#13c2c2">
                    {tag}
                  </Tag>
                ))}
              </Flex>
            </ProCard>
          </ProCard>

          <ProCard style={{ bottom: '70px', height: '170px' }}>
            <Descriptions items={userItems} column={2} />
          </ProCard>
        </ProCard>
        <ProCard
          style={{ border: '1px solid  #13C2C2' }}
          hoverable
          title="个人简介"
        >
          {loginUser?.profiles || DEFAULT_USER.profiles}
        </ProCard>
      </ProCard>
    </>
  );
};

export default UserInfo;
