import { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Home, MenuOutlined, Tag } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setTagsAsync, selectTags } from "../store/tagSlice";
import { setCurrentUserAsync, selectCurrentUser } from "../store/currentUserSlice";
import logo from "../assets/logo.png";
import { removeAuthToken } from "../utils/auth";

// This is the main navigation bar and drawer. The drawer shows a home button and top 20 tags.
export default function NavBarDrawer() {
  const [tagMenuOpen, setTagMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTags).tags;
  const currentUser = useAppSelector(selectCurrentUser).currentUser;
  useEffect(() => {
    dispatch(setTagsAsync());
    dispatch(setCurrentUserAsync());
  }, [dispatch]);

  const handleTagMenu = () => {
    setTagMenuOpen(!tagMenuOpen);
  }

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  }

  const handleLogout = () => {
    removeAuthToken();
    window.location.reload();
  }

  // To show top 20 tags
  const tags_menu = (
    <div>
      <List sx={{ width: "100%", maxWidth: 280, mt: 10 }}>
        <ListItem
          component={Link}
          to={"/"}
          disablePadding
          sx={{ color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>
              Home
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <Divider />

        {tags.map(tag =>
          <ListItem
            component={Link}
            to={"/tag/" + tag.title}
            key={tag.title}
            disablePadding
            sx={{ color: 'inherit' }}
          >
            <ListItemButton>
              <ListItemIcon><Tag /></ListItemIcon>
              <ListItemText primary={tag.title} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  )

  /* Drawer shows home button and top 20 tags.
   * There are two drawers being implemented here, one is for mobile, one is for desktop.
   * Depending on the device being used, the appropriate one will be displayed 
   * while the other one is hidden.
   */
  const drawer = (
    <div>
      <Drawer variant="permanent"
        sx={{
          position: "fixed",
          display: { xs: "none", lg: "block" },
          '& .MuiDrawer-paper': { boxSizing: "border-box", width: 270 },
        }}
        open
      >
        {tags_menu}
      </Drawer>

      <Drawer
        variant="temporary"
        onClose={handleTagMenu}
        open={tagMenuOpen}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 270 },
        }}
      >
        {tags_menu}
      </Drawer>
    </div>
  )

  // User menu appears upon clicking the user avatar, will lead to profile, account settings and logout
  const user_menu = (
    <div>
      <Menu
        anchorEl={userMenuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
      >
        <MenuItem
          onClick={handleUserMenuClose}
          component={Link}
          to={"/user/" + currentUser.username}
          sx={{ color: 'inherit' }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleUserMenuClose}
          component={Link}
          to={"/account"}
          sx={{ color: 'inherit' }}
        >
          Account Settings
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{ color: 'inherit' }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  )

  // Clickable user avatar that shows user_menu upon clicking
  const user_avatar = (
    <div>
      <IconButton sx={{ borderRadius: 0 }} onClick={handleUserMenuOpen}>
        <Chip avatar={<Avatar />} label={currentUser.username} />
      </IconButton>
      {user_menu}
    </div>
  )

  // Toolbar that shows hamburger menu (only in mobile mode), site logo and user avatar
  const toolbar = (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          onClick={handleTagMenu}
          sx={{ display: { lg: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Link to="/">
          <img
            src={logo}
            width="100px"
            height="50px"
            alt="logo" />
        </Link>

        {user_avatar}

      </Toolbar>
    </AppBar>
  )

  return (
    <div>
      {toolbar}
      {drawer}
    </div>
  )
}
