import "../App.css";
import { Link, Outlet } from "react-router-dom";
import { Container } from "@mui/system";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import NavBarDrawer from "../components/NavBarDrawer";

// The general layout of the app
export default function Layout() {
  return (
    <div>
      <NavBarDrawer />
      <Container maxWidth="md" >
        <Outlet />
        <Fab
          component={Link}
          to="/post/create"
          color="primary"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}>
          <Add />
        </Fab>
      </Container>
    </div>
  );
}
