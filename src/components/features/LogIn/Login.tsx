import { Button, Input, Modal } from 'antd';
import cx from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserInfo } from 'constants/domain';
import history from 'helper/history';
import { userService } from 'services';
import { showLoginModal } from 'redux/actions/modal.action';
import { loginAction } from 'redux/actions';
import './login-page.scss';

interface LoginProps {
  isShowLoginModal: boolean;
  closeLoginModal: VoidFunction;
  setUserInfo: Function;
  userInfo: UserInfo;
}

interface LoginState {
  account: { email: String; password: String };
  errorMessage: String;
}

const initialState = {
  account: { email: '', password: '' },
  errorMessage: '',
};
class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = initialState;
  }

  onChangeEmail = (e: React.SyntheticEvent) => {
    this.setState((prevState) => ({
      account: {
        ...prevState.account,
        email: (e.target as HTMLInputElement).value,
      },
      errorMessage: '',
    }));
  };

  onChangePassword = (e: React.SyntheticEvent) => {
    this.setState((prevState) => ({
      account: {
        ...prevState.account,
        password: (e.target as HTMLInputElement).value,
      },
      errorMessage: '',
    }));
  };

  handleOnClick = () => {
    try {
      userService.login(this.state.account).then((result) => {
        if (result !== null) {
          //login success
          this.props.setUserInfo(result.user);
          this.setState(initialState, () => this.props.closeLoginModal());
          history.push('/');
        } else {
          this.setState({ errorMessage: 'Invalid username or password' });
        }
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  };
  render() {
    console.log(this.props.userInfo);
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
          onChange={this.onChangeEmail}
        />
        <Input
          type='password'
          placeholder='Password'
          className='modal-login__password-input'
          onChange={this.onChangePassword}
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
          onClick={this.handleOnClick}
        >
          Login
        </Button>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isShowLoginModal: state.modal.isShowLoginModal,
  userInfo: state.login,
});

const mapDispatchToProps = (dispatch: any) => ({
  setUserInfo: (userInfo: UserInfo) =>
    dispatch(loginAction.setUserInfo(userInfo)),
  closeLoginModal: () => dispatch(showLoginModal(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);