import React from 'react';
import { Tabs } from 'antd';
import './settings.css';
import LocationSettings from '../../components/settings/LocationSettings';

const { TabPane } = Tabs;

const Settings: React.FC = () => {

  return (
    <div>
      <h1>Settings</h1>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Location Management" key="1">
          <LocationSettings />
        </TabPane>
      </Tabs>

    </div>
  );
};

export default Settings;
