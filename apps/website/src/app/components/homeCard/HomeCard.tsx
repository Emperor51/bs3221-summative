import React from 'react';
import { Typography, theme } from 'antd';

const { Title, Paragraph } = Typography;

interface HomeCardProps {
  title: string;
  description: string;
  hoverable?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  outlineColor?: string;
}

const HomeCard: React.FC<HomeCardProps> = ({
                                             title,
                                             description,
                                             hoverable = true,
                                             onClick,
                                             outlineColor,
                                             icon,
                                           }) => {
  const { token } = theme.useToken();

  const baseShadow = '0 1px 4px rgba(0, 0, 0, 0.06)';
  const hoverShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: token.colorBgContainer,
        border: `1px solid ${outlineColor || token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        padding: token.paddingLG,
        boxShadow: baseShadow,
        cursor: hoverable || onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.3s ease',
        // justifyItems: 'center',
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = hoverShadow;
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = baseShadow;
        }
      }}
    >
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          gap: token.marginSM, // adds spacing between icon and title
        }}
      >
        {icon && (
          <span
            style={{
              color: token.colorPrimary, // or token.colorText if you want it neutral
              fontSize: 20, // you can adjust size here
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </span>
        )}
        <Title level={4} style={{ margin: 0, color: token.colorText }}>
          {title}
        </Title>
      </div>

      <Paragraph
        type="secondary"
        style={{
          marginTop: token.marginSM,
          color: token.colorTextSecondary,
        }}
      >
        {description}
      </Paragraph>
    </div>
  );
};

export default HomeCard;
