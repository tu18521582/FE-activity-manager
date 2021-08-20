import React, { Component } from 'react';
import { Button, Input } from 'antd';
import {
  InfoCircleOutlined,
  CalendarOutlined,
  EnvironmentFilled,
  UserOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { ActivityInfo, FollowInfo, UserInfo } from 'constants/domain';
import './activity-detail.scss';

interface ActivityDetailProps {
  activityProps: ActivityInfo;
  followByLoggingUser: Array<FollowInfo>;
  userInfo: UserInfo;
  isLoggingUserHost: boolean;
  onClickButtonJoinProps: Function;
  onClickButtonCancelProps: Function;
  onClickButtonManageProps: Function;
}
class ActivityDetail extends Component<ActivityDetailProps> {
  onClickButtonJoin = () => {
    this.props.onClickButtonJoinProps();
  };

  onClickButtonCancel = () => {
    this.props.onClickButtonCancelProps();
  };

  onClickButtonManage = () => {
    this.props.onClickButtonManageProps();
  };
  render() {
    return (
      <div className='activity-detail'>
        <div className='activity-detail__header-info'>
          <div className='activity-detail__top-background'>
            <span className='activity-detail__title'>
              {this.props.activityProps?.title}
            </span>
            <p className='activity-detail__date-time'>
              {this.props.activityProps?.date}
            </p>
            <p className='activity-detail__creator'>
              Host by{' '}
              <span className='activity-detail__name'>
                {this.props.activityProps?.creator}
              </span>
            </p>
          </div>

          <div className='activity-detail__btn-event'>
            {this.props.isLoggingUserHost ? (
              <div className='activity-detail__btn-manage'>
                <Button type='primary' onClick={this.onClickButtonManage}>
                  Manage Event
                </Button>
              </div>
            ) : this.props.followByLoggingUser.find(
                (ele) => ele.id_activity_follow === this.props.activityProps.id
              ) ? (
              <div className='activity-detail__btn-join'>
                <Button type='dashed' onClick={this.onClickButtonCancel}>
                  Cancel activity
                </Button>
              </div>
            ) : (
              <div className='activity-detail__btn-join'>
                <Button type='primary' onClick={this.onClickButtonJoin}>
                  Join attendance
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className='activity-detail__body-info'>
          <div className='activity-detail__body-info__item'>
            <InfoCircleOutlined className='activity-detail__icon' />
            <span>{this.props.activityProps.description}</span>
          </div>
          <div className='activity-detail__body-info__item'>
            <CalendarOutlined className='activity-detail__icon' />
            <span>
              <span>{`${this.props.activityProps.date} at `}</span>
              <span>{this.props.activityProps.time}</span>
            </span>
          </div>
          <div className='activity-detail__body-info__item'>
            <EnvironmentFilled className='activity-detail__icon' />
            <span>{`${this.props.activityProps.venue}, `}</span>
            <span>{this.props.activityProps.city}</span>
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
