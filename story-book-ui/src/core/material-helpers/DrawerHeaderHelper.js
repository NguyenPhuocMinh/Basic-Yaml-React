import { styled } from '@mui/material/styles';

const DrawerHeaderHelper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-around',
  background: theme.palette.primary.main
}));

export default DrawerHeaderHelper;
