import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import SettingsManagement from './SettingsManagement';
import RegistrationsManagement from './RegistrationsManagement';
import FeedbackManagement from './FeedbackManagement';

const Dashboard = ({ password }: { password: string }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Registrations" />
          <Tab label="Feedback" />
          <Tab label="Settings" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <RegistrationsManagement password={password} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <FeedbackManagement password={password} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <SettingsManagement password={password} />
      </TabPanel>
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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

export default Dashboard;
