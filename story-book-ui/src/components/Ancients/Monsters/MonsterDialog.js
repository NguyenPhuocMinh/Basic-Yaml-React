import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DataGridPro, GridToolbar, LicenseInfo } from '@mui/x-data-grid-pro';
import { renderColumns } from './utils';
import { uniqBy, isEmpty } from 'lodash';

import dataTicket from '../../../data/ticket2';
import dataWorkflow from '../../../data/workflow2';

LicenseInfo.setLicenseKey(process.env.REACT_APP_DATA_GRID_PRO_KEY);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

const MonsterDialog = (props) => {
  const {
    open,
    setOpen,
    tabName,
    classes,
    dataRow,
    dataRemove,
    dataSelected,
    setDataSelected,
    setDataRemaining,
    selectionModelList,
    selectionModelsTemp
  } = props;

  const isWorkflow = tabName === 'Workflow';
  const isTicket = tabName === 'Ticket';

  const [rows, setRows] = useState([]);
  const [selectionModels, setSelectionModels] = useState({
    workflows: [],
    tickets: []
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isWorkflow) {
      setRows(dataWorkflow);
    }
    if (isTicket) {
      setRows(dataTicket);
    }
  }, [tabName]);

  // check data has in list view
  // useEffect(() => {
  //   if (isWorkflow) {
  //     setSelectionModels((prev) => {
  //       if (!isEmpty(practiceContextsByRelated)) {
  //         const filterDataSelections = rows.filter((r) => {
  //           return some(practiceContextsByRelated, (s) => s.id === r.id);
  //         });
  //         const selectionWF = selectionModels.workflows;
  //         const idsSelectionWf = !isEmpty(selectionWF)
  //           ? selectionWF
  //           : filterDataSelections.map((e) => e.id);
  //         prev.workflows = [...idsSelectionWf];
  //       }
  //       return { ...prev };
  //     });
  //   }
  //   if (isTicket) {
  //     setSelectionModels((prev) => {
  //       if (!isEmpty(dataTicket)) {
  //         const filterDataSelections = rows.filter((r) => {
  //           return some(dataTicket, (s) => s.id === r.id);
  //         });
  //         const selectionTK = selectionModels.tickets;
  //         const idsSelectionTk = !isEmpty(selectionTK)
  //           ? selectionTK
  //           : filterDataSelections.map((e) => e.id);
  //         prev.tickets = [...idsSelectionTk];
  //       }
  //       return { ...prev };
  //     });
  //   }
  // }, [
  //   tabName,
  //   rows,
  // ]);

  const columns = renderColumns({ tabName, classes });

  const handleSelectionModelChange = (selections, details) => {
    setSelectionModelsTemp((prevSelection) => {
      if (isWorkflow) {
        prevSelection.workflows = [...selections];
      }
      if (isTicket) {
        prevSelection.tickets = [...selections];
      }
      return { ...prevSelection };
    });
  };

  const handleClickSave = () => {
    const clonedSelectionModelsTemp = cloneDeep(selectionModelsTemp);
    setSelectionModels(clonedSelectionModelsTemp);
    const dataModify = {};
    if (!isEmpty(clonedSelectionModelsTemp.workflows)) {
      const selectedIDs = new Set(clonedSelectionModelsTemp.workflows);
      const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
      dataModify.workflows = [...selectedRows];
    }
    if (!isEmpty(clonedSelectionModelsTemp.tickets)) {
      const selectedIDs = new Set(clonedSelectionModelsTemp.tickets);
      const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
      dataModify.tickets = [...selectedRows];
    }
    dispatch(modifyRelatedAction(dataModify));
    setOpen(false);
  };

  const handleRowSelectable = (params) => {
    const { row } = params;
    switch (true) {
      case isWorkflow:
        if (
          isEmpty(row.ticketID) ||
          selectionModels.workflows.includes(row.id)
        ) {
          return false;
        }
      case isTicket:
        if (selectionModels.tickets.includes(row.id)) {
          return false;
        }
      default:
        return true;
    }
  };

  // const handleSelections = () => {
  //   switch (true) {
  //     case isWorkflow:
  //       if (!isEmpty(selectionModelsTemp.workflows)) {
  //         return selectionModelsTemp.workflows;
  //       } else {
  //         return selectionModels.workflows;
  //       }
  //     case isTicket:
  //       if (!isEmpty(selectionModelsTemp.tickets)) {
  //         return selectionModelsTemp.tickets;
  //       } else {
  //         return selectionModels.tickets;
  //       }
  //     default:
  //       return [];
  //   }
  // };

  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {tabName}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <div style={{ height: '500px', width: '100%' }}>
          <DataGridPro
            rows={uniqBy(rows, 'id')}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            classes={{
              root: classes.root,
              'cell--textCenter': classes.cellCommon,
              'cell--textLeft': classes.cellCommon,
              cellContent: classes.cellCommon
            }}
            components={{
              Toolbar: GridToolbar
            }}
            // selectionModel={handleSelections()}
            onSelectionModelChange={handleSelectionModelChange}
            isRowSelectable={handleRowSelectable}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClickSave}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default MonsterDialog;
