import { Modal, Form, message } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import CustomDropdown from '../dropdown/CustomDropdown';
import React, { useState } from 'react';
import CustomButton from '../button/CustomButton';

interface AddSubmissionModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const AddSubmissionModal: React.FC<AddSubmissionModalProps> = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const locations: MenuItemType[] = [
    { key: '1', label: 'Location 1' },
    { key: '2', label: 'Location 2' },
    { key: '3', label: 'Location 3' },
    { key: '4', label: 'Location 4' },
  ];

  const rooms: MenuItemType[] = [
    { key: '1', label: 'Room 1' },
    { key: '2', label: 'Room 2' },
    { key: '3', label: 'Room 3' },
    { key: '4', label: 'Room 4' },
  ];

  const handleSubmission = async (values: { location: string; room: string }) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success('Submission recorded successfully');
      form.resetFields();
      setVisible(false);
    } catch (error) {
      message.error('Failed to record submission');
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
      title="Report Marshal Location"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <CustomButton key="cancel" onClick={handleCancel}>
          Cancel
        </CustomButton>,
        <CustomButton key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          Submit
        </CustomButton>,
      ]}
    >
      <Form form={form} name="addSubmission" onFinish={handleSubmission} layout="vertical" style={{ marginTop: '20px'}}>
        <Form.Item name="location" rules={[{ required: true, message: 'Please select a location!' }]}>
          <CustomDropdown menuItems={locations} placeholderText="Select Location" />
        </Form.Item>

        <Form.Item name="room" rules={[{ required: false, message: 'Please select a room!' }]}>
          <CustomDropdown menuItems={rooms} placeholderText="Select Room" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
