import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/button/CustomButton';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <CustomButton type="primary" onClick={() => navigate('/')}>
        Go Home
      </CustomButton>
    </div>
  );
};

export default NotFound;
