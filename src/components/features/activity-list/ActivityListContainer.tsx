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
    activityService.getAllActivities().then((result) => {
      let allActivitiies = result.map((ele: ActivitySummary) => {
        let date = new Date(ele.date).toLocaleDateString().replaceAll('/', '-');
        return {
          ...ele,
          date: date,
        };
      });
      this.totalActivities = allActivitiies;
      this.setState({
        activitySummary: allActivitiies,
      });
    });
  }

  onHandleFilterActivities = (typeFilter: string) => {
    //on click host
    if (typeFilter === 'host') {
      let filterActivitiesArray = this.totalActivities.filter(
        (activity) => activity.host.id === this.props.userInfo.id
      );
      this.setState({
        activitySummary: filterActivitiesArray,
      });
    }
    //on click going
    else if (typeFilter === 'going') {
      let filterActivitiesArray = this.totalActivities.filter((ele) =>
        ele.userAttend?.some((user) => user.id === this.props.userInfo.id)
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
        activities={this.state.activitySummary}
        onHandleFilterActivities={this.onHandleFilterActivities}
        onHandleFilterByDate={this.onHandleFilterByDate}
      />
    );
  }
}

export default withDashboard(ActivityListContainer);
