import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createAPost } from '../../redux/actions/data';
import Card from '@material-ui/core/Card';
import { useToasts } from 'react-toast-notifications';
import { clearErrors } from '../../redux/actionCreators/ui';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const styles = (theme) => ({
  ...theme.form,
});

const PostForm = ({ classes }) => {
  const UI = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [body, setBody] = useState('');
  const { loading, errors } = UI;
  const { addToast } = useToasts();

  const clearInputValues = () => {
    setBody('');
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();

    const newPost = {
      body,
    };

    dispatch(createAPost(newPost));

    if (Object.keys(errors).length) {
      addToast(`Unsuccessfully created a post! ${errors.error}`, {
        appearance: 'error',
        autoDismiss: true,
      });

      dispatch(clearErrors());
    } else {
      addToast('Successfully created a post!', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
    clearInputValues();
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  return (
    <Card className={classes.card}>
      <form noValidate onSubmit={handleSubmitClick} style={{ margin: 20 }}>
        <Typography variant="h2" style={{ fontSize: 18, marginBottom: 10 }}>
          Create a Post
        </Typography>
        <TextareaAutosize
          rowsMax={4}
          placeholder="This is a post."
          style={{
            marginBottom: 20,
            minHeight: 30,
            minWidth: 500,
            maxWidth: 500,
          }}
          name="body"
          id="body"
          rows={4}
          label="Body"
          variant="outlined"
          className={classes.textField}
          value={body}
          multiline="true"
          onChange={handleBodyChange}
        />
        <br />

        {errors.body ? (
          <Typography variant="body2" className={classes.customError}>
            {errors.body}
          </Typography>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          disableElevation
          type="submit"
        >
          Submit
          {loading ? (
            <CircularProgress size={20} className={classes.progress} />
          ) : null}
        </Button>
        <br />
      </form>
    </Card>
  );
};

export default withStyles(styles)(PostForm);

PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
