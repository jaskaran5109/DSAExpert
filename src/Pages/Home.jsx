import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import SdaBabbar from './SDAPage/SdaBabbar';
import PropTypes from 'prop-types';
import DsaStriver from './DSAPage/DsaStriver';
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
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Home = ({ SdaSheet, DSASheet }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ margin: "20px", marginTop: "40px",marginBottom:"40px", boxShadow: '1px 1px 2px 2px #8185EA', textAlign: "center",paddingTop:"10px" }}>
      <h1 style={{padding:"10px"}}>DSA Cracker Sheets</h1>
      <Typography fontSize={'20px'} fontStyle={'italic'} style={{ margin: "15px",}}>“Never let the fear of striking out stop you from playing the game.” —Babe Ruth</Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example">
            <Tab label="Love Babbar DSA Sheet" {...a11yProps(0)} />
            <Tab label="Striver’s SDE Sheet" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SdaBabbar SdaSheet={SdaSheet} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DsaStriver DSASheet={DSASheet} />
        </TabPanel>

      </Box>
    </div>
  );
};

export default Home;
