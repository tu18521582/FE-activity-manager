import withDashboard from 'components/common/withDashboard';
import { UserInfo } from 'constants/domain';
import React, { Component } from 'react';
import Profile from './Profile';

interface ProfileContainerProps {
  userInfo: UserInfo;
}
class ProfileContainer extends Component<ProfileContainerProps> {
  render() {
    return (
      <div>
        <Profile userInfo={this.props.userInfo} />
      </div>
    );
  }
}

export default withDashboard(ProfileContainer);
