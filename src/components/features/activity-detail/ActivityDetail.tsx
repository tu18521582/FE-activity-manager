import React, { Component } from 'react';
import { Button, Input } from 'antd';
import {
  InfoCircleOutlined,
  CalendarOutlined,
  EnvironmentFilled,
  UserOutlined,
  FormOutlined,
} from '@ant-design/icons';
import './activity-detail.scss';
class ActivityDetail extends Component {
  render() {
    return (
      <div className='activity-detail'>
        <div className='activity-detail__header-info'>
          <div className='activity-detail__top-background'>
            <span className='activity-detail__title'>Future Activity 1</span>
            <p className='activity-detail__date-time'>Saturday 19th June</p>
            <p className='activity-detail__creator'>
              Host by <span className='activity-detail__name'>Jane</span>
            </p>
          </div>
          <Button type='primary' className='activity-detail__btn-manage'>
            Manage Event
          </Button>
        </div>
        <div className='activity-detail__body-info'>
          <div className='activity-detail__body-info__item'>
            <InfoCircleOutlined className='activity-detail__icon' />
            <span>Act1 by user1</span>
          </div>
          <div className='activity-detail__body-info__item'>
            <CalendarOutlined className='activity-detail__icon' />
            <span>
              <span>Saturday 19th June at</span>
              <span>9:17 PM</span>
            </span>
          </div>
          <div className='activity-detail__body-info__item'>
            <EnvironmentFilled className='activity-detail__icon' />
            <span>Wembly Stadium, </span>
            <span>London</span>
          </div>
        </div>
        <div className='activity-detail__chat'>
          <div className='activity-detail__chat__title'>
            Chat about this event
          </div>
          <div className='activity-detail__chat__content'>
            <div className='activity-detail__chat__comment'>
              <UserOutlined className='activity-detail__icon-user' />
              <div className='activity-detail__text'>
                <div className='activity-detail__commenter'>
                  <span className='activity-detail__name-commenter'>Bob</span>
                  <span className='activity-detail__count-day'>14 days</span>
                </div>
                <span className='activity-detail__comment-content'>aa</span>
              </div>
            </div>
            <div>
              <Input.TextArea placeholder='Add your comment' />
            </div>
            <div>
              <Button icon={<FormOutlined />} type='primary'>
                Add Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityDetail;
