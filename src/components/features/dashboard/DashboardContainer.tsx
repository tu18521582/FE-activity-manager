import { connect } from 'react-redux';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UserInfo } from 'constants/domain';
import history from 'helper/history';
import { setUserInfo } from 'redux/actions/login.action';
import Dashboard from './Dashboard';

interface DashboardContainerProps extends RouteComponentProps<{}> {
  userInfo: UserInfo;
  handleLogoutProps: VoidFunction;
}

class DashboardContainer extends Component<DashboardContainerProps> {
  onHandleBackToLandingPage = () => {
    history.push('/');
  };

  componentDidMount() {
    if (this.props.userInfo.email === '') {
      history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.props.userInfo.email === '') {
      history.push('/');
    }
  }
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

const mapStateToProps = (state: any) => ({
  userInfo: state.login,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleLogoutProps: () =>
    dispatch(
      setUserInfo({
        username: '',
        displayname: '',
        id: '',
        email: '',
        password: '',
      })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
