import React from 'react';
import { UserInfo } from 'constants/domain';
import { connect } from 'react-redux';
import { showLoginModal } from 'redux/actions/modal.action';
import LandingPage from './Landing';
import Login from '../login/Login';

interface LandingPageProps {
  handleShowLoginModal: VoidFunction;
  userInfo: UserInfo;
}

const LandingContainer = (props: LandingPageProps) => {
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
  userInfo: state.login,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleShowLoginModal: () => dispatch(showLoginModal(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
