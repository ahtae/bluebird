import React from 'react';
import Comment from './comment/Comment';
import PropTypes from 'prop-types';

const Comments = ({ comments }) => {
  return comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));
};

export default Comments;

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
};
