import React, { Component } from 'react';
import { Button, Card, Tooltip, Avatar } from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  EnvironmentFilled,
} from '@ant-design/icons';
import { ActivitySummary, UserInfo } from 'constants/domain';
import history from 'helper/history';
import './activity-list.scss';

interface ActivityItemProps {
  activityItemData: ActivitySummary;
  userInfo: UserInfo;
}

class ActivityItem extends Component<ActivityItemProps> {
  onHandleViewActivity = () => {
    history.push(`/activities/${this.props.activityItemData.id}`);
  };
  render() {
    return (
      <div className='activity-item'>
        <label className='activity-item__label-date'>
          {this.props.activityItemData.date}
        </label>
        <Card className='activity-item__card-activity'>
          <div className='activity-item__header-activity'>
            <Avatar size={70} icon={<UserOutlined />} />
            <div className='activity-item__info-header'>
              <p className='activity-item__info-header__name-activity'>
                {this.props.activityItemData.title}
              </p>
              <p className='activity-item__info-header__info-host'>
                Hosted by{' '}
                <span className='activity-item__info-header__person-host'>
                  {this.props.activityItemData.host.displayName}
                </span>
              </p>
              {this.props.userInfo.id ===
              this.props.activityItemData.host.id ? (
                <p className='activity-item__info-header__label-host'>
                  You are hosting this activity
                </p>
              ) : (
                ''
              )}
              {this.props.activityItemData.userAttend?.some(
                (user) => user.id === this.props.userInfo.id
              ) ? (
                <p className='activity-item__info-header__label-joiner'>
                  You are going to this activity
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className='activity-item__time-place-activity'>
            <div className='activity-item__time-place-activity__item'>
              <ClockCircleOutlined />
              <span className='activity-item__time-place-activity__text'>
                {this.props.activityItemData.time}
              </span>
            </div>
            <div className='activity-item__time-place-activity__item'>
              <EnvironmentFilled />
              <span className='activity-item__time-place-activity__text'>
                {this.props.activityItemData.venue},
                {this.props.activityItemData.city}
              </span>
            </div>
          </div>
          <div className='activity-item__followers-info'>
            <Tooltip title={this.props.activityItemData.host.displayName}>
              <Avatar
                className='activity-item__followers-info__item'
                icon={<UserOutlined />}
              />
            </Tooltip>
            {this.props.activityItemData.userAttend?.map((user) => (
              <Tooltip title={user.displayName} key={user.id}>
                <Avatar
                  className='activity-item__followers-info__item'
                  icon={<UserOutlined />}
                />
              </Tooltip>
            ))}
          </div>
          <div className='activity-item__footer'>
            <div className='activity-item__footer__description'>
              {this.props.activityItemData.description}
            </div>
            <Button
              className='activity-item__footer__btn-view'
              type='primary'
              onClick={this.onHandleViewActivity}
            >
              View
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default ActivityItem;
