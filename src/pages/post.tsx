import '../App.css';
import React, { useEffect } from 'react';
import { Container } from '@mui/system';

import PostCard from '../components/PostCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setPostAsync, selectPost } from '../store/postSlice';
import { useParams } from 'react-router-dom';

const Post: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = Number(params["id"]);
  const post = useAppSelector(selectPost).post;

  useEffect(() => {
    dispatch(setPostAsync({ id }));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

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
            />)
      }
    </Container>
  );
}

export default Post;
