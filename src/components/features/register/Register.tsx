import { Button, Input, message, Modal } from 'antd';
import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { UserRegisterInfo } from 'constants/domain';
import { userService } from 'services';
import { showRegisterModal } from 'redux/actions/modal.action';
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

  onChangeUsername = (e: React.SyntheticEvent) => {
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        username: (e.target as HTMLInputElement).value,
      },
    }));
  };

  onChangeDisplayName = (e: React.SyntheticEvent) => {
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        displayname: (e.target as HTMLInputElement).value,
      },
    }));
  };

  onChangeEmail = (e: React.SyntheticEvent) => {
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        email: (e.target as HTMLInputElement).value,
      },
    }));
  };

  onChangePassword = (e: React.SyntheticEvent) => {
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        password: (e.target as HTMLInputElement).value,
      },
    }));
  };

  handleRegisterUser = () => {
    try {
      userService.signup(this.state.infoUserRegister).then((response) => {
        if (response === null) {
          this.setState({ errorMessage: 'Email already exists' });
          return;
        }
        this.success();
        this.props.closeRegisterModal();
        this.setState(initialState);
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
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