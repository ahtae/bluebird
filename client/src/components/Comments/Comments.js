import React from 'react';
import Comment from './Comment/Comment';

const Comments = ({ comments }) => {
  return comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));
};

export default Comments;
