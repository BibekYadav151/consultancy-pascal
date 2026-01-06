import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppWidget from '../common/WhatsAppWidget';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppWidget />
    </>
  );
};

export default PublicLayout;
