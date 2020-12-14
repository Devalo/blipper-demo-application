import React from 'react';
import Navigation from './Navigation';

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navigation />
      <div className="container main-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
