import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileInformation } from '../redux/actions/user';

const styles = (theme) => ({
  ...theme.form,
});

const EditProfile = ({ classes }) => {
  const user = useSelector((state) => state.user.credentials);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website);
  const [location, setLocation] = useState(user.location);
  const [openEditDetails, setOpenEditDetails] = useState(false);

  const userId = user.id;
  const dispatch = useDispatch();

  const clearFormDetails = () => {
    setBio('');
    setLocation('');
    setWebsite('');
  };

  const handleUpdateProfileDetails = (event) => {
    event.preventDefault();

    const updatedProfileDetails = {
      bio,
      website,
      location,
    };

    dispatch(updateProfileInformation(userId, updatedProfileDetails));

    clearFormDetails();
    setOpenEditDetails(false);
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
    <React.Fragment>
      <Button color="primary" onClick={handleOpenDialogClick}>
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
              multiline
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
    </React.Fragment>
  );
};

export default withStyles(styles)(EditProfile);

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};
