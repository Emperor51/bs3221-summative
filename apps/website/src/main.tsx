import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <header>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </header>
      <ConfigProvider
        theme={{
          // https://ant.design/docs/react/migrate-less-variables
          token: {
            colorPrimary: '#632054',
            colorHighlight: '#f7c111',
            colorBgContainer: '#fff',
          },
          components: {
            Button: {
              colorError: '#e3171e', // Button danger color
            },
            Menu: {
              colorItemBgSelected: '#632054', // Active menu item background
              colorItemTextSelected: '#ffffff'  // Active menu item text
            }
          }
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
