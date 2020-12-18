import React from 'react';
import WithAuthAdmin from '../../components/WithAuthAdmin';
import AdminComponent from '../../components/shared/AdminComponent';

const Home: React.FC = () => {
  return (
    <AdminComponent>
      <h1>Painel Admin</h1>
    </AdminComponent>
  )
}

export default WithAuthAdmin(Home);