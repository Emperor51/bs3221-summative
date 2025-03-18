import React, { useEffect, useState } from 'react';
import { Table, message, DatePicker, Tag } from 'antd';
import API from '../../axiosInstance';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

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
  const [loading, setLoading] = useState(false);

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

      const now = dayjs(); // ✅ Get the current time

      // ✅ Active if exitTime is null OR exitTime is in the future
      const activeLogs = response.data.filter(
        (log: AuditLog) => !log.exitTime || dayjs(log.exitTime).isAfter(now)
      );

      const pastLogs = response.data.filter(
        (log: AuditLog) => log.exitTime && dayjs(log.exitTime).isBefore(now)
      );

      setActiveLogs(activeLogs);
      setPastLogs(pastLogs);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
      message.error('Failed to load audit data.');
    }
    setLoading(false);
  };


  return (
    <div>
      <h1>Audit</h1>
      <p>
        Fire Marshals currently in a building will appear in the 'Active' table. Historical entries are visible below,
        filterable by user, building, room, and date.
      </p>

      {/* Active Logs Table */}
      <h2>Active</h2>
      <Table dataSource={activeLogs} rowKey="id" loading={loading}>
        <Table.Column title="Location" dataIndex={['location', 'name']} key="location" />
        <Table.Column
          title="Marshals"
          key="marshals"
          render={(_, record: AuditLog) => `${record.user.firstName} ${record.user.lastName}`}
        />
      </Table>

      {/* Past Logs Filter */}
      <h2>Past</h2>
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

      {/* Past Logs Table */}
      <Table dataSource={pastLogs} rowKey="id" loading={loading}>
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
    </div>
  );
}

export default Audit;
