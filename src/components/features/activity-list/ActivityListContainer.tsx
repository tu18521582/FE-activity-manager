import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ActivitySummary, FollowInfo, UserInfo } from 'constants/domain';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import ActivityList from './ActivityList';

interface ActivityListContainerProps extends RouteComponentProps {
  userInfo: UserInfo;
}

interface ActivityListContainerState {
  activitySummary: Array<ActivitySummary>;
  followInfo: Array<FollowInfo>;
}

const initialState: ActivityListContainerState = {
  activitySummary: [],
  followInfo: [],
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

  getActivitySummaryAPI = async () => {
    try {
      await activityService.getActivitySummary().then((result) => {
        this.setState(
          {
            activitySummary: result,
          },
          () => {
            this.totalActivities = this.state.activitySummary;
            this.forceUpdate();
          }
        );
      });
    } catch (error) {
      alert(error.message);
    }
  };

  componentDidMount() {
    this.getActivitySummaryAPI();
    try {
      activityService.followInfo().then((result) => {
        const resultFilter = result.followinfos.filter(
          (element: any) => element.id_user === this.props.userInfo.id
        );
        this.setState({
          followInfo: [...this.state.followInfo, ...resultFilter],
        });
      });
    } catch (error) {
      alert(error.message);
    }
  }

  onHandleFilterActivities = (typeFilter: string) => {
    //on click host
    if (typeFilter === 'host') {
      this.totalActivities = this.state.activitySummary.filter(
        (activity) => activity.idcreator === this.props.userInfo.id
      );
    }
    //on click going
    else if (typeFilter === 'going') {
      let tempArray: any = [];
      const postsLoggedUserJoin = this.state.followInfo.filter(
        (ele) => ele.id_user === this.props.userInfo.id
      );
      postsLoggedUserJoin.forEach((postInfo) => {
        const activity: any = this.state.activitySummary.find(
          (activity) => activity.id === postInfo.id_post_follow
        );
        if (activity) {
          tempArray.push(activity);
        }
      });
      this.totalActivities = tempArray;
    }
    //default
    else {
      this.totalActivities = this.state.activitySummary;
    }
    this.forceUpdate();
  };

  onHandleFilterByDate = (date: string) => {
    this.totalActivities = this.state.activitySummary.filter(
      (activity) => Date.parse(activity.date) >= Date.parse(date)
    );
    this.forceUpdate();
  };

  render() {
    return (
      <ActivityList
        followInfo={this.state.followInfo}
        userInfo={this.props.userInfo}
        activities={this.totalActivities?.sort(
          (a, b) => Date.parse(a.date) - Date.parse(b.date)
        )}
        onHandleFilterActivities={this.onHandleFilterActivities}
        onHandleFilterByDate={this.onHandleFilterByDate}
      />
    );
  }
}

export default withDashboard(ActivityListContainer);
