import '../App.css';
import { useEffect, useState } from 'react';
import {
  AppBar,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, MenuOutlined, Tag } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTagsAsync, selectTags } from '../store/tagSlice';
import logo from "../assets/logo.png"

export default function NavBarDrawer() {
  const tags = useAppSelector(selectTags).tags;
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(setTagsAsync());
  }, [dispatch]);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const drawer_list = (
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
          '& .MuiDrawer-paper': { boxSizing: "border-box", width: 230 },
        }}
        open
      >
        {drawer_list}
      </Drawer>

      <Drawer
        variant="temporary"
        onClose={handleMenu}
        open={menuOpen}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 270 },
        }}
      >
        {drawer_list}
      </Drawer>
    </div>
  )

  const toolbar = (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          onClick={handleMenu}
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
