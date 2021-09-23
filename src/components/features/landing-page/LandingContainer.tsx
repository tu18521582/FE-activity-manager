import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { UserInfo } from 'constants/domain';
import history from 'helper/history';
import { showLoginModal, showRegisterModal } from 'redux/actions/modal.action';
import Landing from './Landing';

interface LandingContainerProps {
  handleShowLoginModal: VoidFunction;
  handleShowRegisterModal: VoidFunction;
  userInfo: UserInfo;
}

const LandingContainer = (props: LandingContainerProps) => {
  const { handleShowLoginModal, handleShowRegisterModal } = props;
  const onHandleGoToActivity = useCallback(() => {
    history.push('/activities');
  }, []);
  return (
    <>
      <Landing
        handleShowLoginModal={handleShowLoginModal}
        handleShowRegisterModal={handleShowRegisterModal}
        userInfo={props.userInfo}
        onHandleGoToActivity={onHandleGoToActivity}
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
