import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGridPro, GridToolbar, LicenseInfo } from '@mui/x-data-grid-pro';
import { Box, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MonsterToolbar from './MonsterToolbar';
import MonsterDialog from './MonsterDialog';
import {
  TabPanel,
  renderColumns,
  convertDataResponse,
  convertDataRows
} from './utils';
import dataTicket from '../../../data/ticket';
import dataWorkflow from '../../../data/workflow';
import { isEmpty, some, uniqBy, get } from 'lodash';

LicenseInfo.setLicenseKey(process.env.REACT_APP_DATA_GRID_PRO_KEY);

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important'
    },
    '& .MuiDataGrid-cell': {
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal'
    },
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important'
    }
  },
  cellCommon: {
    alignItems: 'flex-start !important',
    padding: '8px 0px !important'
  },
  requested: {
    color: theme.palette.info.main,
    marginTop: '0.2rem'
  },
  succeeded: {
    color: theme.palette.success.main,
    marginTop: '0.2rem'
  },
  pending: {
    color: theme.palette.info.light,
    marginTop: '0.2rem'
  },
  none: {
    color: theme.palette.info.dark,
    marginTop: '0.2rem'
  }
}));

const tabNames = ['Workflow', 'Ticket'];

const MonsterList = (props) => {
  const ticketType = 'Request';

  const [tabs, setTabs] = useState(tabNames);

  useEffect(() => {
    if (ticketType !== 'Request') {
      setTabs(tabNames.filter((e) => e !== 'Workflow'));
    } else {
      setTabs(tabNames);
    }
  }, [ticketType]);

  const classes = useStyles();
  const [tabName, setTabName] = useState(tabs[0]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [rows, setRows] = useState({
    workflows: [],
    tickets: []
  });

  const [selectionModels, setSelectionModels] = useState({
    workflows: [],
    tickets: []
  });

  const [selectionModelsTemp, setSelectionModelsTemp] = useState({
    workflows: [],
    tickets: []
  });

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const isWorkflow = tabName === 'Workflow';
  const isTicket = tabName === 'Ticket';

  useEffect(() => {
    switch (true) {
      case isWorkflow:
        dispatch(getWorkflowRelatedAction());
        break;
      case isTicket:
        dispatch(getTicketRelatedAction());
        break;
    }
  }, [tabName]);

  // stores
  const { ticketsRelated, workflowsRelated } = useSelector((state) => {
    return {
      ticketsRelated: get(state, 'ticketsRelated', []),
      workflowsRelated: get(state, 'workflowsRelated', [])
    };
  });

  useEffect(() => {
    switch (true) {
      case isWorkflow:
        if (!isEmpty(workflows)) {
          setRows(dataWorkflow);
          setLoading(isLoadingWorkflows);
        }
        break;
      case isTicket:
        if (!isEmpty(tickets)) {
          setRows(dataTicket);
          setLoading(isLoadingTicket);
        }
        break;
    }
  }, [tabName]);

  const columns = renderColumns({ tabName, classes });

  const handleSelectionModelChange = (selections, details) => {
    setSelectionModels((prev) => {
      switch (true) {
        case isWorkflow:
          prev.workflows = [...selections];
          break;
        case isTicket:
          prev.tickets = [...selection];
      }
    });
  };

  const handleDataRow = (dataRow) => {
    switch (true) {
      case isWorkflow:
        return dataRow.workflows;
      case isTicket:
        return dataRow.tickets;
      default:
        return [];
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabName} onChange={handleChange}>
          {tabs.map((tab, index) => {
            return <Tab label={tab} value={tab} key={index.toString()} />;
          })}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => {
        return (
          <TabPanel value={tabName} index={tab} key={index.toString()}>
            <div style={{ height: '500px', width: '100%' }}>
              <DataGridPro
                loading={loading}
                rows={handleDataRow(rows)}
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
                  Toolbar: GridToolbar,
                  Footer: () => (
                    <MonsterToolbar
                      setOpen={setOpen}
                      tabName={tabName}
                      selectionModels={selectionModels}
                      selectionModelsTemp={selectionModelsTemp}
                    />
                  )
                }}
                selectionModel={
                  isWorkflow
                    ? selectionModels.workflows
                    : isTicket
                    ? selectionModels.tickets
                    : []
                }
                onSelectionModelChange={handleSelectionModelChange}
              />
            </div>
          </TabPanel>
        );
      })}
      <MonsterDialog
        open={open}
        setOpen={setOpen}
        tabName={tabName}
        classes={classes}
        selectionModelList={selectionModels}
        setSelectionModelsTemp={setSelectionModelsTemp}
      />
    </Box>
  );
};

export default MonsterList;
