import React from 'react';
import { FrownOutlined } from '@ant-design/icons';

const Unauthorised: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FrownOutlined style={{fontSize: 60}}/>
        <h2 style={{ marginLeft: '10px', marginRight: '20px' }}>Unauthorised</h2>
        <FrownOutlined style={{fontSize: 60}}/>
      </div>
      <p>You are not authorised to view this page.</p>
    </div>
  );
};

export default Unauthorised;
