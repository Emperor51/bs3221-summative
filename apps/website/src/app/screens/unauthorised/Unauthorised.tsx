import React from 'react';
import { FrownOutlined } from '@ant-design/icons';

const Unauthorised: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Unauthorised</h2>
      <FrownOutlined style={{fontSize: 60}}/>
      <p>You are not authorised to view this page.</p>
    </div>
  );
};

export default Unauthorised;
