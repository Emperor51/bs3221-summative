import { Form, Input, Modal, message, Select } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import CustomDropdown from '../dropdown/CustomDropdown';
import React, { useState } from 'react';
import roleHierarchy from '../../constants/roleHierarchy';
import CustomButton from '../button/CustomButton';
import axios from 'axios';

interface AddUserModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const roles: { value: string, label: string }[] = Object.entries(roleHierarchy).map(([role, value]) => ({
    value: value.toString(),
    label: role,
  }));

  const handleSubmission = async (values: { email: string; role: string }) => {
    setLoading(true);

    try {
      await axios.post('/api/users', {
        email: values.email,
        role: values.role,
      });

      message.success('User added successfully');
      form.resetFields();
      setVisible(false);
    } catch (error) {
      message.error('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      title="Add User"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <CustomButton key="cancel" onClick={handleCancel}>
          Cancel
        </CustomButton>,
        <CustomButton key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          Add User
        </CustomButton>,
      ]}
    >
      <Form form={form} name="adduser" onFinish={handleSubmission} layout="vertical" style={{ marginTop: '20px' }}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input the user\'s email!' }]}
        >
          <Input placeholder="Email Address" addonAfter="@winchester.ac.uk" allowClear />
        </Form.Item>
        <Form.Item
          name="firstname"
          rules={[{ required: true, message: 'Please input the user\'s first name!' }]}
        >
          <Input placeholder="First Name" allowClear />
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[{ required: true, message: 'Please input the user\'s last name!' }]}
        >
          <Input placeholder="Last Name" allowClear />
        </Form.Item>

        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select the user's role!" }]}
        >
          <Select
            placeholder="Select Role"
            options={roles} // ✅ Pass the options array directly
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
