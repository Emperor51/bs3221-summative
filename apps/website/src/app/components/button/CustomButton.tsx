// CustomButton.tsx
import React from 'react';
import { Button, ButtonProps } from 'antd';
import './CustomButton.css'; // Optional: Import custom styles

interface CustomButtonProps extends ButtonProps {
  // Add any additional props if needed
  text?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...rest }) => {
  return (
    <Button {...rest} className={`custom-button ${rest.className || ''}`}>
      {children}
    </Button>
  );
};

export default CustomButton;
