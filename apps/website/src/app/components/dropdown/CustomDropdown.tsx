import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './CustomDropdown.css';
import CustomButton from '../button/CustomButton';
import { MenuItemType } from 'antd/es/menu/interface';

interface CustomDropdownProps {
  menuItems: MenuItemType[];
  placeholderText: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  disabled?: boolean;
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  value?: string;  // ✅ Make it a controlled component
  onChange?: (value: string) => void;  // ✅ Ensure it updates Form state
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
                                                         menuItems,
                                                         placeholderText,
                                                         placement = 'bottomLeft',
                                                         disabled = false,
                                                         type = 'primary',
                                                         value,
                                                         onChange,
                                                       }) => {
  // Ensure we find the selected item label
  const selectedItem = menuItems.find(item => item.key === value);
  const selectedText = selectedItem?.label?.toString() || placeholderText;

  const handleMenuClick: MenuProps['onClick'] = (info) => {
    if (onChange) {
      onChange(info.key);
    }
  };

  const menu: MenuProps = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown
      menu={menu}
      placement={placement}
      disabled={disabled}
      trigger={['click']}
    >
      <CustomButton type={type} className="custom-dropdown-button">
        {selectedText} <DownOutlined />
      </CustomButton>
    </Dropdown>

  );
};

export default CustomDropdown;
