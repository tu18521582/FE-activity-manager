import { UserInfo } from 'constants/domain';
import history from 'helper/history';
import React from 'react';

export interface withLoginProps {
  userInfo: UserInfo;
  handleLogoutProps: VoidFunction;
}
const withLogin = (WrapComponent: any) => {
  class HigherComponent extends React.Component<withLoginProps, null> {
    constructor(props: any) {
      super(props);
    }

    componentDidMount() {
      if (this.props.userInfo.email === '') {
        history.push('/');
      }
    }

    render() {
      return <WrapComponent {...this.props} />;
    }
  }
  return HigherComponent;
};

export default withLogin;
