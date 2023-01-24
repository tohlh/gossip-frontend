import '../App.css';
import React, { useEffect, useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { getPost, editPost } from '../api/post';
import { useNavigate, useParams } from 'react-router-dom';

// This page is for editing a post of a given id
// Id is passed through URL params
const EditPost: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params["id"] ? Number(params["id"]) : null;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postError, setPostError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!id) { navigate("/"); }
    else {
      const getPostAsync = async (id: number) => {
        const response = await getPost(id).then(r => r);
        if (response.status === 404) { navigate("/"); }
        setTitle(response?.data.title);
        setContent(response?.data.content);
      }
      getPostAsync(id);
    }
  }, [id, navigate]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (id) {
      editPost(id, title, content)
        .then(r => {
          window.alert("Updated successfully!");
          navigate("/post/" + id);
        })
        .catch(e => {
          setPostError(e.response.data.error);
        })
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }} component="form" onSubmit={handleSubmit} >
        <h1>Edit post</h1>
        <Typography color="error"> {postError} </ Typography>
        <TextField
          value={title}
          margin="normal"
          label="Title"
          required
          fullWidth
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          value={content}
          margin="normal"
          label="Content"
          rows="5"
          fullWidth
          multiline
          onChange={e => { setContent(e.target.value); }}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          value="Submit"
          sx={{ mt: 3, mb: 2 }}
        > Edit Post </Button>
      </Box>
    </Container >
  );
}

export default EditPost;
