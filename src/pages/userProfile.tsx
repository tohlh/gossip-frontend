import '../App.css';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setUserAsync, selectUser } from '../store/userSlice';
import { selectPosts, setUserPostsAsync } from '../store/postsSlice';

const UserProfile: React.FC = () => {
  const params = useParams();
  const username = params["username"] ? params["username"] : null;

  const user = useAppSelector(selectUser).user;
  const posts = useAppSelector(selectPosts).posts
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setUserAsync(username));
    dispatch(setUserPostsAsync({ username: username, start: 0, length: 10 }));
  }, [dispatch, username]);

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

  const posts_grid = (
    <div>
      {
        posts_list.length > 0
          ?
          <Grid
            container
            spacing={3}
            sx={{ mt: 3 }}
          >
            {posts_list}
          </Grid>
          :
          <Grid
            container
            spacing={3}
            sx={{ mt: 3, flexDirection: "column", alignItems: "center" }}
          >
            <Typography variant="h4">
              {user.name} has not posted anything
            </Typography>
          </Grid>
      }
    </div>
  )

  return (
    <Container sx={{ mt: 12, mb: 4 }} maxWidth="sm">
      {
        user !== null
          ? (
            <div>
              <UserCard name={user.name} username={user.username} />
              <div>{posts_grid}</div>
            </div>
          )
          : <h1>User not found</h1>
      }
    </Container>
  );
}

export default UserProfile;
