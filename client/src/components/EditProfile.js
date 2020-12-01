import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfileInformation } from '../redux/actions/user';
import { useToasts } from 'react-toast-notifications';
import { clearErrors } from '../redux/actionCreators/ui';

const styles = (theme) => ({
  ...theme.form,
});

const EditProfile = ({ classes }) => {
  const user = useSelector((state) => state.user.credentials);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website);
  const [location, setLocation] = useState(user.location);
  const [openEditDetails, setOpenEditDetails] = useState(false);
  const ui = useSelector((state) => state.ui);
  const { errors } = ui;
  const { addToast } = useToasts();

  const dispatch = useDispatch();

  const clearFormDetails = () => {
    setBio(user.bio);
    setLocation(user.location);
    setWebsite(user.website);
  };

  const handleUpdateProfileDetails = (event) => {
    event.preventDefault();

    const updatedProfileDetails = {
      bio,
      website,
      location,
    };

    dispatch(updateUserProfileInformation(updatedProfileDetails));

    if (
      user.bio !== bio ||
      user.website !== website ||
      user.location !== location
    ) {
      if (Object.keys(errors).length) {
        addToast('Unsuccessfully updated profile details!', {
          appearance: 'error',
          autoDismiss: true,
        });
      } else {
        addToast('Successfully updated profile details!', {
          appearance: 'success',
          autoDismiss: true,
        });

        dispatch(clearErrors());
        clearFormDetails();
        setOpenEditDetails(false);
      }
    }
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleCloseDialog = () => {
    setOpenEditDetails(false);
  };

  const handleOpenDialogClick = () => {
    setOpenEditDetails(true);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.button}
        onClick={handleOpenDialogClick}
      >
        Edit Profile Details
      </Button>
      <Dialog
        open={openEditDetails}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              value={bio}
              rows="2"
              className={classes.textField}
              placeholder="A little bit of information about yourself"
              onChange={handleBioChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              value={location}
              className={classes.textField}
              placeholder="Your current location"
              onChange={handleLocationChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              value={website}
              className={classes.textField}
              placeholder="Your website"
              onChange={handleWebsiteChange}
              fullWidth
              errors={errors.website}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.button}
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.button}
            type="submit"
            onClick={handleUpdateProfileDetails}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(EditProfile);

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};
