import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  ActivityInfo,
  FollowInfo,
  ParticipantInfo,
  UserInfo,
} from 'constants/domain';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import ActivityList from './ActivityList';

interface ActivityListContainerProps extends RouteComponentProps {
  userInfo: UserInfo;
}

interface ActivityListContainerState {
  activities: Array<ActivityInfo>;
  followInfo: Array<FollowInfo>;
  participantInfo: Array<ParticipantInfo>;
  filterType: string;
  filterDate: string;
}

const initialState: ActivityListContainerState = {
  activities: [],
  followInfo: [],
  participantInfo: [],
  filterType: 'all',
  filterDate: new Date().toISOString().slice(0, 10),
};
class ActivityListContainer extends Component<
  ActivityListContainerProps,
  ActivityListContainerState
> {
  totalActivities: ActivityInfo[] = [];

  constructor(props: ActivityListContainerProps) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    try {
      activityService.allActivities().then((result) => {
        this.setState(
          {
            activities: [...this.state.activities, ...result.activities],
          },
          () => {
            this.totalActivities = this.state.activities;
          }
        );
      });
    } catch (error) {
      alert(error.message);
    }

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

    try {
      activityService.participantInfo().then((result) => {
        this.setState({
          participantInfo: [
            ...this.state.participantInfo,
            ...result.participants,
          ],
        });
      });
    } catch (error) {
      alert(error.message);
    }
  }

  onHandleFilterActivities = (typeFilter: string) => {
    this.setState(
      {
        filterType: typeFilter,
      },
      () => {
        //on click host
        if (this.state.filterType === 'host') {
          this.totalActivities = this.state.activities.filter(
            (activity) => activity.idcreator === this.props.userInfo.id
          );
        }
        //on click going
        else if (this.state.filterType === 'going') {
          let tempArray: any = [];
          const postsLoggedUserJoin = this.state.followInfo.filter(
            (ele) => ele.id_user === this.props.userInfo.id
          );
          postsLoggedUserJoin.forEach((postInfo) => {
            const activity: any = this.state.activities.find(
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
          this.totalActivities = this.state.activities;
        }
      }
    );
  };

  onHandleFilterByDate = (date: string) => {
    this.setState(
      {
        filterDate: date,
      },
      () => {
        console.log(date);
        this.totalActivities = this.state.activities.filter(
          (activity) => Date.parse(activity.date) >= Date.parse(date)
        );
      }
    );
  };
  render() {
    return (
      <ActivityList
        activityData={this.state}
        userInfo={this.props.userInfo}
        activities={this.totalActivities.sort(
          (a, b) => Date.parse(a.date) - Date.parse(b.date)
        )}
        onHandleFilterActivities={this.onHandleFilterActivities}
        onHandleFilterByDate={this.onHandleFilterByDate}
      />
    );
  }
}

export default withDashboard(ActivityListContainer);
