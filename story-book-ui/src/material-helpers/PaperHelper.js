import { Paper } from '@mui/material';

const PaperCustom = props => {
  return (
    <Paper>
      {props.children}
    </Paper>
  )
};

export default PaperCustom;