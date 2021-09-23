import { Avatar, Card, Col, Row, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import './profile.scss';
import { InfoCircleFilled, ContactsOutlined } from '@ant-design/icons';
import { ActivityInfo, UserInfo } from 'constants/domain';

interface ProfileProps {
  userInfo: UserInfo;
  activitiesHost: Array<ActivityInfo>;
  activitiesAttend: Array<ActivityInfo>;
  // allRelatedActivityToLoggedUser: ActivityInfo;
}
class Profile extends Component<ProfileProps> {
  render() {
    console.log('activitiesHost', this.props.activitiesHost);
    console.log('activitiesAttend', this.props.activitiesAttend);

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
              <p className='profile-page__number-activity'>
                {this.props.activitiesHost?.length}
              </p>
              <p className='profile-page__type-activity'>Hosting</p>
            </div>
            <div className='profile-page__quantity-activity__item'>
              <p className='profile-page__number-activity'>
                {this.props.activitiesAttend?.length}
              </p>
              <p className='profile-page__type-activity'>Joining</p>
            </div>
          </div>
        </div>
        <div className='profile-page__information-tabs'>
          <Tabs defaultActiveKey='2'>
            <Tabs.TabPane
              tab={
                <span>
                  <InfoCircleFilled />
                  Information
                </span>
              }
              key='1'
            >
              <div>
                Displayname: <p>{this.props.userInfo.displayName}</p>
                Username: <p>{this.props.userInfo.username}</p>
                Email: <p>{this.props.userInfo.email}</p>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  <ContactsOutlined />
                  Activities Future
                </span>
              }
              key='2'
            >
              <div className='site-card-wrapper'>
                <Card title='Card title' bordered={false}>
                  Card content
                </Card>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Profile;
