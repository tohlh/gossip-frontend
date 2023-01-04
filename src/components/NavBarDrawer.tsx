import '../App.css';
import { useEffect } from 'react';
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material';
import { Tag } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTagsAsync, selectTags } from '../store/tagSlice';

export default function NavBarDrawer() {
  const tags = useAppSelector(selectTags).tags;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTagsAsync());
  }, [dispatch]);

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
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ position: "fixed" }} >
        {tags_list}
      </Drawer>
    </div>
  );
}
