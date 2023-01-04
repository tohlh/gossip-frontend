import moment from "moment"
import { Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { post } from "../api/post";
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
  const datetime = moment(created_at).format("YYYY/MM/DD, HH:mm");
  const tag_chips = (
    <Stack spacing={1} direction="row" sx={{ overflow: "auto" }}>
      {tags.map(tag =>
        <div key={tag.title}>
          <Chip label={tag.title} size="small" color="primary" />
        </div>
      )}
    </Stack >
  )

  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: 4 }}>
        <CardHeader align="left" title={title} />
        <Divider />
        <CardContent sx={{ textAlign: "left" }}>
          <Typography variant="body1">{content}</Typography>
        </CardContent>

        <CardContent sx={{ alignContent: "right" }}>
          {tag_chips}
        </CardContent>

        <CardContent sx={{ textAlign: "right" }}>
          <Typography variant="caption" alignSelf="right">
            Posted by {user.username} @ {datetime} Local Time
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