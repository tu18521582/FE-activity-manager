import { Button } from 'antd';
import logo from 'assets/images/logo-image.jpg';
import { UserInfo } from 'constants/domain';
import Login from '../login/Login';
import Register from '../register/Register';
import './landing-page.scss';

interface LandingProps {
  handleShowLoginModal: VoidFunction;
  handleShowRegisterModal: VoidFunction;
  userInfo: UserInfo;
}

const Landing = (props: LandingProps) => {
  return (
    <div className='landing-page'>
      <div className='landing-page__content'>
        <div className='landing-page__content__header'>
          <img src={logo} alt='logo' />
          <span>ActivitiesManager</span>
        </div>
        {!props.userInfo?.email ? (
          <div className='landing-page__content__body'>
            <p>Welcome to ActivitiesManager</p>
            <Button onClick={props.handleShowLoginModal}>Login</Button>
            <Button onClick={props.handleShowRegisterModal}>Register</Button>
          </div>
        ) : (
          <div className='landing-page__welcome'>
            <p>{`Welcome back ${props.userInfo.displayname}`}</p>
            <Button>Go to activities!</Button>
          </div>
        )}
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default Landing;
