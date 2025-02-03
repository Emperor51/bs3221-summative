import { Modal } from "antd";
import { MenuItemType } from 'antd/es/menu/interface';
import CustomDropdown from '../dropdown/CustomDropdown';
import React from 'react';

const AddSubmissionModalProps = {
  visible: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setVisible: (visible: boolean) => {}
}

export const AddSubmissionModal = (props: typeof AddSubmissionModalProps) => {
  const handleSubmission = () => {
    // Handle submission logic here
    props.setVisible(false);
  }

  function item (title: string, items: MenuItemType[], placeholderText: string) {
    return (
      <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
        <p style={{ marginRight: '5px', width: '80px' }}>{title}</p>
        <CustomDropdown
          menuItems={items}
          placeholderText={placeholderText}
          type={"primary"} // Optional: Specify button type
          placement={"bottomLeft"} // Optional: Specify placement
        />
      </div>
    );
  }

  const items: MenuItemType[] = [
    {
      key: '1',
      label: 'Location 1',
    },
    {
      key: '2',
      label: 'Location 2',
    },
    {
      key: '3',
      label: 'Location 3',
    },
    {
      key: '4',
      label: 'Location 4',
    },
  ];



  return (
    <Modal
      title="Add Submission"
      open={props.visible}
      onCancel={() => props.setVisible(false)}
      onOk={handleSubmission}
    >
      {item("Location", items, "Location")}
      {item("Room", items, "Room")}
    </Modal>
  );
}