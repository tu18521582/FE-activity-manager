import React, { Component } from 'react';
import { Button, Card } from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  EnvironmentFilled,
} from '@ant-design/icons';
import './activity-list.scss';
import Avatar from 'antd/lib/avatar/avatar';
class ActivityItem extends Component {
  render() {
    return (
      <>
        <div className='activity-item'>
          <label className='activity-item__label-date'>Monday 19th July</label>
          <Card className='activity-item__card-activity'>
            <div className='activity-item__header-activity'>
              <Avatar size={70} icon={<UserOutlined />} />
              <div className='activity-item__info-header'>
                <p className='activity-item__info-header__name-activity'>
                  Name activity
                </p>
                <p className='activity-item__info-header__info-host'>
                  Hosted by{' '}
                  <span className='activity-item__info-header__person-host'>
                    Tom
                  </span>
                </p>
              </div>
            </div>
            <div className='activity-item__time-place-activity'>
              <div className='activity-item__time-place-activity__item'>
                <ClockCircleOutlined />
                <span className='activity-item__time-place-activity__text'>
                  9:17 PM
                </span>
              </div>
              <div className='activity-item__time-place-activity__item'>
                <EnvironmentFilled />
                <span className='activity-item__time-place-activity__text'>
                  Jamies Italian,London
                </span>
              </div>
            </div>
            <div className='activity-item__followers-info'>
              <Avatar
                className='activity-item__followers-info__item'
                size='small'
                icon={<UserOutlined />}
              />
              <Avatar
                className='activity-item__followers-info__item'
                size='small'
                icon={<UserOutlined />}
              />
            </div>
            <div className='activity-item__footer'>
              <Button
                className='activity-item__footer__btn-view'
                type='primary'
              >
                View
              </Button>
            </div>
          </Card>
        </div>
      </>
    );
  }
}

export default ActivityItem;
