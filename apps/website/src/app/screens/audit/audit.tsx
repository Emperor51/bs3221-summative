import React, { useEffect, useState } from 'react';
import { Table, message, DatePicker, Tabs, Tag, Input, Button, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import API from '../../axiosInstance';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Search } = Input;

interface AuditLog {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
  location: {
    id: number;
    name: string;
  };
  entryTime: string;
  exitTime?: string | null;
}

export function Audit() {
  const [activeLogs, setActiveLogs] = useState<AuditLog[]>([]);
  const [pastLogs, setPastLogs] = useState<AuditLog[]>([]);
  const [understaffedLocations, setUnderstaffedLocations] = useState<{ location: string; count: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Default to today's date range (00:00 - 23:59)
  const defaultStart = dayjs().startOf('day');
  const defaultEnd = dayjs().endOf('day');
  const [dateRange, setDateRange] = useState<[string, string]>([
    defaultStart.toISOString(),
    defaultEnd.toISOString(),
  ]);

  useEffect(() => {
    fetchAuditLogs();
  }, [dateRange]);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const url = `/submissions/all?entryTime=${dateRange[0]}&exitTime=${dateRange[1]}`;
      const response = await API.get(url);

      const now = dayjs();

      // ✅ Active if exitTime is null OR exitTime is in the future
      const activeLogs = response.data.filter(
        (log: AuditLog) => !log.exitTime || dayjs(log.exitTime).isAfter(now)
      );

      const pastLogs = response.data.filter(
        (log: AuditLog) => log.exitTime && dayjs(log.exitTime).isBefore(now)
      );

      // ✅ Keep Understaffed Locations Static (Independent of Date Filters)
      const locationCounts: Record<string, number> = {};
      response.data.forEach((log: AuditLog) => {
        const locationName = log.location.name;
        locationCounts[locationName] = (locationCounts[locationName] || 0) + 1;
      });

      const understaffed = Object.entries(locationCounts)
        .filter(([_, count]) => count < 2)
        .map(([location, count]) => ({ location, count }));

      setActiveLogs(activeLogs);
      setPastLogs(pastLogs);
      setUnderstaffedLocations(understaffed);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
      message.error('Failed to load audit data.');
    }
    setLoading(false);
  };

  // ✅ Search filter function
  const filterData = (data: AuditLog[]) =>
    data.filter((log) =>
      [log.user.firstName, log.user.lastName, log.location.name]
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Audit</h1>

        {/* ✅ Search Input with Clear Button */}
        <Space>
          <Search
            placeholder="Search by name or location..."
            allowClear
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 300 }}
          />
          <Button
            icon={<CloseOutlined />}
            onClick={() => setSearchQuery('')}
            disabled={!searchQuery}
          />
        </Space>
      </div>

      <p>View fire marshals' locations and history. Search or filter locations below.</p>

      {/* ✅ Tabbed Selection */}
      <Tabs defaultActiveKey="active">
        {/* 🟢 Tab 1: Active Marshals */}
        <TabPane tab="Active Marshals" key="active">
          <Table dataSource={filterData(activeLogs)} rowKey="id" loading={loading}>
            <Table.Column
              title="Marshal"
              key="marshal"
              render={(_, record: AuditLog) => `${record.user.firstName} ${record.user.lastName}`}
            />
            <Table.Column title="Location" dataIndex={['location', 'name']} key="location" />
            <Table.Column
              title="Entry Time"
              dataIndex="entryTime"
              key="entryTime"
              render={(entryTime) => dayjs(entryTime).format('DD MMM YYYY, HH:mm')}
            />
            <Table.Column
              title="Elapsed Time"
              key="elapsedTime"
              render={(_, record: AuditLog) => {
                const entryTime = dayjs(record.entryTime);
                const exitTime = record.exitTime ? dayjs(record.exitTime) : dayjs();
                const duration = dayjs.duration(exitTime.diff(entryTime));
                return `${duration.asDays() > 1 ? duration.days() + " days" : ""}
                        ${duration.asHours() > 1 ? duration.hours() + " hours, " : ""}
                        ${duration.asMinutes() >= 1 ? duration.minutes() + " minutes" : duration.seconds() + " seconds"} `;
              }}
            />
          </Table>
        </TabPane>

        {/* 🕓 Tab 2: Past Entries */}
        <TabPane tab="Past Entries" key="past">
          <div style={{ marginBottom: '1rem' }}>
            <RangePicker
              showTime
              defaultValue={[defaultStart, defaultEnd]}
              onChange={(dates, dateStrings) => {
                if (dates && dates[0] && dates[1]) {
                  setDateRange([dates[0].toISOString(), dates[1].toISOString()]);
                }
              }}
            />
          </div>
          <Table dataSource={filterData(pastLogs)} rowKey="id" loading={loading}>
            <Table.Column
              title="Marshal"
              key="marshal"
              render={(_, record: AuditLog) => `${record.user.firstName} ${record.user.lastName}`}
            />
            <Table.Column title="Location" dataIndex={['location', 'name']} key="location" />
            <Table.Column
              title="Entry Time"
              dataIndex="entryTime"
              key="entryTime"
              render={(entryTime) => dayjs(entryTime).format('DD MMM YYYY, HH:mm')}
            />
            <Table.Column
              title="Exit Time"
              dataIndex="exitTime"
              key="exitTime"
              render={(exitTime) =>
                exitTime ? dayjs(exitTime).format('DD MMM YYYY, HH:mm') : <Tag color="red">Ongoing</Tag>
              }
            />
          </Table>
        </TabPane>

        {/* ⚠️ Tab 3: Understaffed Locations (Static) */}
        <TabPane tab="Understaffed Locations" key="understaffed">
          <Table dataSource={understaffedLocations} rowKey="location" loading={loading}>
            <Table.Column title="Location" dataIndex="location" key="location" />
            <Table.Column
              title="Number of Marshals"
              dataIndex="count"
              key="count"
              render={(count) => (
                <Tag color={count === 0 ? 'red' : 'orange'}>
                  {count === 0 ? 'No Marshals' : `${count} Marshal${count > 1 ? 's' : ''}`}
                </Tag>
              )}
            />
          </Table>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Audit;
