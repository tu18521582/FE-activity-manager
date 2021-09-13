import React, { Component } from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import {
  CaretDownOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { UserInfo } from 'constants/domain';
import logo from 'assets/images/logo-image.jpg';
import './dashboard.scss';

interface DashboardProps {
  onLogout: VoidFunction;
  onGoToLanding: VoidFunction;
  userInfo: UserInfo;
  onCreateActivity: VoidFunction;
  onGoToActivities: VoidFunction;
}

class Dashboard extends Component<DashboardProps> {
  render() {
    return (
      <div className='dashboard'>
        <div className='dashboard-header'>
          <div className='dashboard-header__menu-area'>
            <div className='dashboard-header__item'>
              <img className='dashboard-header__logo' src={logo} alt='logo' />
              <span
                className='dashboard-header__text 
          dashboard-header__text--bold'
                onClick={this.props.onGoToLanding}
              >
                ActivitiesManager
              </span>
            </div>
            <div
              className='dashboard-header__item
         dashboard-header__item--width-decrease'
            >
              <span
                className='dashboard-header__text'
                onClick={this.props.onGoToActivities}
              >
                Activities
              </span>
            </div>
            <div
              className='dashboard-header__item 
        dashboard-header__item--width-decrease'
            >
              <Button
                className='dashboard-header__btn-create'
                type='primary'
                onClick={this.props.onCreateActivity}
              >
                Create activity
              </Button>
            </div>
          </div>
          <div className='dashboard-header__dropdown-area'>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key='0'>
                    <UserOutlined />
                    <span className='ant-dropdown-menu-item__text'>
                      My profile
                    </span>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key='1'>
                    <LogoutOutlined />
                    <span
                      className='ant-dropdown-menu-item__text'
                      onClick={this.props.onLogout}
                    >
                      Logout
                    </span>
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
              placement='bottomRight'
              arrow
            >
              <a className='ant-dropdown-link' href='/#'>
                <Avatar icon={<UserOutlined />} />
                <span className='dashboard-header__dropdown-area__display-name'>
                  {this.props.userInfo?.displayName}
                </span>
                <CaretDownOutlined />
              </a>
            </Dropdown>
          </div>
        </div>
        <div className='dashboard-content'>{this.props.children}</div>
      </div>
    );
  }
}

export default Dashboard;
