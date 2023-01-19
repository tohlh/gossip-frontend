import '../App.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import { CardActionArea, Grid, Typography } from '@mui/material';
import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setUserAsync, selectUser } from '../store/userSlice';
import { selectUserPosts, setUserPostsAsync, setMoreUserPostsAsync } from '../store/userPostsSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

const UserProfile: React.FC = () => {
  const params = useParams();
  const username = params["username"] ? params["username"] : null;
  const user = useAppSelector(selectUser).user;
  const posts = useAppSelector(selectUserPosts).userPosts
  const dispatch = useAppDispatch();

  useEffect(() => {
    setStartIndex(10);
    window.scrollTo(0, 0);
    dispatch(setUserAsync(username));
    dispatch(setUserPostsAsync({ username: username }));
  }, [dispatch, username]);

  const [startIndex, setStartIndex] = useState(10);
  const fetchMoreUserPosts = () => {
    dispatch(setMoreUserPostsAsync({ username: username, start: startIndex, length: 10 }));
    setStartIndex(startIndex + 10);
  }

  const posts_list = posts.userPosts.map(post =>
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

  const posts_grid = (
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

  return (
    <InfiniteScroll
      dataLength={posts.userPosts.length}
      next={fetchMoreUserPosts}
      hasMore={posts.hasMore}
      loader={<h4>Loading...</h4>}
    >
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
    </InfiniteScroll>
  );
}

export default UserProfile;
