import React, { Component } from 'react';
import { Calendar } from 'antd';
import { FilterOutlined, CalendarOutlined } from '@ant-design/icons';
import './activity-list.scss';

interface ActivityFilterProps {
  onHandleParentFilterActivities: Function;
  onHandleParentFilterByDate: Function;
}
class ActivityFilter extends Component<ActivityFilterProps> {
  showAllActivities = () => {
    this.props.onHandleParentFilterActivities('all');
  };

  showActivitiesUserJoin = () => {
    this.props.onHandleParentFilterActivities('going');
  };

  showActivitiesUserHost = () => {
    this.props.onHandleParentFilterActivities('host');
  };
  onChangeCalendar = (date: any) => {
    this.props.onHandleParentFilterByDate(date.format('YYYY-MM-DD').toString());
  };
  render() {
    return (
      <>
        <div className='activity-filter'>
          <div className='activity-filter__list-filter'>
            <div className='activity-filter__title'>
              <FilterOutlined />
              Filters
            </div>
            <div
              className='activity-filter__item-filter'
              onClick={this.showAllActivities}
            >
              All activities
            </div>
            <div
              className='activity-filter__item-filter'
              onClick={this.showActivitiesUserJoin}
            >
              I'm going
            </div>
            <div
              className='activity-filter__item-filter'
              onClick={this.showActivitiesUserHost}
            >
              I'm hosting
            </div>
          </div>
          <div className='activity-filter__calendar'>
            <div className='activity-filter__title'>
              <CalendarOutlined />
              Select Date
            </div>
            <Calendar fullscreen={false} onChange={this.onChangeCalendar} />
          </div>
        </div>
      </>
    );
  }
}

export default ActivityFilter;
