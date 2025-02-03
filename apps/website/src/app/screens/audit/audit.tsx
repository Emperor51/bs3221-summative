import { Table } from 'antd';
import React from 'react';

export function Audit () {
  return (
    <div>
      <h1>Audit</h1>
      <p>Fire Marshals currently in a building will appear in the 'Active' table. Historical entries are visible below, filterable by user, building, room and date</p>
      <h2>Active</h2>
      <Table>
        <Table.Column title="Building" dataIndex="building" key="building" />
        <Table.Column title="Room" dataIndex="room" key="room" />
        <Table.Column title="Marshals" dataIndex="marshals" key="marshals" />
      </Table>
      <h2>Past</h2>
      <Table>
        <Table.Column title="Marshal" dataIndex="marshal" key="marshal" />
        <Table.Column title="Building" dataIndex="building" key="building" />
        <Table.Column title="Room" dataIndex="room" key="room" />
        <Table.Column title="Entry Time" dataIndex="entryTime" key="entryTime" />
        <Table.Column title="Exit Time" dataIndex="exitTime" key="exitTime" />
      </Table>
    </div>
  );
}

export default Audit;