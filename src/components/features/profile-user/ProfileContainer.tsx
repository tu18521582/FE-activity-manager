import withDashboard from 'components/common/withDashboard';
import { ActivityInfo, ActivitySummary, UserInfo } from 'constants/domain';
import React, { Component } from 'react';
import { activityService, userService } from 'services';
import Profile from './Profile';

interface ProfileContainerProps {
  userInfo: UserInfo;
}

interface ProfileContainerState {
  activitiesHost: Array<ActivityInfo>;
  activitiesAttend: Array<ActivityInfo>;
  allRelatedActivityToLoggedUser: Array<ActivityInfo>;
}

const initialState = {
  activitiesHost: [],
  activitiesAttend: [],
  allRelatedActivityToLoggedUser: [],
};
class ProfileContainer extends Component<
  ProfileContainerProps,
  ProfileContainerState
> {
  constructor(props: ProfileContainerProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    userService
      .getActivitiesHost(this.props.userInfo.id)
      .then((result: any) => {
        this.setState({
          activitiesHost: result,
        });
      });
    userService
      .getActivitiesAttend(this.props.userInfo.id)
      .then((result: any) => {
        this.setState({
          activitiesAttend: result,
        });
      });
  }
  render() {
    return (
      <div>
        <Profile
          userInfo={this.props.userInfo}
          activitiesHost={this.state.activitiesHost}
          activitiesAttend={this.state.activitiesAttend}
        />
      </div>
    );
  }
}

export default withDashboard(ProfileContainer);
