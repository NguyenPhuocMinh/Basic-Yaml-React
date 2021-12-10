import React from 'react';
import { useSelector } from 'react-redux';
import { NotificationHelper } from '../../core';

const DashBoard = (props) => {
  const state = useSelector((state) => state);
  console.log('🚀 ~ file: Dashboard.js ~ line 6 ~ state', state);
  return (
    <>
      <h1>DashBoard</h1>
      <NotificationHelper />
    </>
  );
};

export default DashBoard;
