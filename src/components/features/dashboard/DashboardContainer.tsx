import React, { Component } from 'react';
import withLogin, { withLoginProps } from '../../common/withLogin';
import Dashboard from './Dashboard';
interface DashboardContainerProps extends withLoginProps {
  handleLogout: VoidFunction;
}
class DashboardContainer extends Component<DashboardContainerProps> {
  handleGoToLanding = () => {
    this.props.history.push('/');
  };

  handleCreateActivity = () => {
    this.props.history.push('/create-activity');
  };

  handleGoToActivities = () => {
    this.props.history.push('/activities');
  };

  handleGoToProfile = () => {
    this.props.history.push(`/profile/${this.props.userInfo.id}`);
  };
  render() {
    return (
      <Dashboard
        userInfo={this.props.userInfo}
        onLogout={this.props.handleLogout}
        onGoToLanding={this.handleGoToLanding}
        onCreateActivity={this.handleCreateActivity}
        onGoToActivities={this.handleGoToActivities}
        onGoToProfile={this.handleGoToProfile}
      >
        {this.props.children}
      </Dashboard>
    );
  }
}
export default withLogin(DashboardContainer);
