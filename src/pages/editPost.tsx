import '../App.css';
import React, { useEffect, useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { getPost, editPost } from '../api/post';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params["id"])
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postError, setPostError] = useState('');

  useEffect(() => {
    const getPostAsync = async (id: number) => {
      const response = await getPost(id).then(r => r).catch();
      setTitle(response?.data.title);
      setContent(response?.data.content);
    }
    getPostAsync(id)
    window.scrollTo(0, 0);
  }, [id]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    editPost(id, title, content)
      .then(r => {
        window.alert("Updated successfully!");
        navigate("/")
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
        <h1>Edit post</h1>
        <Typography color="error"> {postError} </ Typography>
        <TextField
          value={title}
          margin="normal"
          placeholder="Title"
          required
          fullWidth
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          value={content}
          margin="normal"
          placeholder="Content"
          fullWidth
          multiline
          onChange={e => { setContent(e.target.value); }}
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
        > Edit Post </Button>
      </Box>
    </Container >
  );
}

export default EditPost;
