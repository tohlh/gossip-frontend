import React, { useState } from 'react';
import { updatePassword } from '../api/account';
import { Button, Box, TextField, Typography, Card, CardContent } from '@mui/material';

const UpdatePasswordCard: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleSubmitPassword = (event: any) => {
    event.preventDefault();
    updatePassword(currentPassword, password, passwordConfirm)
      .then(r => {
        window.alert("Password changed successfully");
        window.location.reload();
      })
      .catch(e => {
        setSubmitError(e.response.data.error);
      })
  }

  return (
    <Box sx={{
      marginTop: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }} component="form" onSubmit={handleSubmitPassword}>
      <Card elevation={5} sx={{ width: "100%", borderRadius: 4 }}>
        <CardContent>
          <h2>Change password</h2>
          <Typography color="error"> {submitError} </ Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            type="password"
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
          <Button
            fullWidth
            variant="contained"
            type="submit"
            value="Submit"
            sx={{ mt: 3, mb: 2 }}
          > Change Password </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default UpdatePasswordCard;
