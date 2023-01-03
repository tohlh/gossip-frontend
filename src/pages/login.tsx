import '../App.css';
import React, { useState } from 'react';
import { Button, Box, Divider, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { login } from '../api/auth';
import { setAuthToken } from '../utils/auth';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    login(username, password)
      .then(r => {
        setAuthToken(r.data.token);
        window.location.reload();
      })
      .catch(e => {
        setLoginError(e.response.data.error);
      })
  }

  return (
    <Container>
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box component="form" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <p>Welcome back!</p>
          <Typography color="error"> {loginError} </ Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <Divider />
          <p>Don't have an account yet?</p>
          <a href="/signup">Create one now!</a>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            value="Submit"
            sx={{ mt: 3, mb: 2 }}
          > Sign in </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
