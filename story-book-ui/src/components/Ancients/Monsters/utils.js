import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Icon, Tooltip, Typography } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { get, isEmpty, uniqBy, map, cloneDeep } from 'lodash';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

const renderIcon = (item, classes) => {
  let iconClass;
  let icon;

  switch (item.status) {
    case 'succeeded':
      iconClass = classes.succeeded;
      icon = 'check_circle';
      break;
    case 'pending':
      iconClass = classes.pending;
      icon = 'pending';
      break;
    default:
      iconClass = classes.failed;
      icon = 'error_outline';
  }

  const label =
    Boolean(item.step) && Boolean(item.step.label)
      ? item.step.label
      : item.name;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box>
        <Icon className={iconClass}>{icon}</Icon>
      </Box>
      <Box>
        <Typography variant="body2">{`${label}: ${item.status} `}</Typography>
      </Box>
    </Box>
  );
};

const limitStatusList = (index, indexIconLimit, item, classes) => {
  if (index === indexIconLimit) {
    return <Icon>...</Icon>;
  }

  return renderCircleStatusIcon(item.status, classes);
};

const renderCircleStatusIcon = (status, classes) => {
  switch (status) {
    case 'succeeded':
      return <Icon className={classes.succeeded}> check_circle </Icon>;
    case 'pending':
      return <Icon className={classes.pending}>pending</Icon>;
    default:
      return <Icon className={classes.none}>error_outline</Icon>;
  }
};

const renderStatus = (params, sandbox = {}) => {
  const { id, value, colDef } = params;

  const { classes } = sandbox;

  const widthStatusCol = get(colDef, 'computedWidth');

  const [openRow, setOpenRow] = useState(false);
  const [indexStatusLimit, setIndexStatusLimit] = useState(0);

  useEffect(() => {
    const indexStatusLimit = Math.floor((widthStatusCol - 30) / 24) - 3;
    setIndexStatusLimit(indexStatusLimit);
  }, [widthStatusCol]);

  const handleClick = () => {
    setOpenRow(!openRow);
  };

  return (
    <Box
      sx={{
        display: openRow ? 'block' : 'flex',
        alignItems: 'center'
      }}
    >
      <Box>
        <IconButton
          onClick={handleClick}
          sx={{
            '&:hover': {
              background: 'none !important'
            }
          }}
        >
          {openRow ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: openRow ? 'block' : 'flex',
          marginLeft: (theme) => (openRow ? theme.spacing(3) : '0px')
        }}
      >
        {value &&
          value.map((item, index) => {
            const label =
              Boolean(item.step) && Boolean(item.step.label)
                ? item.step.label
                : item.name;
            const tooltip =
              index < indexStatusLimit ? `${label}: ${item.status}` : 'More';

            return !openRow ? (
              index <= indexStatusLimit && (
                <Tooltip title={tooltip} key={`itm-${index}`}>
                  {limitStatusList(index, indexStatusLimit, item, classes)}
                </Tooltip>
              )
            ) : (
              <Box key={index}>{renderIcon(item, classes)}</Box>
            );
          })}
      </Box>
    </Box>
  );
};

const renderColumns = (sandbox = {}) => {
  const { tabName } = sandbox;

  const workflows = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1
    },
    {
      field: 'steps',
      headerName: 'Status',
      renderCell: (params) => renderStatus(params, sandbox),
      flex: 1
    }
  ];

  const tickets = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1
    }
  ];

  switch (tabName) {
    case 'Workflow':
      return workflows;
    case 'Ticket':
      return tickets;
    default:
      return [];
  }
};

const convertDataRows = (tabName, rows, rowsRemaining) => {
  const { workflows: rowWorkflows, tickets: rowTickets } = rows;
  const { workflows: dataRemainingWorkflow, tickets: dataRemainingTicket } =
    rowsRemaining;

  let dataRow;
  let dataRemaining;

  switch (tabName) {
    case 'Workflow':
      dataRow = rowWorkflows;
      dataRemaining = dataRemainingWorkflow;
      break;
    case 'Ticket':
      dataRow = rowTickets;
      dataRemaining = dataRemainingTicket;
      break;
    default:
      return;
  }

  return !isEmpty(dataRemaining)
    ? uniqBy(dataRemaining, 'id')
    : uniqBy(dataRow, 'id');
};

const convertDataResponse = (dataAdded, dataRemoved) => {
  const cloneDataAdd = cloneDeep(dataAdded);
  const cloneDataRemove = cloneDeep(dataRemoved);

  const { workflows: dataAddWorkflow, tickets: dataAddTicket } = cloneDataAdd;
  const { workflows: dataRemoveWorkflow, tickets: dataRemoveTicket } =
    cloneDataRemove;

  const mergeDataWf = [...dataAddWorkflow, ...dataRemoveWorkflow];
  const mergeDataTk = [...dataAddTicket, ...dataRemoveTicket];

  const finalDataWf = mergeDataWf.map((wf) => {
    const data = {};
    data.id = wf.ticketID;
    data.relatedType = 'Normal';
    return data;
  });

  const finalDataTk = mergeDataTk.map((tk) => {
    const data = {};
    data.id = tk.id;
    data.relatedType = 'Normal';
    return data;
  });

  const response = [...finalDataWf, ...finalDataTk];
  console.log(
    '🚀 ~ file: utils.js ~ line 244 ~ convertDataResponse ~ response',
    response
  );

  return uniqBy(response, 'id');
};

export { TabPanel, renderColumns, convertDataRows, convertDataResponse };
