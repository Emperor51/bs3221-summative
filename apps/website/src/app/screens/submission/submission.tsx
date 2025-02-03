import CustomButton from '../../components/button/CustomButton';
import { PlusOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React from 'react';
import { AddSubmissionModal } from '../../components/addSubmissionModal/AddSubmissionModal';

export function Submission() {
  const [visible, setVisible] = React.useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]); // Store the selected row keys

  // Function to handle the submission
  function handleSubmission() {
    // Handle submission logic here
  }

  // Toggle visibility of the modal
  function toggleVisibilty() {
    setVisible(!visible);
  }

  // Handle selection change
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Define the rowSelection object
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const sampleData = [
    {
      id: 1,
      building: 'Building 1',
      room: 'Room 1',
      entryTime: '10:00 AM',
      exitTime: '12:00 PM',
    },
    {
      id: 2,
      building: 'Building 2',
      room: 'Room 2',
      entryTime: '11:00 AM',
      exitTime: '1:00 PM',
    },
    {
      id: 3,
      building: 'Building 3',
      room: 'Room 3',
      entryTime: '12:00 PM',
      exitTime: '2:00 PM',
    },
    ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>Submissions</h1>
        <CustomButton
          icon={<PlusOutlined />}
          onClick={toggleVisibilty}
        >
          New Submission
        </CustomButton>
      </div>

      <Table
        dataSource={sampleData}  // Your actual data goes here
        rowKey="id"
        rowSelection={rowSelection}  // Use native rowSelection
      >
        <Table.Column title="Building" dataIndex="building" key="building" />
        <Table.Column title="Room" dataIndex="room" key="room" />
        <Table.Column title="Entry Time" dataIndex="entryTime" key="entryTime" />
        <Table.Column title="Exit Time" dataIndex="exitTime" key="exitTime" />
      </Table>

      <AddSubmissionModal visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default Submission;
