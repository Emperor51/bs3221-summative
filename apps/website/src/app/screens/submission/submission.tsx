import CustomButton from '../../components/button/CustomButton';
import CustomDropdown from '../../components/dropdown/CustomDropdown';
import { MenuItemType } from 'antd/es/menu/interface';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Table } from 'antd';
import React from 'react';
import { AddSubmissionModal } from '../../components/addSubmissionModal/AddSubmissionModal';

export function Submission() {

  const [visible, setVisible] = React.useState(false);

  function handleSubmission() {
    // Handle submission logic here
  }

  function toggleVisibilty() {
    setVisible(!visible);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>Submissions</h1>
        <CustomButton
          icon={<PlusOutlined />}
          onClick={toggleVisibilty}>
          New Submission
        </CustomButton>
      </div>

      <Table dataSource={[]} rowKey="id">
        <Table.Column title=""
          render={(selected: boolean, record: any) => (
          <Checkbox
            checked={selected}
          />
        )}/>
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