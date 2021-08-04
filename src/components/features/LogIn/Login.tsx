import { Button, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { userService } from 'services';
import './login-page.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserInfo } from 'constants/domain';
import { loginAction } from 'redux/actions';
import cx from 'classnames';
import { showLoginModal } from 'redux/actions/login.action';
import history from 'helper/history';

interface LoginProps {
  isShowLoginModal: boolean;
  closeLoginModal: VoidFunction;
  setUserInfo: Function;
  getUserInfo: UserInfo;
}

interface LoginState {
  account: { email: String; password: String };
  errorMessage: String;
}

const initialState = {
  account: { email: '', password: '' },
  errorMessage: '',
};
export class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    const className = cx('btn-login', {
      disabled: !this.state.account.email || !this.state.account.password,
    });

    const onChangeEmail = (e: any) => {
      this.setState((prevState) => ({
        ...prevState,
        account: {
          ...prevState.account,
          email: e.target.value,
        },
        errorMessage: '',
      }));
    };

    const onChangePassword = (e: any) => {
      this.setState((prevState) => ({
        ...prevState,
        account: {
          ...prevState.account,
          password: e.target.value,
        },
        errorMessage: '',
      }));
    };

    const handleOnClick = () => {
      userService
        .login(this.state.account)
        .then((result) => {
          if (result !== null) {
            //login success
            this.props.setUserInfo(result.user as UserInfo);
            history.push('/');
          } else {
            this.setState(() => ({
              errorMessage: 'Invalid username or password',
            }));
          }
        })
        .catch((err) => {
          throw err;
        });
    };
    console.log('state: ', this.props.getUserInfo);

    return (
      <div className='login-page'>
        <Modal
          centered
          className='modal-login'
          title={<div className='title'>Login to ManagerActivities</div>}
          visible={this.props.isShowLoginModal}
          onCancel={this.props.closeLoginModal}
        >
          <Input
            placeholder='E-mail'
            className='email-input'
            onChange={onChangeEmail}
          />
          <Input
            type='password'
            placeholder='Password'
            className='password-input'
            onChange={onChangePassword}
          />
          {this.state.errorMessage && (
            <div className='error-message'>{this.state.errorMessage}</div>
          )}
          <Button type='primary' className={className} onClick={handleOnClick}>
            Login
          </Button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isShowLoginModal: state.isShowLoginModal,
  getUserInfo: state.userLoginInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  setUserInfo: (userInfo: UserInfo) =>
    dispatch(loginAction.setUserInfo(userInfo)),
  closeLoginModal: () => dispatch(showLoginModal(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
