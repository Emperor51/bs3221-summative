import React, { useEffect, useState } from 'react';
import API from '../../axiosInstance';
import { Button, List, message, Popconfirm, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AddLocationModal } from '../addLocationModal/AddLocationModal';

interface Location {
  id: string;
  name: string;
}

const LocationSettings: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  const LocationCard: React.FC<({ location: Location })> = ({ location }) => {
    return (
      <div className={'locationCard'}>
        <Popconfirm
          title="Delete this location?"
          onConfirm={() => deleteLocation(location.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteOutlined />}
                  style={{ marginRight: 10 }} />
        </Popconfirm>
        <p>{location.name.toString()}</p>
      </div>
    );
  }

  return (
    <div>
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

      <AddLocationModal open={locationModalVisible} setOpen={setLocationModalVisible} refreshLocations={fetchLocations} />
    </div>

  )
}

export default LocationSettings;