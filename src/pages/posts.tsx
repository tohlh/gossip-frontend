import '../App.css';
import React, { useEffect } from 'react';
import { Container } from '@mui/system';
import { CardActionArea, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import PostCard from '../components/PostCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setPostsAsync, selectPosts } from '../store/postSlice';
import { useParams } from 'react-router-dom';

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const posts = useAppSelector(selectPosts).posts;
  const tag = params["tag"] ? params["tag"] : null;

  useEffect(() => {
    dispatch(setPostsAsync({ start: 0, length: 10, tag: tag }));
    window.scrollTo(0, 0);
  }, [dispatch, tag]);

  const posts_list = posts.map(post =>
    <Grid item key={post.id} xs={12}>
      <CardActionArea
        sx={{ borderRadius: 4 }}
        component={Link}
        to={"/post/" + post.id}
      >
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
      </CardActionArea>
    </Grid>
  )

  return (
    <Container sx={{ mt: 12, mb: 4 }} maxWidth="sm" >
      {
        tag ? <h1>Posts with tag: #{tag}</h1> : <></>
      }

      <Grid container spacing={3} flex="true" direction="row">
        {posts_list}
      </Grid>
    </Container>
  );
}

export default Posts;
