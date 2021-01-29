import React from 'react'
import { Col, Row } from 'react-bootstrap';

import AdminHeader from '../Header/AdminHeader';
import AdminFooter from '../Footer/AdminFooter';
import MenuLateral from '../MenuLateral';

const AdminComponent: React.FC = ({ children }) => {
  return (
    <Row className="mr-lg-4">
      <Col lg={3}>
        <MenuLateral />
      </Col>

      <Col lg={9}>
        <div className="d-flex flex-column sticky-footer-wrapper container">
          <AdminHeader />

          <div className="flex-fill text-center">
            {children}
          </div>

          <AdminFooter />
        </div>
      </Col>
    </Row>
  )
}

export default AdminComponent;