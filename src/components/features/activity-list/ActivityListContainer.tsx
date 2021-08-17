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
}

const initialState: ActivityListContainerState = {
  activities: [],
  followInfo: [],
  participantInfo: [],
};

class ActivityListContainer extends Component<
  ActivityListContainerProps,
  ActivityListContainerState
> {
  constructor(props: ActivityListContainerProps) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    try {
      activityService.allActivities().then((result) => {
        this.setState({
          activities: [...this.state.activities, ...result.activities],
        });
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
        this.setState(
          {
            participantInfo: [
              ...this.state.participantInfo,
              ...result.participants,
            ],
          },
          () => {
            console.log(this.state);
          }
        );
      });
    } catch (error) {
      alert(error.message);
    }
  }
  render() {
    return (
      <ActivityList activityData={this.state} userInfo={this.props.userInfo} />
    );
  }
}

export default withDashboard(ActivityListContainer);
