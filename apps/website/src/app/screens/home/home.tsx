import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import protectedRoutes from '../../config/protectedRoutes';
import HomeCard from '../../components/homeCard/HomeCard';

export function Home() {
  const { hasPermission, user } = useAuth();

  return (
    <div>
      <h2>Welcome {user?.firstName}, to the the Fire Marshal website.</h2>
      <p>Use the cards below to navigate through the app.</p>

      <Row gutter={[16, 16]}>
        {protectedRoutes
          .filter(route => (hasPermission(route.requiredPermission) && route.description))
          .map(route => (
            <Col xs={24} sm={12} md={8} lg={6} key={route.path}>
              <Link to={route.path}>
                <HomeCard
                  title={route.menu?.label || ''}
                  description={route.description || ''}
                  hoverable
                  icon={route.menu?.icon}
                 />
              </Link>
            </Col>
          ))}
      </Row>

    </div>
  );
}

export default Home;
