import React from 'react';
import { Loading } from './index';
import { useSelector } from 'react-redux';
import { Notifications } from '../components';

const AllNotifications = () => {
  const ui = useSelector((state) => state.ui);
  const { loading } = ui;

  if (loading) {
    return <Loading />;
  }

  return <Notifications />;
};

export default AllNotifications;
