import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost } from '../redux/actions/data';
import Profile from '../components/Profile';
import CommentForm from '../components/CommentForm';
import { useParams } from 'react-router-dom';
import Post from '../components/Posts/Post/Post';
import Comments from '../components/Comments/Comments';
import Loading from './Loading';
import PropTypes from 'prop-types';

const SinglePost = ({ history }) => {
  const user = useSelector((state) => state.user.credentials);
  const { postId } = useParams();
  const ui = useSelector((state) => state.ui);
  const post = useSelector((state) => state.data.post);
  const comments = post.comments;
  const dispatch = useDispatch();
  const { loading } = ui;

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, []);

  if (loading || !Object.keys(post).length) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Grid container spacing={10}>
        <Grid item sm={4} xs={12}>
          <Profile user={user} />
        </Grid>
        <Grid item sm={8} xs={12}>
          <div style={{ marginTop: 30 }}>
            <Post post={post} history={history} />
          </div>
          <CommentForm postId={postId} />
          <Comments comments={comments} />
        </Grid>
      </Grid>
    </div>
  );
};

export default SinglePost;

SinglePost.propTypes = {
  history: PropTypes.object.isRequired,
};
