import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, DatePicker, message } from 'antd';
import API from '../../axiosInstance';
import dayjs from 'dayjs';

const { Option } = Select;

interface AddSubmissionModalProps {
  visible: boolean,
  setVisible: (v: boolean) => void,
  refreshSubmissions: () => void,
  editingSubmission?: any;
}

interface location {
  id: number,
  name: string,
}

export const AddSubmissionModal: React.FC<AddSubmissionModalProps> = ({
                                                                         visible,
                                                                         setVisible,
                                                                         refreshSubmissions,
                                                                        editingSubmission
                                                                      }) => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (editingSubmission) {
      form.setFieldsValue({
        location: editingSubmission.location.id,
        entryTime: dayjs(editingSubmission.entryTime),
        exitTime: editingSubmission.exitTime ? dayjs(editingSubmission.exitTime) : null,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        entryTime: dayjs(),
      })
    }
  }, [editingSubmission, form]);

  const fetchLocations = async () => {
    try {
      const response = await API.get('/location');
      setLocations(response.data);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      message.error('Failed to load locations.');
    }
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const payload = {
        location: values.location,
        entryTime: values.entryTime.toISOString(),
        exitTime: values.exitTime ? values.exitTime.toISOString() : null,
      };

      if (editingSubmission) {
        await API.patch(`/submissions/${editingSubmission.id}`, payload);
        message.success('Submission updated successfully');
      } else {
        await API.post('/submissions', payload);
        message.success('Submission created successfully');
      }

      form.resetFields();
      setVisible(false);
      refreshSubmissions();
    } catch (error) {
      console.error('Error creating submission:', error);
      message.error('Failed to create submission');
    }
    setLoading(false);
  };

  return (
    <Modal
      title={editingSubmission ? 'Edit Submission' : 'New Submission'} open={visible} onOk={handleOk} onCancel={() => setVisible(false)} confirmLoading={loading}>
      <Form form={form} layout="vertical">
        <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please select a location' }]}>
          <Select placeholder="Select a location">
            {locations.map((location: location) => (
              <Option key={location.id} value={location.id}>
                {location.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="entryTime" label="Entry Time" rules={[{ required: true, message: 'Please select entry time' }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="exitTime" label="Exit Time">
          <DatePicker showTime />
        </Form.Item>
      </Form>
    </Modal>
  );
};
