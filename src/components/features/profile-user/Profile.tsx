import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import './profile.scss';
import { UserInfo } from 'constants/domain';

interface ProfileProps {
  userInfo: UserInfo;
}
class Profile extends Component<ProfileProps> {
  render() {
    return (
      <div className='profile-page'>
        <div className='profile-page__quickview-section'>
          <div className='profile-page__avatar-username'>
            <Avatar icon={<UserOutlined className='profile-page__avatar' />} />
            <span className='profile-page__username'>
              {this.props.userInfo.displayName}
            </span>
          </div>
          <div className='profile-page__quantity-activity'>
            <div className='profile-page__quantity-activity__item'>
              <p className='profile-page__number-activity'>0</p>
              <p className='profile-page__type-activity'>Hosting</p>
            </div>
            <div className='profile-page__quantity-activity__item'>
              <p className='profile-page__number-activity'>0</p>
              <p className='profile-page__type-activity'>Joining</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
