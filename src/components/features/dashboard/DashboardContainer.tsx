import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { UserInfo } from 'constants/domain';
import history from 'helper/history';
import { setUserInfo } from 'redux/actions/login.action';
import Dashboard from './Dashboard';
import withLogin, { withLoginProps } from '../../common/withLogin';
interface DashboardContainerProps
  extends RouteComponentProps<{}>,
    withLoginProps {}

class DashboardContainer extends Component<DashboardContainerProps> {
  onHandleBackToLandingPage = () => {
    history.push('/');
  };

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

const HocComponent = withLogin(DashboardContainer);
export default connect(mapStateToProps, mapDispatchToProps)(HocComponent);
