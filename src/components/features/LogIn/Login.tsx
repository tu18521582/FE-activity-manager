import React, { Component } from 'react';
import { Button, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import cx from 'classnames';
import { UserInfo } from 'constants/domain';
import history from 'helper/history';
import { userService } from 'services';
import { connect } from 'react-redux';
import { showLoginModal } from 'redux/actions/modal.action';
import { loginAction } from 'redux/actions';
import './login-page.scss';

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
    return (
      <Modal
        centered
        width={350}
        className='modal-login'
        title={
          <div className='modal-login__title'>Login to ManagerActivities</div>
        }
        visible={this.props.isShowLoginModal}
        onCancel={this.props.closeLoginModal}
      >
        <Input
          placeholder='E-mail'
          className='modal-login__email-input'
          onChange={onChangeEmail}
        />
        <Input
          type='password'
          placeholder='Password'
          className='modal-login__password-input'
          onChange={onChangePassword}
        />
        {this.state.errorMessage && (
          <div className='modal-login__error-message'>
            {this.state.errorMessage}
          </div>
        )}
        <Button
          type='primary'
          className={cx('modal-login__btn-login', {
            disabled: !this.state.account.email || !this.state.account.password,
          })}
          onClick={handleOnClick}
        >
          Login
        </Button>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isShowLoginModal: state.modal.isShowLoginModal,
  getUserInfo: state.login,
});

const mapDispatchToProps = (dispatch: any) => ({
  setUserInfo: (userInfo: UserInfo) =>
    dispatch(loginAction.setUserInfo(userInfo)),
  closeLoginModal: () => dispatch(showLoginModal(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
