import { Modal, Form, message, Select } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import CustomDropdown from '../dropdown/CustomDropdown';
import React, { useState, useEffect } from 'react';
import CustomButton from '../button/CustomButton';
import axios from 'axios';

interface AddSubmissionModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const AddSubmissionModal: React.FC<AddSubmissionModalProps> = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<MenuItemType[]>([]);
  const [locations, setLocations] = useState<MenuItemType[]>([]);

  // Function to fetch rooms and cache them for 1 hour
  const getLocations = async () => {
    const cacheKey = 'rooms_cache';
    const cachedData = localStorage.getItem(cacheKey);
    const now = Date.now();

    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (now - timestamp < 3600 * 1000) { // ✅ Ensure cache is not expired
        setLocations(data);
        return;
      }
    }

    try {
      const response = await axios.get('http://localhost:3169/api/rooms');
      const fetchedLocations = response.data.map((location: string, index: number) => ({
        value: location, // ✅ Use the actual location as value
        label: location, // ✅ Ensure label matches expected format
      }));

      setLocations(fetchedLocations);
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: now, data: fetchedLocations }));
    } catch (error) {
      console.error('Error fetching locations:', error);
      message.error('Failed to load locations');
    }
  };


  // Fetch locations when the modal becomes visible
  useEffect(() => {
    if (visible) {
      getLocations();
    }
  }, [visible]);

  const handleSubmission = async (values: { key: string; location: string }) => {
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
      <Form form={form} name="addSubmission" onFinish={handleSubmission} layout="vertical" style={{ marginTop: '20px' }}>
        <Form.Item
          name="location"
          rules={[{ required: true, message: 'Please select a location!' }]}
        >
          <Select
            showSearch
            placeholder="Select Location"
            options={locations} // ✅ Pass the options array directly
            filterOption={(input, option) =>
              (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>




        {/*<Form.Item name="room" rules={[{ required: false, message: 'Please select a room!' }]}>*/}
        {/*  <CustomDropdown menuItems={rooms} placeholderText="Select Room" />*/}
        {/*</Form.Item>*/}
      </Form>
    </Modal>
  );
};
