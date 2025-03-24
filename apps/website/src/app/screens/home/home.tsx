import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import protectedRoutes from '../../config/protectedRoutes';

export function Home() {
  const { hasPermission } = useAuth();

  return (
    <div>
      <h2>Welcome to the the Fire Marshal website.</h2>
      <p>Use the cards below to navigate through the app.</p>

      <Row gutter={[16, 16]}>
        {protectedRoutes
          .filter(route => (hasPermission(route.requiredPermission) && route.description))
          .map(route => (
            <Col xs={24} sm={12} md={8} lg={6} key={route.path}>
              <Link to={route.path}>
                <Card
                  title={route.menu?.label}
                  hoverable
                  variant={"outlined"}
                  style={{ height: '100%' }}
                >
                  {route.description || 'Click to open'}
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Home;
