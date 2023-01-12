import moment from "moment"
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, Divider, IconButton, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"
import { comment, deleteComment } from "../api/comment";

const CommentsCard = (
  props: { comments: comment[] }
) => {
  moment.locale("en-SG");
  const handleDelete = (id: number) => (event: any) => {
    event.preventDefault();
    deleteComment(id)
      .then(r => {
        window.alert("Comment deleted!");
        window.location.reload();
      })
      .catch()
  }

  return (
    <div>
      <Card elevation={5} sx={{ mt: 3, borderRadius: 4 }}>
        <CardHeader align="left" title={"Comments"} />
        <Divider />
        {props.comments.map(comment =>
          <div>
            <CardContent sx={{ textDecoration: 'none', textAlign: "left" }}>
              <Typography
                sx={{ whiteSpace: "pre-line" }}
                variant="body1"
              >{comment.content}</Typography>
            </CardContent>

            {comment.is_op && (
              <CardContent
                sx={{ textDecoration: 'none', textAlign: "right" }}>
                <IconButton
                  size="small"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={handleDelete(comment.id)}
                  size="small">
                  <Delete />
                </IconButton>
              </CardContent>
            )}

            <CardContent sx={{ textDecoration: 'none', textAlign: "right" }}>
              <Typography variant="caption" alignSelf="right">
                <Typography
                  sx={{ color: "inherit" }}
                  variant="caption"
                  component={Link}
                  to={"/user/" + comment.user.username}
                >
                  @{comment.user.username}
                </Typography>
                , {moment(comment.created_at).format("YYYY/MM/DD, HH:mm")} SGT
              </Typography>
              <Typography variant="caption">
                {comment.is_edited ? " (Edited)" : ""}
              </Typography>
            </CardContent>
            <Divider />
          </div>
        )}
      </Card>
    </div>
  )
};

export default CommentsCard;
