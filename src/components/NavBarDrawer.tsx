import '../App.css';
import { useEffect, useState } from 'react';
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { MenuOutlined, Tag } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTagsAsync, selectTags } from '../store/tagSlice';

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

  const tags_list = (
    <List sx={{ width: "100%", maxWidth: 280, mt: 10 }}>
      {tags.map(tag =>
        <ListItem key={tag.title} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Tag />
            </ListItemIcon>
            <ListItemText primary={tag.title} />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  )

  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={handleMenu}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuOutlined />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Gossip
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent"
        sx={{
          position: "fixed",
          display: { xs: "none", lg: "block" },
          '& .MuiDrawer-paper': { boxSizing: "border-box", width: 230 },
        }}
        open
      >
        {tags_list}
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 230 },
        }}
      >
        {tags_list}
      </Drawer>
    </div>
  );
}
