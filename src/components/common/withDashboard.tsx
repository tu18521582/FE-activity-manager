import { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { UserInfo } from 'constants/domain';
import { setUserInfo } from '../../redux/actions/login.action';
import DashboardContainer from 'components/features/dashboard/DashboardContainer';

export interface withDashboardProps extends RouteComponentProps {
  userInfo: UserInfo;
  handleLogout: VoidFunction;
}
const withDashboard = (WrapComponent: any) => {
  class withDashboard extends Component<withDashboardProps> {
    render() {
      return (
        <>
          <DashboardContainer {...this.props}>
            <WrapComponent {...this.props} />
          </DashboardContainer>
        </>
      );
    }
  }

  const mapStateToProps = (state: any) => ({
    userInfo: state.login,
  });

  const mapDispatchToProps = (dispatch: any) => ({
    handleLogout: () =>
      dispatch(
        setUserInfo({
          username: '',
          displayName: '',
          id: '',
          email: '',
          password: '',
        })
      ),
  });

  return connect(mapStateToProps, mapDispatchToProps)(withDashboard);
};

export default withDashboard;
