import React, { useState, useEffect } from "react";
import { updateDetails } from "../api/account";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/currentUserSlice";
import { Button, Box, TextField, Typography, Card, CardContent } from "@mui/material";

// This card allows user to change their details. Will be used in AccountSettings page
const UpdateDetailsCard: React.FC = () => {
  // Redux selector
  const currentUser = useAppSelector(selectCurrentUser).currentUser;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // Prefill the name and username in the form
    setName(currentUser.name);
    setUsername(currentUser.username);
  }, [currentUser])

  const handleSubmitDetails = (event: any) => {
    event.preventDefault();
    updateDetails(name, username)
      .then(r => {
        window.alert("Account details updated successfully.");
        window.location.reload();
      })
      .catch(e => {
        setSubmitError(e.response.data.error);
      })
  }

  return (
    <Box sx={{
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }} component="form" onSubmit={handleSubmitDetails}>
      <h1>Account Settings</h1>
      <Card elevation={5} sx={{ width: "100%", borderRadius: 4 }}>
        <CardContent>
          <h2>Update Name and Username</h2>
          <Typography color="error"> {submitError} </ Typography>
          <TextField
            value={name}
            margin="normal"
            required
            fullWidth
            onChange={e => setName(e.target.value)}
            label="Name"
          />
          <TextField
            value={username}
            margin="normal"
            required
            fullWidth
            onChange={e => setUsername(e.target.value)}
            label="Username"
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            value="Submit"
            sx={{ mt: 3, mb: 2 }}
          > Update </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default UpdateDetailsCard;
