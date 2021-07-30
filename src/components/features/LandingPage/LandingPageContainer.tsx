import { Button } from "antd";
import React, { Fragment, useState } from "react";
import LoginPageContainer from "../LogIn/LoginPageContainer";
import LandingPage from "./LandingPage";
// username: 'user01', displayname: 'User 01', email: 'user01@mail.com', password: 'Kms@2021'
// interface User {
//   username: String;
//   displayname: String;
//   email: String;
//   password: String;
// }

const LandingPageContainer = (props: any) => {
  const [state, setState] = useState({
    isModalVisible: false,
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

  const onHandleClick = () => {
    alert("This feature is updating");
  };
  return (
    <Fragment>
      <LandingPage>
        {Object.keys(state.userLogIn).length === 0 ? (
          <div className="landing-page__content__body">
            <p>Welcome to ActivitiesManager</p>
            <Button onClick={showModal}>Login</Button>
            <Button>Register</Button>
          </div>
        ) : (
          <div className="landing-page__welcome">
            <p>{`Welcome back ${state.userLogIn.displayname}`}</p>
            <Button onClick={onHandleClick}>Go to activities!</Button>
          </div>
        )}
      </LandingPage>
      <LoginPageContainer
        isModalVisibleProps={state.isModalVisible}
        handleCancel={handleCancel}
        handleLogin={handleLogin}
      />
    </Fragment>
  );
};

export default LandingPageContainer;
