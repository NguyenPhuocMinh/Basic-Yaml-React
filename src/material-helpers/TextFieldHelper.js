import { Box, TextField } from '@material-ui/core';

const TextFieldHelper = props => {
  return (
    <Box m={2} width="auto" minWidth={600}>
      <TextField
        fullWidth
        {...props}
      />
    </Box>
  )
};

export default TextFieldHelper;