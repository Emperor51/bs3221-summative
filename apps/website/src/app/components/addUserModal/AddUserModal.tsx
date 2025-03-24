import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, InputNumber } from 'antd';
import API from '../../axiosInstance';

const { Option } = Select;

interface AddUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refreshUsers: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({open, setOpen, refreshUsers}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      await API.post('/user/create', values);
      message.success('User created successfully');

      form.resetFields();
      setOpen(false);
      refreshUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      message.error('Failed to create user');
    }
    setLoading(false);
  };

  return (
    <Modal title="Add User" open={open} onOk={handleOk} onCancel={() => setOpen(false)} confirmLoading={loading}>
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="ID" rules={[{ required: true, message: 'ID is required' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'First name is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Last name is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Role is required' }]}>
          <Select>
            <Option value={1}>Admin</Option>
            <Option value={2}>Auditor</Option>
            <Option value={3}>User</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
