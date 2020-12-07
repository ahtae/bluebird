import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Paper from '@material-ui/core/Paper';
import LikeButton from '../../LikeButton';
import DeleteButton from '../../DeleteButton';
import {
  likeAComment,
  unlikeAComment,
  deleteAComment,
} from '../../../redux/actions/data';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useToasts } from 'react-toast-notifications';
import { clearErrors } from '../../../redux/actionCreators/ui';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
    padding: 10,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

const Comment = ({ comment, classes }) => {
  const { addToast } = useToasts();
  const user = useSelector((state) => state.user.credentials);
  const userId = user.id;
  const {
    content,
    createdAt,
    userHandle,
    userImage,
    likes,
    likeCount,
    postId,
    id,
  } = comment;
  const dispatch = useDispatch();
  const hasAlreadyLikedComment = _.includes(likes, userId);
  const ui = useSelector((state) => state.ui);
  const { errors } = ui;

  dayjs.extend(relativeTime);

  const handleLikeClick = () => {
    if (!hasAlreadyLikedComment) {
      dispatch(likeAComment(postId, id));

      if (Object.keys(errors).length) {
        addToast('Unsuccessfully commented on post!', {
          appearance: 'error',
          autoDismiss: true,
        });

        dispatch(clearErrors());
      } else {
        addToast('Successfully commented on post!', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    }
  };

  const handleUnlikeClick = () => {
    if (hasAlreadyLikedComment) {
      dispatch(unlikeAComment(postId, id));

      if (Object.keys(errors).length) {
        addToast('Unsuccessfully unliked comment!', {
          appearance: 'error',
          autoDismiss: true,
        });

        dispatch(clearErrors());
      } else {
        addToast('Successfully unliked comment!', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    }
  };

  const handleDeleteClick = () => {
    dispatch(deleteAComment(postId, id));

    if (Object.keys(errors).length) {
      addToast('Unsuccessfully deleted comment!', {
        appearance: 'error',
        autoDismiss: true,
      });

      dispatch(clearErrors());
    } else {
      addToast('Successfully deleted comment!', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  };

  return (
    <Paper>
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <DeleteButton handleDeleteClick={handleDeleteClick} type="comment" />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{content}</Typography>
          <LikeButton
            hasAlreadyLiked={hasAlreadyLikedComment}
            handleLikeClick={handleLikeClick}
            handleUnlikeClick={handleUnlikeClick}
          />
          <span>{likeCount} likes </span>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default withStyles(styles)(Comment);
