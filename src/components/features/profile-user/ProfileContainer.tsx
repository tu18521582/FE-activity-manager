import withDashboard from 'components/common/withDashboard';
import React, { Component } from 'react';
import Profile from './Profile';

class ProfileContainer extends Component {
  render() {
    return (
      <div>
        <Profile />
      </div>
    );
  }
}

export default withDashboard(ProfileContainer);
