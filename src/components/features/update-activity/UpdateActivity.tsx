import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ActivityInfo } from 'constants/domain';
import history from 'helper/history';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import ActivityForm from 'components/common/ActivityForm/ActivityForm';

interface UpdateActivityState {
  dataForm: ActivityInfo;
}

const initialState = {
  dataForm: {
    id: '',
    title: '',
    creator: '',
    idcreator: '',
    description: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    city: '',
  },
};

class UpdateActivity extends Component<
  RouteComponentProps,
  UpdateActivityState
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = initialState;
  }
  idActivityUpdating = (this.props.match.params as any).id;

  componentDidMount = () => {
    activityService
      .getDetailActivity(this.idActivityUpdating)
      .then((result) => {
        this.setState({
          dataForm: result,
        });
      });
  };

  handleUpdateActivity = (updatedActivity: any) => {
    activityService.updateActivity(updatedActivity).then((result) => {
      if (result !== null) {
        history.push(`/activities/${updatedActivity.id}`);
      } else {
        alert('Create activity failed');
      }
    });
  };
  render() {
    return (
      <ActivityForm
        {...this.props}
        dataForm={this.state.dataForm}
        onSubmitActivityProps={this.handleUpdateActivity}
      />
    );
  }
}

export default withDashboard(UpdateActivity);
