import React from 'react';
import cx from 'classnames';
import { Button, Input, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { UserRegisterInfo } from 'constants/domain';
import { userService } from 'services';
import { showRegisterModal } from 'redux/actions/modal.action';
import { connect } from 'react-redux';
import './register-page.scss';

type RegisterProps = {
  isShowRegisterModal: boolean;
  closeRegisterModal: VoidFunction;
};

type RegisterState = {
  infoUserRegister: UserRegisterInfo;
  errorMessage: String;
};

const initialState = {
  infoUserRegister: {
    username: '',
    displayname: '',
    email: '',
    password: '',
  },
  errorMessage: '',
};

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = initialState;
  }

  onChangeUsername = (e: any) => {
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        username: e.target.value,
      },
    }));
  };

  onChangeDisplayName = (e: any) => {
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        displayname: e.target.value,
      },
    }));
  };

  onChangeEmail = (e: any) => {
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        email: e.target.value,
      },
    }));
  };

  onChangePassword = (e: any) => {
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        password: e.target.value,
      },
    }));
  };

  handleRegisterUser = () => {
    userService.signup(this.state.infoUserRegister).then((response) => {
      if (response === null) {
        this.setState({ errorMessage: 'Email already exists' });
        return;
      }
      this.success();
      this.props.closeRegisterModal();
      this.setState(initialState);
    });
  };

  success = () => {
    message.success('Registered successfully', 1);
  };

  render() {
    return (
      <Modal
        destroyOnClose
        centered
        className='modal-register'
        title={
          <div className='modal-register__title'>
            Signup to ManagerActivities
          </div>
        }
        visible={this.props.isShowRegisterModal}
        onCancel={this.props.closeRegisterModal}
        footer={[]}
      >
        <Input placeholder='Username' onChange={this.onChangeUsername} />
        <Input placeholder='Display name' onChange={this.onChangeDisplayName} />
        <Input placeholder='Email' onChange={this.onChangeEmail} />
        <Input
          placeholder='Password'
          type='password'
          onChange={this.onChangePassword}
        />

        {this.state.errorMessage && (
          <div className='modal-register__error-message'>
            <p>Bad request</p>
            <span>{this.state.errorMessage}</span>
          </div>
        )}

        <Button
          type='primary'
          className={cx('modal-register__btn-register', {
            disabled:
              !this.state.infoUserRegister.username.length ||
              !this.state.infoUserRegister.displayname.length ||
              !this.state.infoUserRegister.email.length ||
              !this.state.infoUserRegister.password.length,
          })}
          onClick={this.handleRegisterUser}
        >
          Register
        </Button>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isShowRegisterModal: state.modal.isShowRegisterModal,
});

const mapDispatchToProps = (dispatch: any) => ({
  closeRegisterModal: () => dispatch(showRegisterModal(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
