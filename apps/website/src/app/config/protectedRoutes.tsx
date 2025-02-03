// src/config/protectedRoutes.ts
import React from 'react';
import Home from '../screens/home/home';
import Audit from '../screens/audit/audit';
import Submission from '../screens/submission/submission';
import { HomeOutlined, AuditOutlined, FormOutlined } from '@ant-design/icons';

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
    path: 'audit',
    element: <Audit />,
    allowedRoles: ['admin'],
    menu: { label: 'Audit', icon: <AuditOutlined /> },
  },
  {
    key: '3',
    path: 'submit',
    element: <Submission />,
    allowedRoles: ['admin', 'user'],
    menu: { label: 'Submission', icon: <FormOutlined /> },
  },
];

export default protectedRoutes;
