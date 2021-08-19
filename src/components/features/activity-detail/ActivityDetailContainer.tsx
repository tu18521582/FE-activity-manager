import withDashboard from 'components/common/withDashboard';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ActivityDetail from './ActivityDetail';

class ActivityDetailContainer extends Component<RouteComponentProps> {
  render() {
    return <ActivityDetail />;
  }
}

export default withDashboard(ActivityDetailContainer);
