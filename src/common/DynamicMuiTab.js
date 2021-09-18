import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { renderComponent } from '../dynamic';
import { get } from 'lodash';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any,
  value: PropTypes.any,
};

const DynamicTabs = props => {
  const tabs = get(props, 'tabs');

  const [value, setValue] = useState(tabs && tabs[0].name);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          {tabs.map((item, index) => {
            return (
              <Tab
                key={index}
                value={item.name}
                label={item.label}
              />
            )
          })}
        </Tabs>
      </Box>
      {tabs.map((item, index) => {
        return (
          <TabPanel
            key={index}
            index={item.name}
            value={value}
          >
            {renderComponent(item.doc)}
          </TabPanel>
        )
      })}
    </Box>
  );
}

export default DynamicTabs;