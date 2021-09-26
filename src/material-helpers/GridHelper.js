import { Grid } from '@mui/material';

const GridCustom = props => {
  return (
    <Grid>
      {props.children}
    </Grid>
  )
};

export default GridCustom;