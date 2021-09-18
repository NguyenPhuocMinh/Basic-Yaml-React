import { Grid } from '@material-ui/core';

const GridCustom = props => {
  return (
    <Grid>
      {props.children}
    </Grid>
  )
};

export default GridCustom;