import '../App.css';
import React, { useState } from 'react';
import { Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { setAuthToken } from '../utils/auth';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    login(username, password)
      .then(r => {
        setAuthToken(r.data.token);
        navigate('/');
      })
      .catch(e => {
        setLoginError(e.response.data.error);
      })
  }

  return (
    <div>
      <Typography variant="h1"> Welcome Back! </ Typography>
      <p> {loginError} </ p>
      <form onSubmit={handleSubmit}>
        <input onChange={e => setUsername(e.target.value)} placeholder="username" /> <br />
        <input onChange={e => setPassword(e.target.value)} placeholder="password" type="password" /><br />
        <input type="submit" value="Submit" />
      </form>
    </div >
  );
}

export default Login;
