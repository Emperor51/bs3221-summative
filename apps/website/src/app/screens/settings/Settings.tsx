import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/button/CustomButton';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  /** TODO - Settings Page
   * 1. Add active hours
   * 2. Add active days
   * 3. Add active buildings
   * 5. Add minimum number of fire marshals per building
   * 6. Add recommended number of fire marshals per building
    */

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
