import withDashboard from 'components/common/withDashboard';
import { Component } from 'react';
import ActivityList from './ActivityList';

class ActivityListContainer extends Component {
  render() {
    return (
      <>
        <ActivityList />
      </>
    );
  }
}

export default withDashboard(ActivityListContainer);
