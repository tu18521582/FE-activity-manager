import React, { Component } from 'react';
import withLogin, { withLoginProps } from '../../common/withLogin';
import Dashboard from './Dashboard';
interface DashboardContainerProps extends withLoginProps {
  handleLogoutProps: VoidFunction;
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
  render() {
    return (
      <Dashboard
        userInfo={this.props.userInfo}
        handleLogout={this.props.handleLogoutProps}
        onGoToLanding={this.handleGoToLanding}
        onCreateActivity={this.handleCreateActivity}
        onGoToActivities={this.handleGoToActivities}
      >
        {this.props.children}
      </Dashboard>
    );
  }
}
export default withLogin(DashboardContainer);
