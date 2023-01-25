import React, { useEffect } from "react";
import { Container } from "@mui/system";
import PostCard from "../components/PostCard";
import CommentsCard from "../components/CommentsCard";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setPostAsync, selectPost } from "../store/postSlice";
import { setCommentsAsync, selectComments } from "../store/commentsSlice";
import { useParams } from "react-router-dom";
import AddCommentCard from "../components/addCommentCard";

// This page shows one post and its comments
const Post: React.FC = () => {
  const params = useParams();
  const id = Number(params["id"]);

  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost).post;
  const comments = useAppSelector(selectComments).comments;

  useEffect(() => {
    dispatch(setCommentsAsync({ id }));
    dispatch(setPostAsync({ id }));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  return (
    <Container sx={{ mt: 12, mb: 4 }} maxWidth="sm" >
      {
        post === null
          ? <h1> Invalid post ID </h1>
          : (
            <div>
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
              <AddCommentCard id={id} />
            </div>
          )
      }
      {
        comments.length > 0 &&
        <CommentsCard comments={comments} />
      }

    </Container >
  );
}

export default Post;
