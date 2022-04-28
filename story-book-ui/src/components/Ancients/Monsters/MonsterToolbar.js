import React from 'react';
import { Box, Button } from '@mui/material';
import { filter, isEmpty, some } from 'lodash';

const MonsterToolbar = (props) => {
  const {
    setOpen,
    tabName,
    dataRow,
    dataRemove,
    setDataRemaining
  } = props;

  const isWorkflow = tabName === 'Workflow';
  const isTicket = tabName === 'Ticket';

  const handleClickAdd = () => {
    setOpen(true);
  };

  const handleClickRemove = () => {
    const clonedSelectionModels = cloneDeep(selectionModels);
    const dataModify = {};
    switch (true) {
      case isWorkflow:
        if (!isEmpty(clonedSelectionModels.workflows)) {
          const selectedIDs = new Set(clonedSelectionModels.workflows);
          const selectedRows = practiceContextsByRelated.filter((row) =>
            selectedIDs.has(row.id),
          );
          dataModify.workflows = [...selectedRows];
          return dataModify;
        }
        break;
      case isTicket:
        if (!isEmpty(clonedSelectionModels.tickets)) {
          const selectedIDs = new Set(clonedSelectionModels.tickets);
          const selectedRows = ticketsByRelated.filter((row) =>
            selectedIDs.has(row.id),
          );
          dataModify.workflows = [...selectedRows];
          return dataModify;
        }
        break;
    }
    dispatch(modifyRelatedAction(dataModify));
    setSelectionModelsTemp(clonedSelectionModels);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={handleClickAdd}>Add</Button>
      <Button onClick={handleClickRemove}>Remove</Button>
    </Box>
  );
};

export default MonsterToolbar;
