// CustomDropdown.tsx
import React, { useState } from 'react';
import { Dropdown, MenuProps, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './CustomDropdown.css';
import CustomButton from '../button/CustomButton';
import { MenuItemType } from 'antd/es/menu/interface'; // Ensure this path is correct


interface CustomDropdownProps {
  menuItems: MenuItemType[]; // Ensure menuItems is an array of MenuItemType
  placeholderText: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  disabled?: boolean;
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  onSelect?: (key: string, label: React.ReactNode) => void;
  // You can add more props as needed
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
                                                         menuItems,
                                                         placeholderText,
                                                         placement = 'bottomLeft',
                                                         disabled = false,
                                                         type = 'primary',
                                                         onSelect,
                                                       }) => {
  const [selectedText, setSelectedText] = useState<string>(placeholderText);

  // Type guard to ensure item is MenuItemType
  const isMenuItem = (item: MenuItemType | undefined): item is MenuItemType => {
    return item !== undefined && 'label' in item && typeof item.label === 'string';
  };

  const handleMenuClick: MenuProps['onClick'] = (info) => {
    const selectedItem = menuItems.find(item => item.key === info.key);
    if (isMenuItem(selectedItem)) {
      setSelectedText(selectedItem.label as string ?? placeholderText);
      if (onSelect) {
        onSelect(info.key as string, selectedItem.label);
      }
    }
  };

  const menu: MenuProps = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menu} placement={placement} disabled={disabled} trigger={['click']}>
      <CustomButton type={type} className="custom-dropdown-button">
        {selectedText} <DownOutlined />
      </CustomButton>
    </Dropdown>
  );
};

export default CustomDropdown;
