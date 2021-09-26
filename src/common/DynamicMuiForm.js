import React, { createElement } from 'react';
import dynamicServices from '../services/dynamic-service';
import { registerComponents } from '../dynamic';
import { Box } from '@material-ui/core';
// lodash
import { get, isEmpty } from 'lodash';

const DynamicMuiForm = props => {
  const { table, fields } = props;
  // get datamodel
  const dataModel = dynamicServices.getDataModel();
  const tables = get(dataModel, 'tables', []);
  // find table mapping
  const findTable = tables.find(item => item.name === table);
  const filterData = findTable.columns.filter(item => {
    return fields.find(e => e.column === item.name);
  });

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {!isEmpty(filterData) && filterData.map(data => {
        return createElement(
          registerComponents[data.type],
          {
            id: data.name,
            key: data.name,
            name: data.name,
            ...data
          },
          null
        )
      })}
    </Box>
  )
};

export default DynamicMuiForm;