import React, { useState, useEffect } from 'react';
import { Table, Checkbox, message } from 'antd';
import CustomButton from '../../components/button/CustomButton';
import { UserAddOutlined } from '@ant-design/icons';
import { AddUserModal } from '../../components/addUserModal/AddUserModal';
import API from '../../axiosInstance';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: { role: string }; // Adjust based on actual API response
  active: boolean;
}

const UserSetup: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await API.get('/user/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      message.error('Failed to load users');
    }
    setLoading(false);
  };

  const toggleActive = async (record: any, checked: boolean) => {
    try {
      await API.patch(`/user/${checked ? 'activate' : 'deactivate'}/${record.id}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === record.id ? { ...user, active: checked } : user))
      );
      message.success(`User ${checked ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update user status');
    }
  };

  const toggleModal = () => setVisible(!visible);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>User Setup</h1>
        <CustomButton icon={<UserAddOutlined />} onClick={toggleModal}>
          Add User
        </CustomButton>
      </div>
      <Table dataSource={users} rowKey="id" loading={loading}>
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column title="First Name" dataIndex="firstName" key="firstName" />
        <Table.Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Table.Column title="Role" dataIndex="role" key="role" render={(role) => role.role} />
        <Table.Column
          title="Active"
          dataIndex="active"
          key="active"
          render={(active: boolean, record: any) => (
            <Checkbox checked={active} onChange={(e) => toggleActive(record, e.target.checked)} />
          )}
        />
      </Table>

      <AddUserModal open={visible} setopen={setVisible} refreshUsers={fetchUsers} />
    </div>
  );
};

export default UserSetup;
