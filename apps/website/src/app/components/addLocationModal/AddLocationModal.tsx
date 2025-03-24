import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, InputNumber } from 'antd';
import API from '../../axiosInstance';

const { Option } = Select;

interface AddLocationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refreshLocations: () => void;
}

export const AddLocationModal: React.FC<AddLocationModalProps> = ({open, setOpen, refreshLocations}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      await API.post('/location', values);
      message.success('Location added successfully.');

      form.resetFields();
      setOpen(false);
      refreshLocations();
    } catch (error) {
      console.error('Error creating user:', error);
      message.error('Failed to create user');
    }
    setLoading(false);
  };


  return (
    <Modal title="Add Location" open={open} onOk={handleOk} onCancel={() => setOpen(false)} confirmLoading={loading}>
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true, type: 'string', message: 'Enter a location' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
