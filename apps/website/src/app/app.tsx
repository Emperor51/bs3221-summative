// App.tsx
import React, { useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomeOutlined, AuditOutlined, FormOutlined } from '@ant-design/icons';
import Home from './screens/home/home';
import { Audit } from './screens/audit/audit';
import Submission from './screens/submission/submission';
import type { MenuItemType } from 'antd/es/menu/interface';
import './app.module.css';
import Sider from 'antd/es/layout/Sider'; // Uncomment if using CSS modules

export function App() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

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
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
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

      <Layout>
        <Content style={{ margin: '16px' }}>
          <h1>Location Database</h1>
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
