import React from 'react';
import { NotificationHelper } from '../../core';
import { useSelector } from 'react-redux';

const DashBoard = props => {
  const state = useSelector(state => state)
  console.log("🚀 ~ file: Dashboard.js ~ line 6 ~ state", state)
  return (
    <>
      <h1>DashBoard</h1>
      <NotificationHelper />
    </>
  )
};

export default DashBoard;