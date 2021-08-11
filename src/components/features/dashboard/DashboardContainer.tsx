import React, { Component } from 'react';
import withLogin, { withLoginProps } from '../../common/withLogin';
import Dashboard from './Dashboard';
interface DashboardContainerProps extends withLoginProps {}
class DashboardContainer extends Component<DashboardContainerProps> {
  onHandleBackToLandingPage = () => {
    this.props.history.push('/');
  };

  onHandleToCreateActivity = () => {
    this.props.history.push('/create-activity');
  };

  onHandleToActivities = () => {
    this.props.history.push('/activities');
  };
  render() {
    return (
      <Dashboard
        userInfo={this.props.userInfo}
        onHandleBackToLandingPageProps={this.onHandleBackToLandingPage}
        handleLogout={this.props.handleLogoutProps}
        onHandleToCreateActivity={this.onHandleToCreateActivity}
        onHandleToActivities={this.onHandleToActivities}
      />
    );
  }
}
export default withLogin(DashboardContainer);
