import '../App.css';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardHeader, Divider, TextField } from '@mui/material';
import { Container } from '@mui/system';
import PostCard from '../components/PostCard';
import CommentsCard from '../components/CommentsCard';
import { addComment } from '../api/comment';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setPostAsync, selectPost } from '../store/postSlice';
import { setCommentsAsync, selectComments } from '../store/commentsSlice';
import { useParams } from 'react-router-dom';

const Post: React.FC = () => {
  const params = useParams();
  const id = Number(params["id"]);

  const [comment, setComment] = useState('');

  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost).post;
  const comments = useAppSelector(selectComments).comments;

  useEffect(() => {
    dispatch(setCommentsAsync({ id }));
    dispatch(setPostAsync({ id }));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const handleSubmitComment = () => {
    addComment(id, comment)
      .then(r => {
        window.alert("Posted successfully!");
      })
      .catch()
    window.location.reload();
  }

  return (
    <Container sx={{ mt: 12, mb: 4 }} maxWidth="sm" >
      {
        post === null
          ? <h1> Invalid post ID </h1>
          : (
            <PostCard
              id={post.id}
              title={post.title}
              content={post.content}
              is_edited={post.is_edited}
              is_op={post.is_op}
              tags={post.tags}
              user={post.user}
              created_at={post.created_at}
            />
          )
      }
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

      {
        comments.length > 0 &&
        <CommentsCard comments={comments} />
      }

    </Container >
  );
}

export default Post;
