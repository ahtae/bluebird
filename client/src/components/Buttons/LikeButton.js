import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import PropTypes from 'prop-types';

const LikeButton = ({
  handleLikeClick,
  handleUnlikeClick,
  hasAlreadyLiked,
}) => {
  return (
    <Tooltip title="Like Post">
      <IconButton
        color="primary"
        onClick={hasAlreadyLiked ? handleUnlikeClick : handleLikeClick}
      >
        {hasAlreadyLiked ? (
          <FavoriteIcon color="primary" />
        ) : (
          <FavoriteBorder color="primary" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default LikeButton;

LikeButton.propTypes = {
  handleLikeClick: PropTypes.func.isRequired,
  handleUnlikeClick: PropTypes.func.isRequired,
  hasAlreadyLiked: PropTypes.bool.isRequired,
};
