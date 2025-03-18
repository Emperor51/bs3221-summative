import React, { useState } from 'react';
import { Form, Input, Card, message } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import CustomButton from '../../components/button/CustomButton';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      message.error('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#257478' }}>
      <Card title="Please sign in" style={{ width: 400 }}>
        <Form name="login" onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <CustomButton type="primary" htmlType="submit" loading={loading} block>
              Sign in
            </CustomButton>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
