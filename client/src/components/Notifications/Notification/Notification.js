import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import { useDispatch } from 'react-redux';
import { readANotification } from '../../../redux/actions/data';
import { useToasts } from 'react-toast-notifications';
import { useSelector } from 'react-redux';
import { clearErrors } from '../../../redux/actionCreators/ui';

const styles = (theme) => ({
  ...theme.notification,
});

const Notification = ({ classes, notification }) => {
  const dispatch = useDispatch();
  const verb = notification.message.includes('like')
    ? 'like'
    : notification.message.includes('made')
    ? 'made'
    : 'comment';
  const time = dayjs(notification.createdAt).fromNow();
  const iconColor = notification.isRead ? 'primary' : 'secondary';
  const icon =
    verb === 'like' ? (
      <FavoriteIcon color={iconColor} className={classes.icon} />
    ) : (
      <ChatIcon color={iconColor} className={classes.icon} />
    );
  const ui = useSelector((state) => state.ui);
  const { errors } = ui;
  const { addToast } = useToasts();

  const handleReadNotificationClick = (event) => {
    event.preventDefault();

    dispatch(readANotification(notification.id));

    if (Object.keys(errors).length) {
      addToast(`Unsuccessfully read comment! ${errors.error}`, {
        appearance: 'error',
        autoDismiss: true,
      });

      dispatch(clearErrors());
    } else {
      addToast('Successfully read comment!', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  };

  return (
    <div className={classes.container}>
      <Typography
        component={Link}
        color="default"
        className={classes.message}
        variant="body1"
        to={`/posts/${notification.postId}`}
      >
        {icon}

        {notification.message}
      </Typography>
      {!notification.isRead && (
        <Typography
          color="default"
          variant="body1"
          onClick={handleReadNotificationClick}
        >
          Mark as read
        </Typography>
      )}
      <Typography
        color="default"
        variant="body2"
        className={notification.isRead ? classes.isRead : classes.isNotRead}
      >
        {' '}
        {time}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Notification);

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
};
