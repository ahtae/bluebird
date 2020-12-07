import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Notification from './Notification/Notification';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = (theme) => ({
  heading: { fontSize: '20px', textAlign: 'center', padding: '20px' },
  filterSelection: { paddingTop: '20px', paddingBottom: '20px' },
  container: {
    margin: '80px auto 0 auto',
    maxWidth: '1200px',
    width: '70%',
  },
});

const Notifications = ({ classes }) => {
  const [filter, setFilter] = useState('All');
  const notifications = useSelector((state) =>
    filter === 'Unread'
      ? state.user.credentials.notifications.filter(
          (notification) => notification.isRead === false
        )
      : filter === 'Read'
      ? state.user.credentials.notifications.filter(
          (notification) => notification.isRead === true
        )
      : state.user.credentials.notifications
  );

  const displayNotifications = !notifications.length ? (
    <Typography variant="h2" className={classes.heading}>
      None so far! :)
    </Typography>
  ) : (
    notifications.map((notification) => (
      <Notification key={notification.id} notification={notification} />
    ))
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h2" className={classes.heading}>
        Notifications
      </Typography>
      <FormControl variant="filled" className={classes.filterSelection}>
        <InputLabel htmlFor="filled-age-native-simple">Filter</InputLabel>
        <Select
          native
          value={filter}
          onChange={handleFilterChange}
          inputProps={{
            name: 'filter',
            id: 'filled-age-native-simple',
          }}
        >
          <option value={'All'}>All</option>
          <option value={'Unread'}>Unread</option>
          <option value={'Read'}>Read</option>
        </Select>
      </FormControl>
      <Paper className={classes.paper}>{displayNotifications}</Paper>
    </div>
  );
};

export default withStyles(styles)(Notifications);

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};
