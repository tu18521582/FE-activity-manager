import React from 'react';
import { Button, Input, message, Modal } from 'antd';
import cx from 'classnames';
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
    displayName: '',
    username: '',
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

  onChangeUsername = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        username: value,
      },
    }));
  };

  onChangeDisplayName = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        displayName: value,
      },
    }));
  };

  onChangeEmail = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        email: value,
      },
    }));
  };

  onChangePassword = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState((prevState) => ({
      infoUserRegister: {
        ...prevState.infoUserRegister,
        password: value,
      },
    }));
  };

  onCancelModal = () => {
    this.setState(initialState, () => this.props.closeRegisterModal());
  };

  handleRegisterUser = () => {
    try {
      userService
        .signup(this.state.infoUserRegister)
        .then(() => {
          this.success();
          this.onCancelModal();
        })
        .catch((error: any) => {
          if (error.response?.data.status === 500) {
            this.setState({ errorMessage: 'Email already exists' });
            return;
          } else {
            this.setState({ errorMessage: 'Can not connect to server' });
            return;
          }
        });
    } catch (err: any) {
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
        onCancel={this.onCancelModal}
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
              !this.state.infoUserRegister.displayName.length ||
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
