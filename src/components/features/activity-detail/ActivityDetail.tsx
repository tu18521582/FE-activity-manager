import React, { Component } from 'react';
import { Button, Input } from 'antd';
import {
  InfoCircleOutlined,
  CalendarOutlined,
  EnvironmentFilled,
  UserOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { ActivitySummary, UserInfo } from 'constants/domain';
import './activity-detail.scss';

interface ActivityDetailProps {
  activityIsViewing: ActivitySummary;
  userInfo: UserInfo;
  isLoggingUserHost: boolean;
  isFollowByLoggedUser: boolean;
  onClickButtonJoin: VoidFunction;
  onClickButtonCancel: VoidFunction;
  onClickButtonManage: VoidFunction;
}
class ActivityDetail extends Component<ActivityDetailProps> {
  render() {
    return (
      <div className='activity-detail'>
        <div className='activity-detail__header-info'>
          <div className='activity-detail__top-background'>
            <span className='activity-detail__title'>
              {this.props.activityIsViewing.title}
            </span>
            <p className='activity-detail__date-time'>
              {this.props.activityIsViewing.date}
            </p>
            <p className='activity-detail__creator'>
              Host by{' '}
              <span className='activity-detail__name'>
                {this.props.activityIsViewing.host.displayName}
              </span>
            </p>
          </div>

          <div className='activity-detail__btn-event'>
            {this.props.activityIsViewing.host.id === this.props.userInfo.id ? (
              <div className='activity-detail__btn-manage'>
                <Button type='primary' onClick={this.props.onClickButtonManage}>
                  Manage Event
                </Button>
              </div>
            ) : this.props.isFollowByLoggedUser ? (
              <div className='activity-detail__btn-join'>
                <Button type='dashed' onClick={this.props.onClickButtonCancel}>
                  Cancel activity
                </Button>
              </div>
            ) : (
              <div className='activity-detail__btn-join'>
                <Button type='primary' onClick={this.props.onClickButtonJoin}>
                  Join attendance
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className='activity-detail__body-info'>
          <div className='activity-detail__body-info__item'>
            <InfoCircleOutlined className='activity-detail__icon' />
            <span>{this.props.activityIsViewing.description}</span>
          </div>
          <div className='activity-detail__body-info__item'>
            <CalendarOutlined className='activity-detail__icon' />
            <span>
              <span>{`${this.props.activityIsViewing.date} at `}</span>
              <span>{this.props.activityIsViewing.time}</span>
            </span>
          </div>
          <div className='activity-detail__body-info__item'>
            <EnvironmentFilled className='activity-detail__icon' />
            <span>{`${this.props.activityIsViewing.venue}, `}</span>
            <span>{this.props.activityIsViewing.city}</span>
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
