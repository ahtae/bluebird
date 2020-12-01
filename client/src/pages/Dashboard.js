import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/actions/data';
import { Posts, Profile, PostForm } from '../components';
import { Loading } from '../pages';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.credentials);
  const ui = useSelector((state) => state.ui);
  const posts = useSelector((state) => state.data.posts);
  const { loading } = ui;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Grid container spacing={10}>
        <Grid item sm={4} xs={12}>
          <Profile user={user} />
        </Grid>
        <Grid item sm={8} xs={12}>
          <PostForm />
          <Posts posts={posts} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
