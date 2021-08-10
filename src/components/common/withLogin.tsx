import { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { UserInfo } from 'constants/domain';
import { setUserInfo } from '../../redux/actions/login.action';
export interface withLoginProps extends RouteComponentProps {
  userInfo: UserInfo;
  handleLogoutProps: VoidFunction;
}
const withLogin = (WrapComponent: any) => {
  class withLogin extends Component<withLoginProps> {
    componentDidMount() {
      if (this.props.userInfo.email === '') {
        this.props.history.push('/');
      }
    }

    componentDidUpdate() {
      if (this.props.userInfo.email === '') {
        this.props.history.push('/');
      }
    }

    render() {
      return <WrapComponent {...this.props} />;
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

  return connect(mapStateToProps, mapDispatchToProps)(withLogin);
};

export default withLogin;
