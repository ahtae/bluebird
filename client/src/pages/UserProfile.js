import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInformation } from '../redux/actions/data';
import { Profile, Posts, FollowersList } from '../components';
import { useParams } from 'react-router-dom';
import { Loading } from '../pages';
import _ from 'lodash';

const UserProfile = () => {
  const data = useSelector((state) => state.data);
  const { followers, user } = data;
  const posts = _.orderBy(user.posts, ['createdAt'], ['desc']);
  const ui = useSelector((state) => state.ui);
  const { loading } = ui;
  const dispatch = useDispatch();
  let { userHandle } = useParams();

  useEffect(() => {
    dispatch(getUserInformation(userHandle));
  }, [dispatch, userHandle]);

  if (loading || user.handle !== userHandle) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Grid container spacing={10}>
        <Grid item sm={4} xs={12}>
          <Profile user={user} />
          <FollowersList followers={followers} />
        </Grid>
        <Grid item sm={8} xs={12}>
          <div style={{ marginTop: 30 }}>
            <Posts posts={posts} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfile;
