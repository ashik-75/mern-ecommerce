import React from 'react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ScrollTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null || children;
};

export default ScrollTop;
