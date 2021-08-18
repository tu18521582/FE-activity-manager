import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ActivitySummary, UserInfo } from 'constants/domain';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import ActivityList from './ActivityList';

interface ActivityListContainerProps extends RouteComponentProps {
  userInfo: UserInfo;
}

interface ActivityListContainerState {
  activitySummary: Array<ActivitySummary>;
}

const initialState: ActivityListContainerState = {
  activitySummary: [],
};
class ActivityListContainer extends Component<
  ActivityListContainerProps,
  ActivityListContainerState
> {
  totalActivities: ActivitySummary[] = [];

  constructor(props: ActivityListContainerProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    try {
      activityService.getActivitySummary().then((result) => {
        this.setState(
          {
            activitySummary: result,
          },
          () => {
            this.totalActivities = this.state.activitySummary;
          }
        );
      });
    } catch (error) {
      alert(error.message);
    }
  }

  onHandleFilterActivities = (typeFilter: string) => {
    //on click host
    if (typeFilter === 'host') {
      let filterActivitiesArray = this.totalActivities.filter(
        (activity) => activity.idcreator === this.props.userInfo.id
      );
      this.setState({
        activitySummary: filterActivitiesArray,
      });
    }
    //on click going
    else if (typeFilter === 'going') {
      let filterActivitiesArray = this.totalActivities.filter((ele) =>
        ele.userList?.some((user) => user.id === this.props.userInfo.id)
      );

      this.setState({
        activitySummary: filterActivitiesArray,
      });
    }
    //default
    else {
      this.setState({
        activitySummary: this.totalActivities,
      });
    }
  };

  onHandleFilterByDate = (date: string) => {
    let filterActivitiesArray = this.totalActivities.filter(
      (activity) => Date.parse(activity.date) >= Date.parse(date)
    );
    this.setState({
      activitySummary: filterActivitiesArray,
    });
  };

  render() {
    return (
      <ActivityList
        userInfo={this.props.userInfo}
        activities={this.state.activitySummary.sort(
          (a, b) => Date.parse(a.date) - Date.parse(b.date)
        )}
        onHandleFilterActivities={this.onHandleFilterActivities}
        onHandleFilterByDate={this.onHandleFilterByDate}
      />
    );
  }
}

export default withDashboard(ActivityListContainer);
