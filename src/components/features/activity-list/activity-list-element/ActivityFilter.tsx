import React, { Component } from 'react';
import { Calendar } from 'antd';
import { FilterOutlined, CalendarOutlined } from '@ant-design/icons';
import './activity-list.scss';
class ActivityFilter extends Component {
  render() {
    return (
      <>
        <div className='activity-filter'>
          <div className='activity-filter__list-filter'>
            <div className='activity-filter__title'>
              <FilterOutlined />
              Filters
            </div>
            <div className='activity-filter__item-filter'>All activities</div>
            <div className='activity-filter__item-filter'>I'm going</div>
            <div className='activity-filter__item-filter'>I'm hoisting</div>
          </div>
          <div className='activity-filter__calendar'>
            <div className='activity-filter__title'>
              <CalendarOutlined />
              Select Date
            </div>
            <Calendar fullscreen={false} />
          </div>
        </div>
      </>
    );
  }
}

export default ActivityFilter;
