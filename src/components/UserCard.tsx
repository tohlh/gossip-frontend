import { Avatar, Card, CardHeader, CardContent, Typography, Divider } from '@mui/material';

const UserCard = ({ name, username }: { name: string, username: string }) => {
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
            {name[0]}
          </Avatar>}
        />
        <Divider />
        <CardContent>
          <Typography variant="h3">
            {name}
          </Typography>
          <Typography variant="body1">
            @{username}
          </Typography>
        </CardContent>
      </Card>
    </div >
  )
}

export default UserCard;
