import React from 'react';
import { DynamicMuiTab } from '../../common';
import { get } from 'lodash';

const Order = props => {
  const tabs = get(props, 'data.app.tabs', []);
  return (
    <DynamicMuiTab tabs={tabs} />
  )
};

export default Order;