import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const onFinish = (values: any) => {
    setLoading(true);
    // Simulate authentication process
    setTimeout(() => {
      // For demonstration purposes, assign role based on username
      const role = values.username === 'admin' ? 'admin' : 'user';
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
        background: '#f0f2f5'
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
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign in
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <Button type="link">Sign in with Office 365</Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
