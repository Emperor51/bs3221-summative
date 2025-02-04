// src/config/protectedRoutes.ts
import React from 'react';
import Home from '../screens/home/home';
import Audit from '../screens/audit/audit';
import Submission from '../screens/submission/submission';
import { HomeOutlined, AuditOutlined, FormOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import UserSetup from '../screens/usersetup/UserSetup';
import Settings from '../screens/settings/Settings';

export interface ProtectedRouteConfig {
  key: string;
  path: string;
  element: React.ReactNode;
  minRole: 'user' | 'auditor' | 'admin';
  menu?: {
    label: string;
    icon: React.ReactNode;
  };
}

const protectedRoutes: ProtectedRouteConfig[] = [
  {
    key: '1',
    path: '',
    element: <Home />,
    minRole: 'user',
    menu: { label: 'Home', icon: <HomeOutlined /> },
  },
  {
    key: '2',
    path: 'submit',
    element: <Submission />,
    minRole: 'user',
    menu: { label: 'Submission', icon: <FormOutlined /> },
  },
  {
    key: '3',
    path: 'audit',
    element: <Audit />,
    minRole: 'auditor',
    menu: { label: 'Audit', icon: <AuditOutlined /> },
  },
  {
    key: '4',
    path: 'user-setup',
    element: <UserSetup />,
    minRole: 'admin',
    menu: { label: 'User Setup', icon: <UserOutlined /> },
  },
  {
    key: '5',
    path: 'settings',
    element: <Settings />,
    minRole: 'admin',
    menu: { label: 'Settings', icon: <SettingOutlined /> },
  },
];

export default protectedRoutes;
