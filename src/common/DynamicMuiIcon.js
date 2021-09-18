import { createElement } from 'react';

const DynamicMuiIcon = ({ icon }) => {
  const iconName = icon.replace(/Icon$/, '');
  const result = require(`@mui/icons-material/${iconName}`).default;

  if (!result) {
    throw Error(`Could not find material-ui-icons/${iconName}`)
  }

  return createElement(result);
};

export default DynamicMuiIcon;