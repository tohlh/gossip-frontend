import React, { useState } from 'react';
import { addComment } from '../api/comment';
import { Button, Card, CardActions, CardHeader, Divider, TextField } from '@mui/material';

const AddCommentCard: React.FC<{ id: number }> = ({ id }) => {

  const [comment, setComment] = useState('');

  const handleSubmitComment = () => {
    addComment(id, comment)
      .then(r => {
        window.alert("Added successfully!");
        window.location.reload();
      })
      .catch()
  }

  return (
    <Card
      elevation={5}
      sx={{ mt: 3, mb: 3, borderRadius: 4, textAlign: "left" }}
    >
      <CardHeader title="Add Comment" />
      <Divider />
      <TextField
        margin="normal"
        placeholder="Content"
        fullWidth
        multiline
        inputProps={{
          style: { height: 100 }
        }}
        onChange={e => setComment(e.target.value)}
      />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmitComment}
        > Add</Button>
      </CardActions>
    </Card>
  )
}

export default AddCommentCard;