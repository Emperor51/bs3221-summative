import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/button/CustomButton';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Settings</h1>
      <p>Fire Marshal Settings</p>
      <CustomButton type="primary" onClick={() => navigate('/')}>
        Go Home
      </CustomButton>
    </div>
  );
};

export default Settings;
