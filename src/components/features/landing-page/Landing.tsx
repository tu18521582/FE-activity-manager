import { Button } from 'antd';
import logo from 'assets/images/logo-image.jpg';
import './landing-page.scss';

const LandingPage = (props: any) => {
  return (
    <div className='landing-page'>
      <div className='landing-page__content'>
        <div className='landing-page__content__header'>
          <img src={logo} alt='logo' />
          <span>ActivitiesManager</span>
        </div>
        {props.userInfo.email === '' ? (
          <div className='landing-page__content__body'>
            <p>Welcome to ActivitiesManager</p>
            <Button onClick={props.handleShowLoginModal}>Login</Button>
            <Button>Register</Button>
          </div>
        ) : (
          <div className='landing-page__welcome'>
            <p>{`Welcome back ${props.userInfo.displayname}`}</p>
            <Button>Go to activities!</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
