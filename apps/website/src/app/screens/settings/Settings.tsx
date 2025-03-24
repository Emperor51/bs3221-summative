import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Table, Button, Input, Space, message, Popconfirm, List, Card } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import API from '../../axiosInstance'; // Using existing axios instance
import './settings.css';
import { AddLocationModal } from '../../components/addLocationModal/AddLocationModal';

const { TabPane } = Tabs;

interface Location {
  id: string;
  name: string;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newLocation, setNewLocation] = useState<string>('');
  const [locationModalVisible, setLocationModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await API.get('/location'); // Fetch locations
      setLocations(response.data);
    } catch (error) {
      message.error('Failed to load locations.');
    } finally {
      setLoading(false);
    }
  };

  const showLocationModal = () => {
    setLocationModalVisible(true)
  }

  const deleteLocation = async (id: string) => {
    try {
      await API.delete(`/location/${id}`);
      setLocations(locations.filter(location => location.id !== id));
      message.success('Location deleted successfully.');
    } catch (error) {
      message.error('Failed to delete location.');
    }
  };

  const LocationCard: React.FC<({ location: Location })> = ({location}) => {
    return (
      <div className={'locationCard'}>
        <Popconfirm
          title="Delete this location?"
          onConfirm={() => deleteLocation(location.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteOutlined />}
                  style={{marginRight: 10}} />
        </Popconfirm>
        <p>{location.name.toString()}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Settings</h1>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Location Management" key="1">
          <Space style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={showLocationModal}>
              Add Location
            </Button>
          </Space>

          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={locations} // Cast as Location
            loading={loading}
            renderItem={(location) =>
              <List.Item>
                <LocationCard location={location} />
              </List.Item>
            }
          />
        </TabPane>
      </Tabs>

      <AddLocationModal open={locationModalVisible} setOpen={setLocationModalVisible} refreshLocations={fetchLocations} />

    </div>
  );
};

export default Settings;
