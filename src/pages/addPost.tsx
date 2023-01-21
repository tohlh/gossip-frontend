import '../App.css';
import React, { useState } from 'react';
import { Button, Box, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { createPost } from '../api/post';
import { useNavigate } from 'react-router-dom';

const AddPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currTag, setCurrTag] = useState('');
  const [postError, setPostError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createPost(title, content, tags)
      .then(r => {
        window.alert("Posted successfully!");
        navigate("/")
      })
      .catch(e => {
        setPostError(e.response.data.errors.join("\n"));
      })
  }

  const handleTagDelete = (tag: string) => () => {
    setTags(tags.filter(t => t !== tag));
  }

  const handleTagAdd = (tag: string) => () => {
    const regex = /^([_a-z0-9]{2,20})$/;
    if (!regex.test(tag)) {
      setPostError("Tag must be 2-20 characters of lowercase alphabets, numbers, underscores and without space.");
      return;
    }

    if (tags.some(e => e === tag)) {
      setPostError("Repeated tags not allowed");
    } else if (tags.length >= 5) {
      setPostError("No more than 5 tags allowed");
    } else {
      setPostError("");
      setTags(tags.concat(tag));
    }
  }

  const tag_chips = (
    <Stack
      spacing={1}
      direction="row"
      sx={{
        maxWidth: "100%",
        overflow: "auto"
      }}
    >
      {tags.map(tag =>
        <div key={tag}>
          <Chip
            onDelete={handleTagDelete(tag)}
            clickable
            label={"#" + tag}
            size="small"
            color="primary"
          />
        </div>
      )}
    </Stack >
  )

  return (
    <Container maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }} component="form" onSubmit={handleSubmit} >
        <h1>Create a new post</h1>
        <Typography
          sx={{ whiteSpace: "pre-line" }}
          color="error"
        > {postError} </ Typography>
        <TextField
          margin="normal"
          placeholder="Title"
          required
          fullWidth
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          placeholder="Content"
          rows="5"
          fullWidth
          multiline
          onChange={e => setContent(e.target.value)}
        />
        {tag_chips}
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item xs={8}>
            <TextField
              margin="normal"
              placeholder="Tag"
              fullWidth
              onChange={e => setCurrTag(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={handleTagAdd(currTag)}
              sx={{ mt: 3 }}
            > Add</Button>
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          value="Submit"
          sx={{ mt: 3, mb: 2 }}
        > Post </Button>
      </Box>
    </Container >
  );
}

export default AddPost;
