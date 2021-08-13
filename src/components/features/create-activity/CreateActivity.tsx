import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import history from 'helper/history';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import FormActivity, {
  ActivityCreationInfo,
} from 'components/common/FormActivity/FormActivity';
import './create-activity.scss';
class CreateActivity extends Component<RouteComponentProps> {
  onHandleCreateActivity = (value: ActivityCreationInfo) => {
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
      <FormActivity
        {...this.props}
        onSubmitCreateActivityProps={this.onHandleCreateActivity}
      />
    );
  }
}

export default withDashboard(CreateActivity);
