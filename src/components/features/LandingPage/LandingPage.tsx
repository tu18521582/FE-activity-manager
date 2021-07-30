import './landing-page.scss';
import logo from "assets/images/logo-image.jpg";

const LandingPage = (props: any) => {
  return (
    <div className="landing-page">
      <div className="landing-page__content">
        <div className="landing-page__content__header">
          <img src={logo} alt="logo"/>
          <span>ActivitiesManager</span>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default LandingPage
