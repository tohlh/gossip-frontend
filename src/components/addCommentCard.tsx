import React, { useState } from "react";
import { addComment } from "../api/comment";
import { Button, Card, CardActions, CardHeader, TextField } from "@mui/material";

const AddCommentCard: React.FC<{ id: number }> = ({ id }) => {
  // use React state to store the comment
  const [comment, setComment] = useState("");

  /* Submit the comment to the server. Reload once successful.
   * Error will be shown
   */
  const handleSubmitComment = () => {
    addComment(id, comment)
      .then(r => {
        window.alert("Added successfully!");
        window.location.reload();
      })
      .catch(e => {
        window.alert(e);
      })
  }

  return (
    <Card
      elevation={5}
      sx={{ mt: 3, mb: 3, borderRadius: 4, textAlign: "left" }}
    >
      <CardHeader title="Add Comment" />
      <TextField
        fullWidth
        rows="5"
        margin="none"
        label="Comment"
        multiline
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