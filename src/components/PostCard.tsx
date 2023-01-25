import moment from "moment";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, Chip, Divider, IconButton, Typography } from "@mui/material";
import { Edit, Delete, Tag } from "@mui/icons-material";
import { post, deletePost } from "../api/post";
import { Stack } from "@mui/system";

const PostCard = (
  { id,
    title,
    content,
    is_op,
    is_edited,
    tags,
    user,
    created_at
  }: post
) => {
  moment.locale("en-SG");
  const navigate = useNavigate();
  const location = useLocation();
  const datetime = moment(created_at).format("YYYY/MM/DD, HH:mm");

  /* Sends a delete(id) request to the server
   * There are three paths where a user can delete the post
   * 1. at the posts page (home page with list of posts)
   * 2. at the post page (single post)
   * 3. at the user profile page
   * 
   * We do not want to reload the window at the (2) after deletion,
   * because the post is gone and this URL will only result in 
   * invalid post. Hence, we will redirect the user to the home page.
   * 
   * For the other cases, it is better to keep the user where they were.
   */
  const handleDelete = (id: number) => (event: any) => {
    const currentPath = location.pathname;
    const redirectPath = currentPath === "/" || currentPath.startsWith("/user") ? currentPath : "/";
    event.preventDefault();
    deletePost(id)
      .then(r => {
        window.alert("Post deleted!");
        navigate(redirectPath);
        window.location.reload();
      })
      .catch()
  }

  // Display tags with Chip
  const tag_chips = (
    <Stack spacing={1} direction="row" sx={{ overflow: "auto" }}>
      {tags.map(tag =>
        <div key={tag.title}>
          <Link to={"/tag/" + tag.title} style={{ color: "inherit" }}>
            <Chip icon={<Tag />} clickable label={tag.title} size="small" color="primary" />
          </Link>
        </div>
      )}
    </Stack >
  )

  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: 4 }}>
        <CardHeader align="left" title={title} />
        <Divider />
        <CardContent sx={{ textDecoration: "none", textAlign: "left" }}>
          <Typography
            sx={{ whiteSpace: "pre-line" }}
            variant="body1"
          >{content}</Typography>
        </CardContent>

        <CardContent sx={{ textDecoration: "none", alignContent: "right" }}>
          {tag_chips}
        </CardContent>

        {is_op && (
          <CardContent
            sx={{ textDecoration: "none", textAlign: "right" }}>
            <IconButton
              size="small"
              component={Link}
              to={"/edit/post/" + id}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={handleDelete(id)}
              size="small">
              <Delete />
            </IconButton>
          </CardContent>
        )}

        <CardContent sx={{ textDecoration: "none", textAlign: "right" }}>
          <Typography variant="caption" alignSelf="right">
            <Typography
              sx={{ color: "inherit" }}
              variant="caption"
              component={Link}
              to={"/user/" + user.username}
            >
              @{user.username}
            </Typography>
            , {datetime} SGT
          </Typography>
          <Typography variant="caption" color="warning">
            {is_edited ? " (Edited)" : ""}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
};

export default PostCard;