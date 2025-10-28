import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const SettingsManagement = ({ password }: { password: string }) => {
  const [settings, setSettings] = useState<{ key: string; value: string }[]>([]);
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        const streamUrlSetting = data.find((s: { key: string }) => s.key === 'stream_url');
        if (streamUrlSetting) {
          setStreamUrl(streamUrlSetting.value);
        }
      });
  }, []);

  const handleUpdate = () => {
    fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ key: 'stream_url', value: streamUrl }),
    });
  };

  return (
    <div>
      <Typography variant="h6">Stream URL</Typography>
      <TextField
        label="Stream URL"
        variant="outlined"
        fullWidth
        value={streamUrl}
        onChange={(e) => setStreamUrl(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
};

export default SettingsManagement;
