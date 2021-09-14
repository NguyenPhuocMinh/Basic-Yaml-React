import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '../Card';
import TreeView from '../TreeView';
import ToolbarCustom from '../Toolbar';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';
import { IconButton } from '@material-ui/core';

const data = [
  {
    id: '1',
    name: 'Cat 1'
  },
  {
    id: '2',
    name: 'Cat 2'
  },
  {
    id: '3',
    name: 'Cat 3'
  },
  {
    id: '4',
    name: 'Cat 4'
  },
  {
    id: '5',
    name: 'Cat 5'
  },
  {
    id: '6',
    name: 'Cat 6'
  }
]

const LoadedGridList = ({ view, list }) => {

  return (
    <Box display="flex" flexWrap={list ? "wrap" : ''}>
      {data.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          view={view}
          list={list}
        />
      ))}
    </Box>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
  },
  paper: {
    width: 'auto',
    flex: '1 1 auto',
    borderRadius: '10px',
    background: 'lightgrey'
  },
  gridContainer: {
    padding: theme.spacing(2),
  },
  treeBox: {
    border: '1px solid #9e9a9a'
  }
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  const [view, setView] = useState(true);
  const [list, setList] = useState(false);

  const handleClickList = () => {
    setList(true);
    setView(false);
  }

  const handleClickView = () => {
    setView(true);
    setList(false);
  }

  console.log("view", view);
  console.log("list", list);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <ToolbarCustom />
        <Grid item xs={12} className={classes.gridContainer}>
          <Paper className={classes.paper}>
            <Box display='flex' p={2}>
              <AssistantPhotoIcon />
              <Typography component='span' style={{ fontWeight: '600' }}>
                Service Catalog
              </Typography>
            </Box>
            <Box display='flex'>
              <Box p={2}>
                <Box p={1} className={classes.treeBox}>
                  <Typography component='span' style={{ fontWeight: '600' }}>
                    Categories
                  </Typography>
                  <Divider />
                  <TreeView />
                </Box>
              </Box>
              <Box p={2}>
                <Box p={1} display="flex" justifyContent="space-between">
                  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" href="/">
                      Category 2
                    </Link>
                    <Link color="inherit" href="/getting-started/installation/">
                      SubCategory 2
                    </Link>
                    <Typography color="textPrimary">Sub-Subcategory1</Typography>
                  </Breadcrumbs>
                  <Box>
                    <IconButton onClick={handleClickView}>
                      <ViewListIcon />
                    </IconButton>
                    <IconButton onClick={handleClickList}>
                      <ViewModuleIcon />
                    </IconButton>
                  </Box>
                </Box>
                <LoadedGridList view={view} list={list} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </main>
    </div>
  );
}