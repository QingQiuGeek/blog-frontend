import { ProCard } from '@ant-design/pro-components';
import { Avatar, Button, Form, Input, Tabs } from 'antd';
import { useState } from 'react';

type OpsType = 'login' | 'register';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Login = () => {
  const [opsType, setOpsType] = useState<OpsType>('login');
  const [form] = Form.useForm();

  const onFinishRegister = (values: any) => {
    // console.log('Received values of form: ', values);
  };
  const onFinishLogin = (values: any) => {
    // console.log('Received values of form: ', values);
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://ooo.0x0.ooo/2024/10/19/ODGytX.jpg"
          shape="square"
          size={100}
        ></Avatar>

        <span
          style={{
            fontFamily: 'cursive',
            fontSize: '35px',
            fontWeight: 'bolder',
            bottom: 0,
            display: 'block',
            // marginTop: 0,
          }}
        >
          无问青秋
        </span>
        <b style={{ fontFamily: 'cursive' }}>
          请让我独自行事，自由做梦，任凭明天对我裁决
        </b>
      </div>

      <Tabs
        onChange={(activeKey) => setOpsType(activeKey as OpsType)}
        defaultActiveKey={opsType}
        centered
      >
        <Tabs.TabPane key={'login'} tab={'邮箱登录'} />
        <Tabs.TabPane key={'register'} tab={'注册账户'} />
      </Tabs>
      <ProCard
        bodyStyle={{
          margin: '0 auto',
        }}
      >
        {opsType === 'login' && (
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinishLogin}
            style={{ maxWidth: 600 }}
            scrollToFirstError
          >
            <Form.Item
              name="mail"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  message: 'The E-mail is not valid !',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Button block type="primary" htmlType="submit">
              登录
            </Button>
          </Form>
        )}
        {opsType === 'register' && (
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinishRegister}
            style={{ maxWidth: 600 }}
            scrollToFirstError
          >
            <Form.Item
              name="mail"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  message: 'The E-mail is not valid!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="userName"
              label="用户名"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: 'Please input your userName!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="rePassword"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The new password that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button block type="primary" htmlType="submit">
              注册账户
            </Button>
          </Form>
        )}
      </ProCard>
    </>
  );
};

export default Login;
