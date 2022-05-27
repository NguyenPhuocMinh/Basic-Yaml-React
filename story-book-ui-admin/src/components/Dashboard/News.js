import { cloneElement } from 'react';
import { useTranslate } from 'story-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
  Divider,
  Avatar,
  CardMedia
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BookIcon from '@mui/icons-material/Book';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const general = (element) => {
  return [0, 1, 2, 3, 4].map((value) => {
    return cloneElement(element, {
      key: value
    });
  });
};

const NewsBoard = () => {
  const { translate } = useTranslate();
  const _ = useSelector((state) => state);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={8}>
        <Paper elevation={3}>
          <Card
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9e9e9e' : '#607d8b',
              padding: '20px',
              marginTop: 2,
              marginBottom: '1em'
            }}
          >
            <Box display="flex" justifyContent="space-between" flex="1">
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="h2"
                  color="inherit"
                >
                  {translate('resources.dashboard.news.newBooks')}
                </Typography>
                <Box>
                  <Typography
                    variant="body1"
                    color="inherit"
                    component="p"
                    gutterBottom
                  >
                    Total: 11
                  </Typography>
                </Box>
              </Box>
              <Box>
                <BookIcon sx={{ width: 36, height: 36 }} />
              </Box>
            </Box>
            <Divider />
            <List
              dense={true}
              sx={{
                maxHeight: 500,
              }}
            >
              {general(
                <ListItem
                  // key={v.id}
                  secondaryAction={
                    <Box>
                      <Typography>Hello</Typography>
                    </Box>
                  }
                >
                  <Card
                    sx={{
                      marginRight: (theme) => theme.spacing(2)
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 48,
                        height: 48
                      }}
                      image="https://source.unsplash.com/random/1280x853"
                      alt="Live from space album cover"
                    />
                  </Card>
                  <ListItemText primary="primary" secondary="secondary" />
                </ListItem>
              )}{' '}
            </List>
            <Divider />
            <Box display="flex" justifyContent="center" mt={1}>
              <Button
                size="small"
                color="primary"
                component={Link}
                to="/boards"
                fullWidth
                sx={{
                  textTransform: 'capitalize',
                  borderColor: 0
                }}
                endIcon={<ArrowForwardIosIcon />}
              >
                {translate('common.button.viewAll')}
              </Button>
            </Box>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3}>
          <Card
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9e9e9e' : '#607d8b',
              padding: '20px',
              marginTop: 2,
              marginBottom: '1em'
            }}
          >
            <Box display="flex" justifyContent="space-between" flex="1">
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="h2"
                  color="inherit"
                >
                  {translate('resources.dashboard.news.favoriteAuthors')}
                </Typography>
                <Box>
                  <Typography
                    variant="body1"
                    color="inherit"
                    component="p"
                    gutterBottom
                  >
                    Total: 11
                  </Typography>
                </Box>
              </Box>
              <Box>
                <AccessibilityNewIcon sx={{ width: 36, height: 36 }} />
              </Box>
            </Box>
            <Divider />
            <List
              dense={true}
              sx={{
                maxHeight: 500
              }}
            >
              {general(
                <ListItem
                  // key={v.id}
                  secondaryAction={
                    <Box>
                      <Typography>Hello</Typography>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="primary" secondary="secondary" />
                </ListItem>
              )}{' '}
            </List>
            <Divider />
            <Box display="flex" justifyContent="center" mt={1}>
              <Button
                size="small"
                color="primary"
                component={Link}
                to="/authors"
                fullWidth
                sx={{
                  textTransform: 'capitalize',
                  borderColor: 0
                }}
                endIcon={<ArrowForwardIosIcon />}
              >
                {translate('common.button.viewAll')}
              </Button>
            </Box>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewsBoard;
