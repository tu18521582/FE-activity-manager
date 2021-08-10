import { Button } from 'antd';
import { UserInfo } from 'constants/domain';
import logo from 'assets/images/logo-image.jpg';
import Login from '../log-in/Login';
import Register from '../register/Register';
import './landing-page.scss';

interface LandingProps {
  handleShowLoginModal: VoidFunction;
  handleShowRegisterModal: VoidFunction;
  onHandleGoToActivityProps: VoidFunction;
  userInfo: UserInfo;
}

const Landing = (props: LandingProps) => {
  return (
    <div className='landing-page'>
      <div className='landing-page__content'>
        <div className='landing-page__content__header'>
          <img
            className='landing-page__content__header__logo'
            src={logo}
            alt='logo'
          />
          <span>ActivitiesManager</span>
        </div>
        {!props.userInfo?.email ? (
          <div className='landing-page__content__body'>
            <p className='landing-page__content__body__welcome-text'>
              Welcome to ActivitiesManager
            </p>
            <Button
              className='landing-page__content__body__btn-login'
              onClick={props.handleShowLoginModal}
            >
              Login
            </Button>
            <Button
              className='landing-page__content__body__btn-register'
              onClick={props.handleShowRegisterModal}
            >
              Register
            </Button>
          </div>
        ) : (
          <div className='landing-page__welcome'>
            <p className='landing-page__welcome__text'>{`Welcome back ${props.userInfo.displayname}`}</p>
            <Button
              className='landing-page__welcome__btn-redirect-activity'
              onClick={props.onHandleGoToActivityProps}
            >
              Go to activities!
            </Button>
          </div>
        )}
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default Landing;
