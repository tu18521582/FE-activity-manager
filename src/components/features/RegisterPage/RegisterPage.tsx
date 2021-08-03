import { Button, Input, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import './register-page.scss';
import React from 'react';
import { userService } from 'services';

type MyProps = any;
type MyState = {
  userInfo: {
    username: String;
    displayname: String;
    email: String;
    password: String;
  };
  isRegisterSuccess: Boolean;
};
export class RegisterPage extends React.Component<MyProps, MyState> {
  state: MyState = {
    userInfo: {
      username: '',
      displayname: '',
      email: '',
      password: '',
    },
    isRegisterSuccess: true,
  };

  render() {
    const onChangeUsername = (e: any) => {
      this.setState((state) => ({
        ...state,
        userInfo: {
          ...state.userInfo,
          username: e.target.value,
        },
      }));
    };

    const onChangeDisplayName = (e: any) => {
      this.setState((state) => ({
        ...state,
        userInfo: {
          ...state.userInfo,
          displayname: e.target.value,
        },
      }));
    };

    const onChangeEmail = (e: any) => {
      this.setState((state) => ({
        ...state,
        userInfo: {
          ...state.userInfo,
          email: e.target.value,
        },
        isRegisterSuccess: true,
      }));
    };

    const onChangePassword = (e: any) => {
      this.setState((state) => ({
        ...state,
        userInfo: {
          ...state.userInfo,
          password: e.target.value,
        },
      }));
    };

    const success = () => {
      message.success('Registered successfully', 1);
    };

    const onHandleClick = () => {
      userService.signup(this.state.userInfo).then((response) => {
        if (response === null) {
          //email is exist
          this.setState((state) => ({
            ...state,
            isRegisterSuccess: false,
          }));
          return;
        }
        this.setState(
          (state) => ({
            ...state,
            isRegisterSuccess: true,
          }),
          () => {
            this.props.handleRegisterSuccess(false);
            success();
          }
        );
      });
    };

    const handleCancleRegisterForm = () => {
      this.props.handleCancleRegisterForm(false);
    };

    const onSubmit = () => {};
    return (
      <div className='modal-register'>
        <Modal
          destroyOnClose
          centered
          className='modal-register'
          title={<div className='title'>Signup to ManagerActivities</div>}
          width={400}
          visible={this.props.isRegisterFormVisible}
          onCancel={handleCancleRegisterForm}
          footer={[]}
        >
          <Input placeholder='Username' onChange={onChangeUsername} />
          <Input placeholder='Display name' onChange={onChangeDisplayName} />
          <Input placeholder='Email' onChange={onChangeEmail} />
          <Input
            placeholder='Password'
            type='password'
            onChange={onChangePassword}
          />
          {this.state.isRegisterSuccess ? (
            ''
          ) : (
            <div className='error-message'>
              <p>Bad request</p>
              <span>Email already exists</span>
            </div>
          )}
          <Button
            type='primary'
            className={
              this.state.userInfo.username.length === 0 ||
              this.state.userInfo.displayname.length === 0 ||
              this.state.userInfo.email.length === 0 ||
              this.state.userInfo.password.length === 0
                ? 'btn-register disabled'
                : 'btn-register'
            }
            onSubmit={onSubmit}
            onClick={onHandleClick}
          >
            Register
          </Button>
        </Modal>
      </div>
    );
  }
}

export default RegisterPage;
