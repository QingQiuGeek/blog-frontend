import { MAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '@/constants/Common';
import { LOGIN_LOGO } from '@/constants/URLResources';
import { sendRegisterCodeUsingPost } from '@/services/blog/userController';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { Spin, Tabs, message, theme } from 'antd';
import { useEffect, useState } from 'react';
type OpsType = 'login' | 'register';

export default ({ onClose }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = theme.useToken();
  const [opsType, setOpsType] = useState<OpsType>('login');
  //const [form] 是使用数组解构赋值的方式，useForm 返回的通常是一个包含表单实例和其他方法的数组，
  //因此只取第一个元素，即表单实例 form。
  // const { setInitialState } = useModel('@@initialState');
  // 监听 opsType 变化，当 opsType 改变时重置表单数据
  const [form] = ProForm.useForm();
  useEffect(() => {
    form.resetFields();
  }, [opsType]);
  //umi数据流
  // const { setLoginUser } = useModel('userModel');
  // const loginUser = useSelector((state) => state.loginUser.loginUser);
  // console.log('loginUser：' + stringify(loginUser));
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const doSubmit = async (values: any) => {
    setLoading(true);
    // 根据 opsType 判断是登录还是注册
    if (opsType === 'login') {
      const loginRequest: API.LoginRequest = {
        mail: values.mail,
        password: values.password,
      };
      // console.log('登录');
      dispatch({
        type: 'loginUser/LoginUser',
        payload: { loginRequest },
      });
      // if (res) {
      // message.success('登陆成功');
      // setLoginUser(res);
      // sessionStorage.setItem('authorization', res.token);
      // setInitialState(res);
      //执行saveLoginUser，把登陆的用户信息保存在sessionStorage
      // 保存token到sessionStorage并设置过期时间
      // setTokenWithExpiry(res.token as string, TokenExpiryTIME);
      //成功后关闭登陆注册的抽屉
      onClose();
      // if (loginSuccess) {
      //   onClose();
      //   history.replace('/home');
      // }
      // }
      // dispatch({
      //   type: 'loginUser/LoginUser',
      //   payload: { loginRequest },
      // });
      // console.log(stringify(loginUser));
    } else if (opsType === 'register') {
      const registerRequest: API.RegisterRequest = {
        mail: values.mail,
        password: values.password,
        rePassword: values.rePassword,
        userName: values.userName,
        code: values.captcha,
      };
      dispatch({
        type: 'loginUser/RegisterUser',
        payload: { registerRequest },
      });
      // response = await registerUsingPost(registerRequest);
      onClose();

      // navigate('./home', { replace: true });
      //https://umijs.org/docs/api/api#history
      //跳转当前路径并刷新state
      // history.push({}, state);
      //注册后跳转到主页并刷新
      // history.push('./home');
      //把注册信息保存到状态管理
    }
    setLoading(false);
  };

  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);
  const getCaptcha = async (email: string) => {
    setCaptchaLoading(true);
    try {
      await sendRegisterCodeUsingPost({
        mail: email,
      });
      message.success('验证码发送成功，请注意邮箱查收');
    } catch (error) {
      // console.log('error:' + stringify(error));
      message.error('验证码发送失败：' + error);
    }
    setCaptchaLoading(false);
  };

  const handleGetCaptcha = async () => {
    const emailInput = document.getElementById('mail'); // 获取具有指定类名的元素
    const email = emailInput?.value; // 获取输入框的值
    // console.log('mail:' + email);
    const b = MAIL_REGEX.test(email);
    if (!email || !b) {
      message.warning('请输入正确的邮箱！');
      return Promise.reject('请输入邮箱');
    } else {
      getCaptcha(email);
    }
  };

  return (
    <>
      {loading ? (
        <Spin
          size="large"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        />
      ) : (
        <div style={{ backgroundColor: token.colorBgContainer }}>
          <LoginForm
            submitter={{
              searchConfig: {
                submitText: '登录注册',
              },
            }}
            onFinish={doSubmit}
            logo={LOGIN_LOGO}
            title="无问青秋"
            subTitle="就让我独自行事，自由做梦，任凭明天对我裁决"
          >
            <Tabs
              centered
              activeKey={opsType}
              onChange={(activeKey) => setOpsType(activeKey as OpsType)}
            >
              <Tabs.TabPane key={'login'} tab={'邮箱登录'} />
              <Tabs.TabPane key={'register'} tab={'注册账户'} />
            </Tabs>
            {opsType === 'login' && (
              <>
                <ProFormText
                  name="mail"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined />,
                  }}
                  placeholder={'邮箱'}
                  rules={[
                    {
                      required: true,
                      message: '请输入邮箱!',
                    },
                    {
                      pattern: MAIL_REGEX,
                      message: '邮箱格式错误！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                    strengthText: '必须同时含字母、数字两种字符，长度6-10位',
                    statusRender: (value) => {
                      const getStatus = () => {
                        if (value && value.length > 8) {
                          return 'ok';
                        }
                        if (value && value.length > 6) {
                          return 'pass';
                        }
                        return 'poor';
                      };
                      const status = getStatus();
                      if (status === 'ok') {
                        return (
                          <div style={{ color: token.colorSuccess }}>
                            强度：强
                          </div>
                        );
                      }
                      if (status === 'pass') {
                        return (
                          <div style={{ color: token.colorWarning }}>
                            强度：中
                          </div>
                        );
                      }
                      return (
                        <div style={{ color: token.colorError }}>强度：弱</div>
                      );
                    },
                  }}
                  placeholder={'密码'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                    {
                      pattern: PASSWORD_REGEX,
                      message: '密码格式错误！',
                    },
                  ]}
                />
              </>
            )}
            {opsType === 'register' && (
              <>
                <ProFormText
                  id="mailInput"
                  name="mail"
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined />,
                  }}
                  placeholder={'请输入注册邮箱'}
                  rules={[
                    {
                      required: true,
                      message: '请输入邮箱号！',
                    },
                    {
                      pattern: MAIL_REGEX,
                      message: '邮箱格式错误！',
                    },
                  ]}
                />
                <ProFormText
                  name="userName"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined />,
                  }}
                  placeholder={'用户名'}
                  rules={[
                    {
                      required: true,
                      message: '仅支持中文、字母、数字、下划线，长度2-6位',
                    },
                    {
                      pattern: USERNAME_REGEX,
                      message: '用户名格式错误！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                    strengthText: '必须同时含字母、数字两种字符，长度6-10位',
                    statusRender: (value) => {
                      const getStatus = () => {
                        if (value && value.length > 8) {
                          return 'ok';
                        }
                        if (value && value.length > 6) {
                          return 'pass';
                        }
                        return 'poor';
                      };
                      const status = getStatus();
                      if (status === 'pass') {
                        return (
                          <div style={{ color: token.colorWarning }}>
                            强度：中
                          </div>
                        );
                      }
                      if (status === 'ok') {
                        return (
                          <div style={{ color: token.colorSuccess }}>
                            强度：强
                          </div>
                        );
                      }
                      return (
                        <div style={{ color: token.colorError }}>强度：弱</div>
                      );
                    },
                  }}
                  placeholder={'密码'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                    {
                      pattern: PASSWORD_REGEX,
                      message: '密码格式错误！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="rePassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                    strengthText: '必须同时含字母、数字两种字符，长度6-10位',
                    statusRender: (value) => {
                      const getStatus = () => {
                        if (value && value.length > 8) {
                          return 'ok';
                        }
                        if (value && value.length > 6) {
                          return 'pass';
                        }
                        return 'poor';
                      };
                      const status = getStatus();
                      if (status === 'ok') {
                        return (
                          <div style={{ color: token.colorSuccess }}>
                            强度：强
                          </div>
                        );
                      }
                      if (status === 'pass') {
                        return (
                          <div style={{ color: token.colorWarning }}>
                            强度：中
                          </div>
                        );
                      }
                      return (
                        <div style={{ color: token.colorError }}>强度：弱</div>
                      );
                    },
                  }}
                  placeholder={'确认密码'}
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次密码输入不一致!'));
                      },
                    }),
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  // fieldRef={captchaRef}
                  placeholder={'请输入验证码'}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  onGetCaptcha={handleGetCaptcha}
                />
              </>
            )}
          </LoginForm>
        </div>
      )}
    </>
  );
};
