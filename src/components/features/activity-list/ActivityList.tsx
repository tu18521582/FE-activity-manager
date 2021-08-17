import React, { Component } from 'react';
import {
  ActivityInfo,
  FollowInfo,
  ParticipantInfo,
  UserInfo,
} from 'constants/domain';
import ActivityFilter from './activity-list-element/ActivityFilter';
import ActivityItem from './activity-list-element/ActivityItem';
import './activity-list-layout.scss';

interface ActivityListProps {
  activityData: {
    activities: Array<ActivityInfo>;
    followInfo: Array<FollowInfo>;
    participantInfo: Array<ParticipantInfo>;
  };
  userInfo: UserInfo;
}

interface ActivityListState {}
class ActivityList extends Component<ActivityListProps, ActivityListState> {
  render() {
    return (
      <>
        <div className='activity-container'>
          <div className='activity-container__list'>
            {this.props.activityData.activities.map((element: ActivityInfo) => (
              <ActivityItem
                activityItemData={element}
                userInfo={this.props.userInfo}
                followInfo={this.props.activityData.followInfo}
                participantInfo={this.props.activityData.participantInfo}
              />
            ))}
          </div>
          <div className='activity-container__filter'>
            <ActivityFilter />
          </div>
        </div>
      </>
    );
  }
}

export default ActivityList;
