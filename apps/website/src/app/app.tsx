// App.tsx
import React, { useState } from 'react';
import { Layout, Menu, MenuProps, Drawer, Button, Grid } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomeOutlined, AuditOutlined, FormOutlined, MenuOutlined } from '@ant-design/icons';
import Home from './screens/home/home';
import { Audit } from './screens/audit/audit';
import Submission from './screens/submission/submission';
import type { MenuItemType } from 'antd/es/menu/interface';
import './app.module.css';
import Sider from 'antd/es/layout/Sider';

const { useBreakpoint } = Grid;

export function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  function getItem(
    label: React.ReactNode,
    key: string,
    icon?: React.ReactNode,
    children?: MenuItemType[]
  ): MenuItemType {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItemType;
  }

  const items: MenuItemType[] = [
    getItem('Home', '1', <HomeOutlined />),
    getItem('Audit', '2', <AuditOutlined />),
    getItem('Submission', '3', <FormOutlined />),
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/audit');
        break;
      case '3':
        navigate('/submit');
        break;
      default:
        navigate('/');
    }
    setDrawerVisible(false); // Close drawer after navigation
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {screens.md ? (
        // Render Sider for medium and larger screens
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
            style={{ marginTop: '10px' }}
          />
        </Sider>
      ) : (
        // Render top bar with menu button for small screens
        <Layout.Header style={{ padding: '0 16px', background: '#001529' }}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: '#fff', fontSize: '20px' }} />}
            onClick={showDrawer}
          />
          <h1 style={{ color: '#fff', marginLeft: '16px', display: 'inline' }}>Fire Marshals</h1>
          <Drawer
            title="Menu"
            placement="left"
            onClose={onClose}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              items={items}
              onClick={handleMenuClick}
            />
          </Drawer>
        </Layout.Header>
      )}

      <Layout>
        <Content style={{ margin: '16px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/submit" element={<Submission />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
