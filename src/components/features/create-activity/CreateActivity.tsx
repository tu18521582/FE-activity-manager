import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import history from 'helper/history';
import { UserInfo } from 'constants/domain';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import ActivityForm, {
  ActivityCreationInfo,
} from 'components/common/ActivityForm/ActivityForm';

interface CreateActivityProps extends RouteComponentProps {
  userInfo: UserInfo;
}

interface CreateActivityState {}
class CreateActivity extends Component<
  CreateActivityProps,
  CreateActivityState
> {
  handleCreateActivity = (value: ActivityCreationInfo) => {
    const newActivity = {
      ...value,
      creator: this.props.userInfo.displayname,
      idcreator: this.props.userInfo.id,
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
        dataForm={{}}
        onSubmitActivity={this.handleCreateActivity}
      />
    );
  }
}

export default withDashboard(CreateActivity);
