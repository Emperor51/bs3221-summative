import React from 'react';
import { FrownOutlined } from '@ant-design/icons';
import CustomButton from '../../components/button/CustomButton';
import { useNavigate } from 'react-router-dom';

const Unauthorised: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FrownOutlined style={{fontSize: 60}}/>
        <h2 style={{ marginLeft: '10px', marginRight: '20px' }}>Unauthorised</h2>
        <FrownOutlined style={{fontSize: 60}}/>
      </div>
      <p>You are not authorised to view this page.</p>
      <CustomButton type="primary" onClick={() => navigate('/')}>
        Go Home
      </CustomButton>
    </div>
  );
};

export default Unauthorised;
