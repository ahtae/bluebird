import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { uploadProfilePicture } from '../redux/actions/user';
import EditProfile from './EditProfile';
import { useToasts } from 'react-toast-notifications';
import { clearErrors } from '../redux/actionCreators/ui';
import { followAUser, unfollowAUser } from '../redux/actions/data';
import _ from 'lodash';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  ...theme.home,
  ...theme.profile,
});

const Profile = ({ user, classes }) => {
  const {
    handle,
    createdAt,
    profilePicture,
    bio,
    website,
    location,
    followers,
  } = user;
  const authenticatedUser = useSelector((state) => state.user.credentials);
  const ui = useSelector((state) => state.ui);
  const { errors } = ui;
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const isAlreadyAFollower = _.find(followers, {
    user: {
      handle: authenticatedUser.handle,
    },
  });

  const handleImageChange = (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    const formData = new FormData();

    formData.append('image', image, image.name);

    dispatch(uploadProfilePicture(formData));

    if (Object.keys(errors).length) {
      addToast('Unsuccessfully changed profile picture!', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      addToast('Successfully changed profile picture!', {
        appearance: 'success',
        autoDismiss: true,
      });
    }

    dispatch(clearErrors());
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById('imageInput');

    fileInput.click();
  };

  const handleFollowClick = () => {
    dispatch(followAUser(handle));
  };

  const handleUnfollowClick = () => {
    dispatch(unfollowAUser(handle));
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img className="profile-image" src={profilePicture} alt="profile" />
          {authenticatedUser.handle === handle && (
            <>
              <input
                type="file"
                id="imageInput"
                onChange={handleImageChange}
                hidden="hidden"
              />
              <Tooltip title="Change Profile Picture" placement="right">
                <IconButton onClick={handleEditImage}>
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </div>
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @ {handle}{' '}
          </MuiLink>{' '}
          {bio && <Typography variant="body2"> {bio} </Typography>} <hr />{' '}
          {location && (
            <React.Fragment>
              <LocationOn color="primary" />
              <span>{location}</span>
              <hr />
            </React.Fragment>
          )}{' '}
          {website && (
            <React.Fragment>
              <LinkIcon color="primary" />
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
              >
                {' '}
                {' ' + website}{' '}
              </a>{' '}
              <hr />
            </React.Fragment>
          )}{' '}
          <CalendarToday color="primary" />{' '}
          <span> Joined {dayjs(createdAt).format('MMM YYYY')} </span> <br />
          {authenticatedUser.handle === handle && <EditProfile />}
          {authenticatedUser.handle !== handle && (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.button}
              style={{ marginTop: 10 }}
              onClick={
                !isAlreadyAFollower ? handleFollowClick : handleUnfollowClick
              }
            >
              {!isAlreadyAFollower ? 'Follow' : 'Unfollow'}
            </Button>
          )}
        </div>{' '}
      </div>{' '}
    </Paper>
  );
};

export default withStyles(styles)(Profile);

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
