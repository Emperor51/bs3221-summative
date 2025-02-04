import React, { useState } from 'react';
import { Form, Input, Card, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CustomButton from '../../components/button/CustomButton';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  /** TODO - Login Page
   * 1. Add authentication
   * 2. Add winchester branding
   * 3. Link to Office 365?
   */

  const onFinish = (values: any) => {
    setLoading(true);
    // Simulate authentication process
    values.username = values.username ?? 'admin';
    setTimeout(() => {
      // For demonstration purposes, assign role based on username
      const role = values.username === 'admin' ? 'admin' : values.username === 'auditor' ? 'auditor' : 'user';
      signIn({ name: values.username, role });
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#257478'
      }}
    >
      <Card title="Please sign in" style={{ width: 300 }}>
        <Form name="login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <CustomButton type="primary" htmlType="submit" loading={loading} block>
              Sign in
            </CustomButton>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <Image src={'https://learn.microsoft.com/en-us/entra/identity-platform/media/howto-add-branding-in-apps/ms-symbollockup_signin_light.svg'}
                 preview={false}
                 onClick={onFinish}/>
        </div>
      </Card>
    </div>
  );
};

export default Login;
