import { Col, Row } from 'antd';
import React, { Component } from 'react';
import ActivityFilter from './activity-list-element/ActivityFilter';
import ActivityItem from './activity-list-element/ActivityItem';
import './activity-list-layout.scss';

class ActivityList extends Component {
  render() {
    return (
      <>
        <div className='activity-container'>
          <div className='activity-container__list'>
            <ActivityItem />
            <ActivityItem />
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
