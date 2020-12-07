import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikeButton from '../../Buttons/LikeButton';
import CommentButton from '../../Buttons/CommentButton';
import DeleteButton from '../../Buttons/DeleteButton';
import {
  likeAPost,
  unlikeAPost,
  deleteAPost,
} from '../../../redux/actions/data';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import { useToasts } from 'react-toast-notifications';
import { clearErrors } from '../../../redux/actionCreators/ui';

const styles = (theme) => ({
  ...theme.post,
});

const Post = ({ post, classes, history }) => {
  const { addToast } = useToasts();
  const user = useSelector((state) => state.user.credentials);
  const dispatch = useDispatch();
  const userId = user.id;
  const {
    body,
    createdAt,
    userImage,
    id,
    userHandle,
    likeCount,
    comments,
    likes,
  } = post;
  const commentCount = comments.length;
  const location = useLocation();
  const ui = useSelector((state) => state.ui);
  const { errors } = ui;
  const isShowingPost = location.pathname.includes('/posts');
  const hasAlreadyLikedPost = _.includes(likes, userId);

  dayjs.extend(relativeTime);

  const handleLikeClick = () => {
    if (!hasAlreadyLikedPost) {
      dispatch(likeAPost(id));

      if (Object.keys(errors).length) {
        addToast('Unsuccessfully liked post!', {
          appearance: 'error',
          autoDismiss: true,
        });

        dispatch(clearErrors());
      } else {
        addToast('Successfully liked post!', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    }
  };

  const handleUnlikeClick = () => {
    if (hasAlreadyLikedPost) {
      dispatch(unlikeAPost(id));

      if (Object.keys(errors).length) {
        addToast('Unsuccessfully unliked post!', {
          appearance: 'error',
          autoDismiss: true,
        });

        dispatch(clearErrors());
      } else {
        addToast('Successfully unliked post!', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    }
  };

  const handleDeleteClick = () => {
    dispatch(deleteAPost(id));

    if (Object.keys(errors).length) {
      addToast('Unsuccessfully deleted post!', {
        appearance: 'error',
        autoDismiss: true,
      });

      dispatch(clearErrors());
    } else {
      addToast('Successfully deleted post!', {
        appearance: 'success',
        autoDismiss: true,
      });
    }

    if (location.pathname !== '/dashboard') {
      history.push('/dashboard');
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile Image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="body1"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {user.handle === userHandle ? (
          <DeleteButton handleDeleteClick={handleDeleteClick} type="post" />
        ) : null}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton
          hasAlreadyLiked={hasAlreadyLikedPost}
          handleLikeClick={handleLikeClick}
          handleUnlikeClick={handleUnlikeClick}
        />
        <span>{likeCount} likes </span>
        <CommentButton />
        <span>
          {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
        </span>
        {!isShowingPost ? (
          <Link to={`/posts/${id}`}>
            <UnfoldMoreOutlinedIcon />
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Post);

Post.propTypes = {
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
