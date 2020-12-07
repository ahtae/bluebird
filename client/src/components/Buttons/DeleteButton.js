import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const DeleteButton = ({ handleDeleteClick, type }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialogClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialogClick = () => {
    setOpenDialog(false);
  };

  return (
    <Fragment>
      <Tooltip title={`Delete ${type}`}>
        <IconButton color="primary" onClick={handleOpenDialogClick}>
          <DeleteOutline color="secondary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialogClick}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to delete this {type}?</DialogTitle>
        <DialogActions>
          <Button
            onClick={handleCloseDialogClick}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteClick}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteButton;

DeleteButton.propTypes = {
  handleDeleteClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
