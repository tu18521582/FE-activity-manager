import React from 'react';
import logo from 'assets/images/logo.svg';
import './welcome-react.scss';

const WelcomeReact = () => {
  return (
    <div className="welcome-react">
      <header className="welcome-react-header">
        <img src={logo} className="react-logo" alt="logo" />
        <a
          className="react-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default WelcomeReact;
