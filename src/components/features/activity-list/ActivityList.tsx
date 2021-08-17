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
    followInfo: Array<FollowInfo>;
    participantInfo: Array<ParticipantInfo>;
  };
  userInfo: UserInfo;
  activities: Array<ActivityInfo>;
  onHandleFilterActivities: Function;
  onHandleFilterByDate: Function;
}

interface ActivityListState {}
class ActivityList extends Component<ActivityListProps, ActivityListState> {
  onHandleParentFilterActivities = (typeFilter: string) => {
    this.props.onHandleFilterActivities(typeFilter);
  };

  onHadleParentFilterByDate = (date: string) => {
    this.props.onHandleFilterByDate(date);
  };
  render() {
    console.log('activities list: ', this.props.activities);

    return (
      <div className='activity-container'>
        <div className='activity-container__list'>
          {this.props.activities.map((element: ActivityInfo, index: number) => (
            <ActivityItem
              key={index}
              activityItemData={element}
              userInfo={this.props.userInfo}
              followInfo={this.props.activityData.followInfo}
              participantInfo={this.props.activityData.participantInfo}
            />
          ))}
        </div>
        <div className='activity-container__filter'>
          <ActivityFilter
            onHandleParentFilterActivities={this.onHandleParentFilterActivities}
            onHadleParentFilterByDate={this.onHadleParentFilterByDate}
          />
        </div>
      </div>
    );
  }
}

export default ActivityList;
