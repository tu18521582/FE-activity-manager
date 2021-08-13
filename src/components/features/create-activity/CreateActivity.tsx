import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import history from 'helper/history';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import ActivityForm, {
  ActivityCreationInfo,
} from 'components/common/ActivityForm/ActivityForm';
class CreateActivity extends Component<RouteComponentProps> {
  handleCreateActivity = (value: ActivityCreationInfo) => {
    const newActivity = {
      ...value,
      id: uuidv4(),
    };
    try {
      activityService.createActivity(newActivity).then((result) => {
        if (result !== null) {
          history.push('/activities');
        } else {
          alert('Create activity failed');
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  render() {
    return (
      <ActivityForm
        {...this.props}
        onSubmitCreateActivityProps={this.handleCreateActivity}
      />
    );
  }
}

export default withDashboard(CreateActivity);
