import '../App.css';
import React, { useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { login } from '../api/auth';
import { setAuthToken } from '../utils/auth';
import logo from "../assets/logo.png";

// Sign in page
const Signin: React.FC = () => {
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
    <Container maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
        component="form" onSubmit={handleSubmit}>
        <img
          src={logo}
          width="200px"
          height="100px"
          alt="logo" />
        <h1>Welcome back!</h1>
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
    </Container>
  );
}

export default Signin;
