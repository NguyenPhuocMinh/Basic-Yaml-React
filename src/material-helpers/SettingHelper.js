import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ButtonGroupHelper from './ButtonGroupHelper';
// i18n
import { useTranslation } from 'react-i18next';

const SettingHelper = ({
  open,
  anchor,
  toggleDrawer
}) => {

  const { t: translate } = useTranslation();

  return (
    <Box>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer}
      >
        <Box
          sx={{
            width: 360,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2
          }}
        >
          <Typography variant='h6'>
            {translate('appBar.toolbar.setting.title')}
          </Typography>
          <IconButton
            sx={{
              border: 'none',
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
            onClick={toggleDrawer}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ padding: '0 16px' }}>
          <Typography
            sx={{ margin: '20px 0px 10px' }}
            variant='body1'
            gutterBottom
          >
            {translate('appBar.toolbar.setting.mode')}
          </Typography>
          <ButtonGroupHelper />
        </Box>
      </Drawer>
    </Box>
  );
};

export default SettingHelper;