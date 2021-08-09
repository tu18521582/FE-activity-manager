import { Avatar, Button, Dropdown, Menu } from 'antd';
import {
  CaretDownOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { Component } from 'react';
import { UserInfo } from 'constants/domain';
import logo from 'assets/images/logo-image.jpg';
import './dashboard-header.scss';

interface DashboardProps {
  handleLogout: VoidFunction;
  onHandleBackToLandingPageProps: VoidFunction;
  userInfo: UserInfo;
}

class Dashboard extends Component<DashboardProps> {
  render() {
    return (
      <div className='dashboard-header'>
        <div className='dashboard-header__menu-area'>
          <div className='dashboard-header__menu-area__item'>
            <img
              className='dashboard-header__menu-area__item__logo'
              src={logo}
              alt='logo'
            />
            <span
              className='dashboard-header__menu-area__item__text 
            dashboard-header__menu-area__item__text--bold'
              onClick={this.props.onHandleBackToLandingPageProps}
            >
              ActivitiesManager
            </span>
          </div>
          <div
            className='dashboard-header__menu-area__item
           dashboard-header__menu-area__item--width-decrease'
          >
            <span className='dashboard-header__menu-area__item__text'>
              Activities
            </span>
          </div>
          <div
            className='dashboard-header__menu-area__item 
          dashboard-header__menu-area__item--width-decrease'
          >
            <Button
              className='dashboard-header__menu-area__item__btn-create'
              type='primary'
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
                    onClick={this.props.handleLogout}
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
                {this.props.userInfo?.displayname}
              </span>
              <CaretDownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default Dashboard;
