import { Button, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { userService } from "services";
import "./login-page.scss";

const LoginPageContainer = (props: any) => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    isHiddenErrorMessage: true,
  });

  const handleCancel = () => {
    props.handleCancel(false);
  };

  const onChangeEmail = (e: any) => {
    setAccount({
      ...account,
      email: e.target.value,
      isHiddenErrorMessage: true,
    });
  };

  const onChangePassword = (e: any) => {
    setAccount({
      ...account,
      password: e.target.value,
      isHiddenErrorMessage: true,
    });
  };

  const onHandleClick = () => {
    userService
      .login(account)
      .then((result) => {
        if (result == null) {
          setAccount({
            ...account,
            isHiddenErrorMessage: false,
          });
        } else {
          props.handleLogin(result.user);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="login-page">
      <Modal
        centered
        className="modal-login"
        title={<div className="title">Login to ManagerActivities</div>}
        width={350}
        visible={props.isModalVisibleProps}
        onCancel={handleCancel}
      >
        <Input
          placeholder="E-mail"
          className="email-input"
          onChange={onChangeEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          className="password-input"
          onChange={onChangePassword}
        />
        {account.isHiddenErrorMessage ? (
          ""
        ) : (
          <div className="error-message">Invalid email or password</div>
        )}

        <Button
          type="primary"
          className={
            account.email.length === 0 || account.password.length === 0
              ? "btn-login disabled"
              : "btn-login"
          }
          onClick={onHandleClick}
        >
          Login
        </Button>
      </Modal>
    </div>
  );
};

export default LoginPageContainer;
