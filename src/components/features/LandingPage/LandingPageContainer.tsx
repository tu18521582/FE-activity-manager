import { Button } from 'antd';
import React, { Fragment, useState } from 'react';
import LoginPageContainer from '../LogIn/LoginPageContainer';
import RegisterPage from '../RegisterPage/RegisterPage';
import LandingPage from './LandingPage';

const LandingPageContainer = (props: any) => {
  const [state, setState] = useState({
    isModalVisible: false,
    isRegisterFormVisible: false,
    userLogIn: {} as any,
  });

  const showModal = () => {
    setState({
      ...state,
      isModalVisible: true,
    });
  };
  const handleCancel = (isModalVisible: boolean) => {
    setState({
      ...state,
      isModalVisible: isModalVisible,
    });
  };

  const handleLogin = (user: Object) => {
    setState({
      ...state,
      isModalVisible: false,
      userLogIn: user,
    });
  };

  const handleCancleRegisterForm = (val: any) => {
    setState({
      ...state,
      isRegisterFormVisible: val,
    });
  };

  const showRegisterForm = () => {
    setState({
      ...state,
      isRegisterFormVisible: true,
    });
  };

  const handleRegisterSuccess = (isSuccess: any) => {
    setState({
      ...state,
      isRegisterFormVisible: isSuccess,
    });
  };

  return (
    <Fragment>
      <LandingPage>
        {Object.keys(state.userLogIn).length === 0 ? (
          <div className='landing-page__content__body'>
            <p>Welcome to ActivitiesManager</p>
            <Button onClick={showModal}>Login</Button>
            <Button onClick={showRegisterForm}>Register</Button>
          </div>
        ) : (
          <div className='landing-page__welcome'>
            <p>{`Welcome back ${state.userLogIn.displayname}`}</p>
            <Button>Go to activities!</Button>
          </div>
        )}
      </LandingPage>
      <LoginPageContainer
        isModalVisibleProps={state.isModalVisible}
        handleCancel={handleCancel}
        handleLogin={handleLogin}
      />
      <RegisterPage
        isRegisterFormVisible={state.isRegisterFormVisible}
        handleCancleRegisterForm={handleCancleRegisterForm}
        handleRegisterSuccess={handleRegisterSuccess}
      />
    </Fragment>
  );
};

export default LandingPageContainer;
