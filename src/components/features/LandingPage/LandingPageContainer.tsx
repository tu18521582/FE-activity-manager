import { Button } from "antd";
import React, { Fragment, useState } from "react";
import LoginPageContainer from "../LogIn/LoginPageContainer";
import LandingPage from "./LandingPage";

const LandingPageContainer = (props: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = (isModalVisible: boolean) => {
    setIsModalVisible(isModalVisible);
  };

  return (
    <Fragment>
      <LandingPage>
        <div className="landing-page__content__body">
          <p>Welcome to ActivitiesManager</p>
          <Button onClick={showModal}>Login</Button>
          <Button>Register</Button>
        </div>
      </LandingPage>
      <LoginPageContainer
        isModalVisibleProps={isModalVisible}
        handleCancel={handleCancel}
      />
    </Fragment>
  );
};

export default LandingPageContainer;
