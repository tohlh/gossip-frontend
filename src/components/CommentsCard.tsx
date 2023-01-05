import moment from "moment"
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { comment } from "../api/comment";

const CommentsCard = (
  props: { comments: comment[] }
) => {
  moment.locale("en-SG");
  // const datetime = moment(created_at).format("YYYY/MM/DD, HH:mm");

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
