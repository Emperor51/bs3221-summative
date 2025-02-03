import React, { useState } from 'react';
import { Table, Checkbox } from 'antd';
import CustomButton from '../../components/button/CustomButton';
import { UserAddOutlined } from '@ant-design/icons';

const Unauthorised: React.FC = () => {

  const initialUserData = [
    { id: 1, firstName: 'John', lastName: 'Doe', role: 'Admin', active: true },
    { id: 2, firstName: 'Catrin', lastName: 'Alberda', role: 'Auditor', active: true },
    { id: 3, firstName: 'Sarita', lastName: 'Maestri', role: 'User', active: true },
    { id: 4, firstName: 'Ajita', lastName: 'Émile', role: 'User', active: true },
    { id: 5, firstName: 'Marina', lastName: 'Lamon', role: 'User', active: true },
  ];

  const [users, setUsers] = useState(initialUserData);

  // This function simulates an API call to toggle the active flag.
  const toggleActive = (record: any, checked: boolean) => {
    console.log(`Simulating API call to update active state for id ${record.id} to ${checked}`);
    // Simulate an API call delay
    setTimeout(() => {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === record.id ? { ...user, active: checked } : user
        )
      );
    }, 0);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2>User Setup</h2>
        <CustomButton icon={<UserAddOutlined />}>Add User</CustomButton>
      </div>
      <Table dataSource={users} rowKey="id">
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column
          title="First Name"
          dataIndex="firstName"
          key="firstName"
        />
        <Table.Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Table.Column title="Role" dataIndex="role" key="role" />
        <Table.Column
          title="Active"
          dataIndex="active"
          key="active"
          render={(active: boolean, record: any) => (
            <Checkbox
              checked={active}
              onChange={(e) => toggleActive(record, e.target.checked)}
            />
          )}
        />
      </Table>
    </div>
  );
};

export default Unauthorised;
