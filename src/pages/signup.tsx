import '../App.css';
import React, { useState } from 'react';
import { Button, Box, Divider, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [signupError, setsignupError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    signup(name, username, password, passwordConfirm)
      .then(r => {
        window.alert("Account successfully created!");
        navigate("/login");
      })
      .catch(e => {
        setsignupError(e.response.data.error);
      })
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box component="form" onSubmit={handleSubmit}>
          <img
            src={logo}
            width="200px"
            height="100px"
            alt="logo" />
          <p>Sign up with your name, username and password</p>
          <Typography color="error"> {signupError} </ Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={e => setName(e.target.value)}
            placeholder="Name"
          />
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
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={e => setPasswordConfirm(e.target.value)}
            placeholder="Confirm Password"
            type="password"
          />
          <Divider />
          <p>Already have an account?</p>
          <a href="/login">Sign in here!</a>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            value="Submit"
            sx={{ mt: 3, mb: 2 }}
          > Sign up </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
