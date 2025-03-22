import React, { useEffect, useState } from 'react';
import { Table, message, Popconfirm, DatePicker, Tag, Button } from 'antd';
import CustomButton from '../../components/button/CustomButton';
import { PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons';
import { AddSubmissionModal } from '../../components/addSubmissionModal/AddSubmissionModal';
import API from '../../axiosInstance';
import dayjs from 'dayjs';
import './submission.css';

const { RangePicker } = DatePicker;

interface SubmissionType {
  id: number;
  location: {
    id: number;
    name: string;
  };
  entryTime: string;
  exitTime?: string | null;
}

export function Submission() {
  const [visible, setVisible] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editingSubmission, setEditingSubmission] = useState<SubmissionType | null>(null);

  // ✅ Default range to today (00:00 - 23:59)
  const defaultStart = dayjs().startOf('day');
  const defaultEnd = dayjs().endOf('day');
  const [dateRange, setDateRange] = useState<[string, string]>([
    defaultStart.toISOString(),
    defaultEnd.toISOString(),
  ]);

  useEffect(() => {
    fetchSubmissions();
  }, [dateRange]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const url = `/submissions?entryTime=${dateRange[0]}&exitTime=${dateRange[1]}`;
      const response = await API.get(url);

      // ✅ Separate ongoing submissions (where exitTime is null)
      const ongoingSubmissions = response.data.filter((sub: SubmissionType) => !sub.exitTime);
      const completedSubmissions = response.data.filter((sub: SubmissionType) => sub.exitTime);

      // ✅ Sort ongoing submissions to appear at the top
      setSubmissions([...ongoingSubmissions, ...completedSubmissions]);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
      message.error('Failed to load submissions.');
    }
    setLoading(false);
  };

  const deleteSubmission = async (id: number) => {
    try {
      await API.delete(`/submissions/${id}`);
      message.success('Submission deleted');
      fetchSubmissions();
    } catch (error) {
      console.error('Failed to delete submission:', error);
      message.error('Failed to delete submission');
    }
  };

  const toggleVisibilty = () => {
    setEditingSubmission(null);
    setVisible(true);
  };

  const startEditing = (submission: SubmissionType) => {
    setEditingSubmission(submission);
    setVisible(true);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const endSubmission = async (values: SubmissionType) => {
    const payload = {
      location: values.location.id,
      entryTime: values.entryTime,
      exitTime: new Date().toISOString(),
    };

    await API.patch(`/submissions/${values.id}`, payload);
    fetchSubmissions();
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>Submissions</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <RangePicker
            showTime
            defaultValue={[defaultStart, defaultEnd]}
            onChange={(dates, dateStrings) => {
              if (dates && dates[0] && dates[1]) {
                setDateRange([dates[0].toISOString(), dates[1].toISOString()]);
              }
            }}
          />
          <CustomButton icon={<PlusOutlined />} onClick={toggleVisibilty}>
            New Submission
          </CustomButton>
        </div>
      </div>

      <Table
        dataSource={submissions}
        rowKey="id"
        loading={loading}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        rowClassName={(record: SubmissionType) => (!record.exitTime ? 'ongoing-submission' : '')} // ✅ Fix Type Issue
      >
        <Table.Column title="Location" dataIndex={['location', 'name']} key="location" />
        <Table.Column
          title="Entry Time"
          dataIndex="entryTime"
          key="entryTime"
          render={(entryTime) => dayjs(entryTime).format('DD MMM YYYY, HH:mm')}
        />
        <Table.Column
          title="Exit Time"
          dataIndex="exitTime"
          key="exitTime"
          render={(exitTime) =>
            exitTime ? dayjs(exitTime).format('DD MMM YYYY, HH:mm') : <Tag color="red">Ongoing</Tag>
          }
        />

        <Table.Column
          title="Elapsed Time"
          key="elapsedTime"
          render={(_, record: SubmissionType) => {
            const entryTime = dayjs(record.entryTime);
            const exitTime = record.exitTime ? dayjs(record.exitTime) : dayjs();
            const duration = dayjs.duration(exitTime.diff(entryTime));
            return `${duration.asDays() < 1 ? "" : duration.days() + " days"},
                    ${duration.asHours() < 1 ? "" : duration.hours() + " hours"}, ${duration.minutes()} minutes`}}
        />

        <Table.Column
          title="Actions"
          key="actions"
          render={(_, record: SubmissionType) => (
            <>
              <Button icon={<EditOutlined />} onClick={() => startEditing(record)} style={{ marginRight: 8 }}>
                Edit
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this submission?"
                onConfirm={() => deleteSubmission(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined /> } danger style={{ marginRight: 8 }}>
                  Delete
                </Button>
              </Popconfirm>
              {record.exitTime ? null :
                <Popconfirm title="Are you sure you want to end this submission?"
                                                    onConfirm={() => endSubmission(record)}>
                  <CustomButton type="primary">End</CustomButton>
                </Popconfirm>
              }
            </>
          )}
        />
      </Table>

      <AddSubmissionModal
        visible={visible}
        setVisible={setVisible}
        refreshSubmissions={fetchSubmissions}
        editingSubmission={editingSubmission}
      />
    </div>
  );
}

export default Submission;
