// src/layouts/LayoutWithMenu.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Drawer, Grid, Image } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import protectedRoutes, { ProtectedRouteConfig } from '../config/protectedRoutes';
import roleHierarchy from '../constants/roleHierarchy';
import CustomButton from '../components/button/CustomButton';
import logo from '../../assets/logo.png';
import crest from '../../assets/crest.png';

const { Content } = Layout;
const { useBreakpoint } = Grid;

interface LayoutWithMenuProps {
  children: React.ReactNode;
}

const LayoutWithMenu: React.FC<LayoutWithMenuProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const { hasPermission, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Generate menu items from the route configuration, filtering by allowed roles.
  const menuItems = protectedRoutes
    .filter((route: ProtectedRouteConfig) =>
      route.menu && hasPermission(route.requiredPermission)
    )
    .map((route: ProtectedRouteConfig) => ({
      key: route.key,
      label: route.menu!.label,
      icon: route.menu!.icon,
    }));

  // Find the selected key by matching the current path.
  // We ensure the route path is absolute before comparing.
  const selectedKey =
    protectedRoutes.find((route) => {
      const path = route.path.startsWith('/') ? route.path : `/${route.path}`;
      return path === location.pathname;
    })?.key || '1';

  const handleMenuClick = (e: any) => {
    const selectedRoute = protectedRoutes.find((route) => route.key === e.key);
    if (selectedRoute) {
      const absolutePath = selectedRoute.path.startsWith('/')
        ? selectedRoute.path
        : `/${selectedRoute.path}`;
      navigate(absolutePath);
    } else {
      navigate('/');
    }
    setDrawerVisible(false);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {screens.md ? (
        // For medium and larger screens, display a Sider with the menu and a logout button.
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ height: '100vh', overflow: 'hidden', position: 'fixed', left: 0 }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <Image
              src={collapsed ? crest : logo}
              preview={false}
              style={{width: '90%', height: 'auto', margin: '10px auto', marginLeft: '5%'}}
              />
            <Menu
              theme="dark"
              selectedKeys={[selectedKey]}
              mode="inline"
              items={menuItems}
              onClick={handleMenuClick}
              style={{ marginTop: '10px', flex: 1 }}
            />
            <div style={{ padding: '10px' }}>
              <CustomButton
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                block
              >
                {collapsed ? '' : 'Logout'}
              </CustomButton>
            </div>
          </div>
        </Sider>
      ) : (
        // For small screens, display a header with a menu button, title and a logout button.
        <Layout.Header
          style={{
            padding: '0 16px',
            background: '#632054',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CustomButton
              type="text"
              icon={
                <MenuOutlined style={{ color: '#fff', fontSize: '20px' }} />
              }
              onClick={showDrawer}
            />
            <h1
              style={{ color: '#fff', marginLeft: '16px', display: 'inline' }}
            >
              Fire Marshals
            </h1>
          </div>
          <CustomButton
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </CustomButton>
          <Drawer
            title="Menu"
            placement="left"
            onClose={onClose}
            open={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              items={menuItems}
              onClick={handleMenuClick}
            />
          </Drawer>
        </Layout.Header>
      )}



      <Layout style={{ marginLeft: screens.md ? (collapsed ? 80 : 200) : 0, transition: 'margin-left 0.3s' }}>
        <Content
          style={{
            margin: '16px',
            padding: '16px',
            overflowY: 'auto', // ✅ Allow content scrolling
            height: '100vh',
          }}
        >{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWithMenu;
