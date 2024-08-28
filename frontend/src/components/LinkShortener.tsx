import React, {useState} from 'react';
import {Button, TextField, Typography, Box} from '@mui/material';
import axios from 'axios';

const LinkShortener: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const response = await axios.post('http://localhost:8000/links', {
        originalUrl: originalUrl,
      });
      setShortUrl(`http://localhost:8000/${response.data.shortUrl}`);
    } catch (error) {
      setError('Cannot shorten the link.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      <TextField
        label="Original URL"
        variant="outlined"
        fullWidth
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Shorten
      </Button>

      {shortUrl && (
        <Typography variant="body1" sx={{mt: 2}}>
          Short URL: {shortUrl}
        </Typography>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{mt: 2}}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default LinkShortener;