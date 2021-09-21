import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './profile.scss';
import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return (
      <div className='profile-page'>
        <div className='profile-page__quickview-section'>
          <div className='profile-page__avatar-username'>
            <Avatar icon={<UserOutlined className='profile-page__avatar' />} />
            <span className='profile-page__username'>Name user</span>
          </div>
          <div className='profile-page__quantity-activity'>
            <div className='profile-page__quantity-acitvity__item'>
              <p className='profile-page__number-activity'>0</p>
              <p className='profile-page__type-activity'>Activity hosted</p>
            </div>
            <div className='profile-page__quantity-acitvity__item'>
              <p className='profile-page__number-activity'>0</p>
              <p className='profile-page__type-activity'>Activity attended</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
