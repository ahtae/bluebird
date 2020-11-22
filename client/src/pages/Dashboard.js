import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Posts from '../components/Posts/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/actions/data';
import Profile from '../components/Profile';
import PostForm from '../components/PostForm';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  dashBoardContainer: {
    marginLeft: '100px',
    marginTop: '100px',
  },
});

const Dashboard = ({ classes }) => {
  const user = useSelector((state) => state.user.credentials);
  const ui = useSelector((state) => state.ui);
  const posts = useSelector((state) => state.data.posts);
  const dispatch = useDispatch();
  const { loading } = ui;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading || !Object.keys(user).length) {
    return (
      <div className="container">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="container">
      <Grid container spacing={6}>
        <Grid item sm={4} xs={10}>
          <Profile user={user} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <PostForm />
          <Posts posts={posts} />
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </div>
  );
};

export default withStyles(styles)(Dashboard);
