import '../App.css';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import { Avatar, Card, CardHeader, CardContent, Grid, Typography, Divider } from '@mui/material';
import PostCard from '../components/PostCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setUserAsync, selectUser } from '../store/userSlice';
import { selectPosts, setUserPostsAsync } from '../store/postSlice';

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

  const posts_grid = () => {
    return (
      <div>
        {
          posts_list.length > 0
            ? (
              <Grid
                container
                spacing={3}
                sx={{ mt: 3 }}
              >
                {posts_list}
              </Grid>
            )
            : (
              <Grid
                container
                spacing={3}
                sx={{ mt: 3, flexDirection: "column", alignItems: "center" }}
              >
                <Typography variant="h4">
                  {user.name} has not posted anything
                </Typography>
              </Grid>
            )
        }


      </div>
    )
  }

  const user_card = () => {
    return (
      <div>
        <Card elevation={5} sx={{ borderRadius: 4 }}>
          <CardHeader
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
            avatar={<Avatar color="primary" sx={{ width: 80, height: 80, fontSize: 70 }}>
              {user.name[0]}
            </Avatar>}
          />
          <Divider />
          <CardContent>
            <Typography variant="h3">
              {user.name}
            </Typography>
            <Typography variant="body1">
              @{user.username}
            </Typography>
          </CardContent>
        </Card>
      </div >
    )
  }

  return (
    <Container sx={{ mt: 12, mb: 4, textAlign: "center" }}>
      {
        user !== undefined
          ? (
            <div>
              <div>{user_card()}</div>
              <div>{posts_grid()}</div>
            </div>
          )
          : <h1>User not found</h1>
      }
    </Container>
  );
}

export default UserProfile;
