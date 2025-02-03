// src/config/protectedRoutes.ts
import React from 'react';
import Home from '../screens/home/home';
import Audit from '../screens/audit/audit';
import Submission from '../screens/submission/submission';
import { HomeOutlined, AuditOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import UserSetup from '../screens/usersetup/UserSetup';

export interface ProtectedRouteConfig {
  key: string;
  path: string;
  element: React.ReactNode;
  allowedRoles: string[];
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
    allowedRoles: ['admin', 'user'],
    menu: { label: 'Home', icon: <HomeOutlined /> },
  },
  {
    key: '2',
    path: 'submit',
    element: <Submission />,
    allowedRoles: ['admin', 'user'],
    menu: { label: 'Submission', icon: <FormOutlined /> },
  },
  {
    key: '3',
    path: 'audit',
    element: <Audit />,
    allowedRoles: ['admin'],
    menu: { label: 'Audit', icon: <AuditOutlined /> },
  },
  {
    key: '4',
    path: 'user-setup',
    element: <UserSetup />,
    allowedRoles: ['admin'],
    menu: { label: 'User Setup', icon: <UserOutlined /> },
  },
];

export default protectedRoutes;
