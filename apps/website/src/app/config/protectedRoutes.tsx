import React from 'react';
import Home from '../screens/home/home';
import Audit from '../screens/audit/audit';
import Submission from '../screens/submission/submission';
import UserSetup from '../screens/usersetup/UserSetup';
import Settings from '../screens/settings/Settings';
import { HomeOutlined, AuditOutlined, FormOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

export interface ProtectedRouteConfig {
  key: string;
  path: string;
  element: React.ReactNode;
  requiredPermission: string;
  menu?: {
    label: string;
    icon: React.ReactNode;
  };
  description: string;
}

const protectedRoutes: ProtectedRouteConfig[] = [
  {
    key: '1',
    path: '',
    element: <Home />,
    requiredPermission: 'page.view.home',
    menu: { label: 'Home', icon: <HomeOutlined /> },
  },
  {
    key: '2',
    path: 'submit',
    element: <Submission />,
    requiredPermission: 'page.view.submit',
    menu: { label: 'Submission', icon: <FormOutlined /> },
    description: 'Submit your location',
  },
  {
    key: '3',
    path: 'audit',
    element: <Audit />,
    requiredPermission: 'page.view.audit',
    menu: { label: 'Audit', icon: <AuditOutlined /> },
    description: 'Audit Fire Marshals'
  },
  {
    key: '4',
    path: 'user-setup',
    element: <UserSetup />,
    requiredPermission: 'page.view.users',
    menu: { label: 'User Setup', icon: <UserOutlined /> },
    description: 'User Management'
  },
  {
    key: '5',
    path: 'settings',
    element: <Settings />,
    requiredPermission: 'page.view.settings',
    menu: { label: 'Settings', icon: <SettingOutlined /> },
    description: 'Application Settings'
  },
];

export default protectedRoutes;
