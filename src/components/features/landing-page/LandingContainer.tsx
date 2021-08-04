import { UserInfo } from 'constants/domain';
import React from 'react';
import { connect } from 'react-redux';
import { showLoginModal } from 'redux/actions/login.action';
import Login from '../login/Login';
import LandingPage from './Landing';

interface LandingPageProps {
  handleShowLoginModal: VoidFunction;
  userInfo: UserInfo;
}

const LandingPageContainer = (props: LandingPageProps) => {
  const { handleShowLoginModal } = props;

  return (
    <>
      <LandingPage
        handleShowLoginModal={handleShowLoginModal}
        userInfo={props.userInfo}
      />
      <Login />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userInfo: state.userLoginInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleShowLoginModal: () => dispatch(showLoginModal(true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPageContainer);
