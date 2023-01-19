import React, { useState } from 'react';
import { deleteAccount } from '../api/account';
import { Button, Box, TextField, Typography, Card, CardContent } from '@mui/material';

const DeleteAccountCard: React.FC = () => {
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleSubmitDelete = (event: any) => {
    event.preventDefault();
    deleteAccount(password)
      .then(r => {
        window.alert("Account deleted");
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
    }} component="form" onSubmit={handleSubmitDelete}>
      <Card elevation={5} sx={{ width: "100%", borderRadius: 4 }}>
        <CardContent>
          <h2>Delete Account</h2>
          <Typography color="error"> This action cannot be undone </Typography>
          <Typography color="error"> {submitError} </ Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            color="warning"
            onChange={e => setPassword(e.target.value)}
            placeholder="Current Password"
            type="password"
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            value="Submit"
            color="warning"
            sx={{ mt: 3, mb: 2 }}
          > Delete </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default DeleteAccountCard;
