import '../App.css';
import React, { useEffect, useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { editComment } from '../api/comment';
import { useLocation, useNavigate } from 'react-router-dom';

const EditComment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, content, redirect } = location.state ? location.state : { id: "", content: "", redirect: "" };
  const [currContent, setCurrContent] = useState(content);
  const [postError, setPostError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id === "") { navigate("/"); }
  }, [id, navigate]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    editComment(id, currContent)
      .then(r => {
        window.alert("Updated successfully!");
        navigate(redirect);
      })
      .catch(e => {
        setPostError(e.response.data.error);
      })
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }} component="form" onSubmit={handleSubmit} >
        <h1>Edit comment</h1>
        <Typography color="error"> {postError} </ Typography>
        <TextField
          value={currContent}
          margin="normal"
          placeholder="Content"
          fullWidth
          multiline
          onChange={e => { setCurrContent(e.target.value); }}
          inputProps={{
            style: { height: 100 }
          }}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          value="Submit"
          sx={{ mt: 3, mb: 2 }}
        > Edit Comment </Button>
      </Box>
    </Container >
  );
}

export default EditComment;
