import React, { useState, useEffect } from 'react';
import { Table, Checkbox, message, Input, Space, Button, Modal, Select, Tag } from 'antd';
import { UserAddOutlined, EditOutlined, LockOutlined, SearchOutlined } from '@ant-design/icons';
import CustomButton from '../../components/button/CustomButton';
import { AddUserModal } from '../../components/addUserModal/AddUserModal';
import API from '../../axiosInstance';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: { role: string };
  active: boolean;
  email: string;
}

const { Option } = Select;

const UserSetup: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

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

  const toggleActive = async (record: User, checked: boolean) => {
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

  const handleResetPassword = async (userId: number) => {
    // generate random password
    const randomPassword = Math.random().toString(36).slice(-8);

    try {
      await API.post(`/auth/reset-password`, { userId, password: randomPassword });
      message.success('Password reset email sent');
      message.info(randomPassword)
    } catch (error) {
      console.error('Failed to reset password:', error);
      message.error('Failed to reset password');
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const handleEditUser = async () => {
    if (!editingUser) return;
    try {
      await API.patch(`/user/update/${editingUser.id}`, {
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        role: editingUser.role.role,
        email: editingUser.email,
      });
      message.success('User updated successfully');
      fetchUsers();
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update user');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1>User Setup</h1>
        <Space>
          <Input
            placeholder="Search by name"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          {/*<Select*/}
          {/*  placeholder="Filter by role"*/}
          {/*  style={{ width: 150 }}*/}
          {/*  allowClear*/}
          {/*  onChange={setSelectedRole}*/}
          {/*>*/}
          {/*  {[...new Set(users.map((user) => user.role.role))].map((role) => (*/}
          {/*    <Option key={role} value={role}>*/}
          {/*      {role}*/}
          {/*    </Option>*/}
          {/*  ))}*/}
          {/*</Select>*/}
          <CustomButton icon={<UserAddOutlined />} onClick={() => setVisible(true)}>
            Add User
          </CustomButton>
        </Space>
      </div>

      <Table dataSource={filteredUsers} rowKey="id" loading={loading} bordered>
        <Table.Column title="ID" dataIndex="id" key="id" />
        {/*<Table.Column title="First Name" dataIndex="firstName" key="firstName" />*/}
        {/*<Table.Column title="Last Name" dataIndex="lastName" key="lastName" />*/}
        <Table.Column
          title="Name"
          key="name"
          render={(record) => `${record.firstName} ${record.lastName}`}
        />
        <Table.Column title="Email" dataIndex="email" key="email"/>
        <Table.Column
          title="Role"
          dataIndex={['role', 'role']}
          key="role"
          filters={[...new Set(users.map((user) => user.role.role))].map((role) => ({ text: role, value: role }))}
          onFilter={(value, record) => record.role.role === value}
          render={(role: string) => (
            <Tag color={"Admin" === role ? 'red' : "Auditor" === role ? 'blue' : 'green'}>
              {role}
            </Tag>
          )}
        />

        <Table.Column
          title="Active"
          dataIndex="active"
          key="active"
          render={(active: boolean, record: User) => (
            <Checkbox checked={active} onChange={(e) => toggleActive(record, e.target.checked)} />
          )}
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record: User) => (
            <Space>
              <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
                Edit
              </Button>
              <Button icon={<LockOutlined />} danger onClick={() => handleResetPassword(record.id)}>
                Reset Password
              </Button>
            </Space>
          )}
        />
      </Table>

      {/* Add User Modal */}
      <AddUserModal open={visible} setOpen={setVisible} refreshUsers={fetchUsers} />

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        open={editModalVisible}
        onOk={handleEditUser}
        onCancel={() => setEditModalVisible(false)}
      >
        <Input
          placeholder="First Name"
          value={editingUser?.firstName}
          onChange={(e) => setEditingUser((prev) => ({ ...prev!, firstName: e.target.value }))}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Last Name"
          value={editingUser?.lastName}
          onChange={(e) => setEditingUser((prev) => ({ ...prev!, lastName: e.target.value }))}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Email"
          value={editingUser?.email}
          onChange={(e) => setEditingUser((prev) => ({ ...prev!, email: e.target.value }))}
          style={{ marginBottom: 10 }}
        />
        <Select
          placeholder="Role"
          value={editingUser?.role.role}
          onChange={(value) => setEditingUser((prev) => ({ ...prev!, role: { role: value } }))}
          style={{ width: '100%' }}
        >
          {[...new Set(users.map((user) => user.role.role))].map((role) => (
            <Option key={role} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default UserSetup;
