import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { activityService } from 'services';
import FormComponent from 'components/common/FormComponent/FormComponent';
import infoOfCreateActivity from 'components/common/FormComponent/FormComponent';
import withDashboard from 'components/common/withDashboard';

const { v4: uuidv4 } = require('uuid');
class CreateActivity extends Component<RouteComponentProps> {
  onHandleCreateActivity = (value: typeof infoOfCreateActivity) => {
    const newActivity = {
      ...value,
      id: uuidv4(),
    };
    try {
      activityService.createActivity(newActivity).then((result) => {
        if (result !== null) {
          window.history.back();
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
      <FormComponent
        {...this.props}
        onSubmitCreateActivityProps={this.onHandleCreateActivity}
      />
    );
  }
}

export default withDashboard(CreateActivity);
