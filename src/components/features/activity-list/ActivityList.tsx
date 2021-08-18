import React, { Component } from 'react';
import { ActivitySummary, UserInfo } from 'constants/domain';
import ActivityFilter from './activity-list-element/ActivityFilter';
import ActivityItem from './activity-list-element/ActivityItem';
import './activity-list-layout.scss';

interface ActivityListProps {
  activities: Array<ActivitySummary>;
  userInfo: UserInfo;
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
    return (
      <div className='activity-container'>
        <div className='activity-container__list'>
          {this.props.activities?.map(
            (element: ActivitySummary, index: number) => (
              <ActivityItem
                key={index}
                activityItemData={element}
                userInfo={this.props.userInfo}
              />
            )
          )}
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
