import { Paper } from '@material-ui/core';

const PaperCustom = props => {
  return (
    <Paper>
      {props.children}
    </Paper>
  )
};

export default PaperCustom;