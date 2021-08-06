import React from 'react';
import { connect } from 'react-redux';
import { UserInfo } from 'constants/domain';
import { showLoginModal, showRegisterModal } from 'redux/actions/modal.action';
import Landing from './Landing';

interface LandingContainerProps {
  handleShowLoginModal: VoidFunction;
  userInfo: UserInfo;
  handleShowRegisterModal: VoidFunction;
}

const LandingContainer = (props: LandingContainerProps) => {
  const { handleShowLoginModal, handleShowRegisterModal } = props;
  return (
    <>
      <Landing
        handleShowLoginModal={handleShowLoginModal}
        handleShowRegisterModal={handleShowRegisterModal}
        userInfo={props.userInfo}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userInfo: state.login,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleShowLoginModal: () => dispatch(showLoginModal(true)),
  handleShowRegisterModal: () => dispatch(showRegisterModal(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
