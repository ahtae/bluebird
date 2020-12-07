import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { createAComment } from '../redux/actions/data';
import Card from '@material-ui/core/Card';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import { useToasts } from 'react-toast-notifications';
import { clearErrors } from '../redux/actionCreators/ui';

const styles = (theme) => ({
  ...theme.form,
});

const CommentForm = ({ classes, postId }) => {
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const { errors } = ui;
  const { addToast } = useToasts();

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    dispatch(createAComment(postId, { body }));

    if (Object.keys(errors).length) {
      addToast(`Unsuccessfully created a comment! ${errors.error}`, {
        appearance: 'error',
        autoDismiss: true,
      });

      dispatch(clearErrors());
    } else {
      addToast('Successfully created a comment!', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  };

  return (
    <Card className={classes.card}>
      <form noValidate onSubmit={handleCommentSubmit}>
        <Typography variant="h2" style={{ fontSize: 18, marginBottom: 10 }}>
          Leave a Comment
        </Typography>
        <TextareaAutosize
          rowsMax={4}
          placeholder="This is a comment."
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
        {errors.body ? (
          <Typography variant="body2" className={classes.customError}>
            {errors.body}
          </Typography>
        ) : null}
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default withStyles(styles)(CommentForm);

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};
