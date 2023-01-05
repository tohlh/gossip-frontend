import '../App.css';
import { useEffect, useState } from 'react';
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
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, MenuOutlined, Tag } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTagsAsync, selectTags } from '../store/tagSlice';
import { setCurrentUserAsync, selectUser } from '../store/userSlice';
import logo from "../assets/logo.png"
import { removeAuthToken } from '../utils/auth';

export default function NavBarDrawer() {
  const [tagMenuOpen, setTagMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTags).tags;
  const currentUser = useAppSelector(selectUser).currentUser;
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

  const tags_menu = (
    <div>
      <List sx={{ width: "100%", maxWidth: 280, mt: 10 }}>
        <ListItem
          component={Link}
          to={"/"}
          disablePadding
          sx={{ color: 'inherit' }}
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

  const user_avatar = (
    <div>
      <IconButton sx={{ borderRadius: 0 }} onClick={handleUserMenuOpen}>
        <Chip avatar={<Avatar />} label={currentUser.username} />
      </IconButton>
      {user_menu}
    </div>
  )

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
