import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { CardActionArea, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setPostsAsync, setMorePostsAsync, selectPosts } from "../store/postsSlice";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

// Shows all posts or posts with a particular tag
// Infinite scrolling is implemented and 10 posts are fetched per update
const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const posts = useAppSelector(selectPosts).posts;
  const tag = params["tag"] ? params["tag"] : null;

  useEffect(() => {
    setStartIndex(10);
    dispatch(setPostsAsync({ tag: tag }));
    window.scrollTo(0, 0);
  }, [dispatch, tag]);

  const posts_list = posts.posts.map(post =>
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

  const [startIndex, setStartIndex] = useState(10);
  const fetchMorePosts = () => {
    dispatch(setMorePostsAsync({ start: startIndex, length: 10, tag: tag }));
    setStartIndex(startIndex + 10);
  }

  return (
    <InfiniteScroll
      dataLength={posts.posts.length}
      next={fetchMorePosts}
      hasMore={posts.hasMore}
      loader={<h4>Loading...</h4>}
    >
      <Container sx={{ mt: 12, mb: 4 }} maxWidth="sm" >
        {
          tag && <h1>Posts with tag: #{tag}</h1>
        }

        <Grid container spacing={3} flex="true" direction="row">
          {posts_list}
        </Grid>
      </Container>
    </InfiniteScroll>
  );
}

export default Posts;
