import { Col, Row } from 'antd';
import React, { Component } from 'react';
import ActivityFilter from './ActivityFilter';
import ActivityItem from './ActivityItem';

class ActivityList extends Component {
  render() {
    return (
      <Row>
        <Col span={3} />
        <Col span={12}>
          <ActivityItem />
          <ActivityItem />
        </Col>
        <Col span={6}>
          <ActivityFilter />
        </Col>
        <Col span={3} />
      </Row>
    );
  }
}

export default ActivityList;
