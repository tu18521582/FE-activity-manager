import React, { Component } from 'react';
import withLogin, { withLoginProps } from '../../common/withLogin';
import Dashboard from './Dashboard';
interface DashboardContainerProps extends withLoginProps {}
class DashboardContainer extends Component<DashboardContainerProps> {
  onHandleBackToLandingPage = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <Dashboard
        userInfo={this.props.userInfo}
        onHandleBackToLandingPageProps={this.onHandleBackToLandingPage}
        handleLogout={this.props.handleLogoutProps}
      />
    );
  }
}
export default withLogin(DashboardContainer);
