import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Logout: React.FC = () => {
  const { signOut } = useAuth();

  signOut();


  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#257478' }}>

    </div>
  );
};

export default Logout;
