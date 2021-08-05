import React from 'react';
import { UserInfo } from 'constants/domain';
import { connect } from 'react-redux';
import { showLoginModal } from 'redux/actions/modal.action';
import Landing from './Landing';

interface LandingContainerProps {
  handleShowLoginModal: VoidFunction;
  userInfo: UserInfo;
}

const LandingContainer = (props: LandingContainerProps) => {
  const { handleShowLoginModal } = props;
  return (
    <>
      <Landing
        handleShowLoginModal={handleShowLoginModal}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
