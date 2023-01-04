import '../App.css';
import React, { useEffect } from 'react';
import { Container } from '@mui/system';
import {
  Grid,
} from '@mui/material';

import PostCard from '../components/PostCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setPostsAsync, selectPosts } from '../store/postSlice';

const Posts: React.FC = () => {
  const posts = useAppSelector(selectPosts).posts;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPostsAsync({ start: 0, length: 10, tag: null }));
  }, [dispatch]);

  const posts_list = posts.map(post =>
    <Grid item key={post.id} xs={12}>
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
    </Grid>
  )

  return (
    <Container sx={{ mt: 12, mb: 4 }} >
      <Grid container direction="row">
        <Grid item md={12} sx={{ ml: 30 }}>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="flex-start"
          >
            {posts_list}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Posts;
