import CustomButton from '../../components/button/CustomButton';
import CustomDropdown from '../../components/dropdown/CustomDropdown';
import { MenuItemType } from 'antd/es/menu/interface';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Table } from 'antd';
import React from 'react';

export function Submission() {

  const items: MenuItemType[] = [
    {
      key: '1',
      label: 'Location 1',
    },
    {
      key: '2',
      label: 'Location 2',
    },
    {
      key: '3',
      label: 'Location 3',
    },
    {
      key: '4',
      label: 'Location 4',
    },
  ];
  
  function item (title: string, items: MenuItemType[], placeholderText: string) {
    return (
      <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
        <p style={{ marginRight: '5px', width: '80px' }}>{title}</p>
        <CustomDropdown
          menuItems={items}
          placeholderText={placeholderText}
          type={"primary"} // Optional: Specify button type
          placement={"bottomLeft"} // Optional: Specify placement
        />
      </div>
    );
  }

  function handleSubmission() {
    // Handle submission logic here
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>Submissions</h1>
        <CustomButton
          icon={<PlusOutlined />}
          onClick={handleSubmission}>
          New Submission
        </CustomButton>
      </div>

      {item("Location", items, "Location")}
      {item("Room", items, "Room")}

      <CustomButton style={{ marginTop: '10px', marginBottom: '10px' }} onClick={handleSubmission}>Submit</CustomButton>

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
    </div>
    );
  }

  export default Submission;