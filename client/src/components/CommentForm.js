import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { createAComment } from '../redux/actions/data';
import Card from '@material-ui/core/Card';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme.form,
  card: {
    marginTop: 30,
    marginBottom: 20,
    padding: 10,
  },
  commentForm: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 30,
    marginBottom: 20,
  },
});

const CommentForm = ({ classes, postId }) => {
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const { errors } = ui;

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    dispatch(createAComment(postId, { body }));
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
