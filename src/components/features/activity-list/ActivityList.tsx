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

class ActivityList extends Component<ActivityListProps> {
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
          {this.props.activities?.map((element: ActivitySummary) => (
            <ActivityItem
              key={element.id}
              activityItemData={element}
              userInfo={this.props.userInfo}
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
