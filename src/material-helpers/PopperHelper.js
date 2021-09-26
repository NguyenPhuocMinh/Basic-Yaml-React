import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    zIndex: 999999
  },
  paper: {
    borderRadius: '16px !important',
    minWidth: '200px',
    minHeight: '200px'
  }
})

const PopperHelper = ({ open, anchorEl }) => {

  const classes = useStyles();

  return (
    <Box >
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement='bottom'
        className={classes.root}
      >
        <Paper className={classes.paper}>
          <Typography sx={{ p: 2 }}>
            Hello
              </Typography>
        </Paper>
      </Popper>
    </Box>
  );
};

export default PopperHelper;