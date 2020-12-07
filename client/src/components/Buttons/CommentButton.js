import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';

const CommentButton = () => {
  return (
    <Tooltip title="Comments">
      <IconButton color="primary">
        <ChatIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default CommentButton;
