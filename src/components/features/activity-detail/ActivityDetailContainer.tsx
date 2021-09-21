import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ActivitySummary, UserInfo } from 'constants/domain';
import history from 'helper/history';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import ActivityDetail from './ActivityDetail';

interface ActivityDetailContainerState {
  activityIsViewing: ActivitySummary;
  isLoggingUserHost: boolean;
  isFollowByLoggedUser: boolean;
}

interface ActivityDetailContainerProps extends RouteComponentProps {
  userInfo: UserInfo;
}

const initialState = {
  activityIsViewing: {
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    city: '',
    host: {
      username: '',
      displayName: '',
      id: '',
      email: '',
      password: '',
    },
    userAttend: [],
  },
  isLoggingUserHost: false,
  isFollowByLoggedUser: false,
};
class ActivityDetailContainer extends Component<
  ActivityDetailContainerProps,
  ActivityDetailContainerState
> {
  constructor(props: ActivityDetailContainerProps) {
    super(props);
    this.state = initialState;
  }

  idActivityIsViewing = (this.props.match.params as any).id;
  componentDidMount = () => {
    activityService
      .getDetailActivity(this.idActivityIsViewing)
      .then((result) => {
        this.setState({
          activityIsViewing: result,
          isLoggingUserHost: result.host.id === this.props.userInfo.id,
          isFollowByLoggedUser: result.userAttend?.some(
            (user: UserInfo) => user.id === this.props.userInfo.id
          ),
        });
      });
  };

  handleClickButtonJoin = () => {
    const newFollowInfo = {
      idUser: this.props.userInfo.id,
      idActivityFollow: this.state.activityIsViewing.id,
    };
    activityService.attendActivity(newFollowInfo).then(() => {
      this.setState({
        isFollowByLoggedUser: true,
      });
    });
  };

  handleClickButtonCancel = () => {
    const followInfo = {
      idUser: this.props.userInfo.id,
      idActivityFollow: this.state.activityIsViewing.id,
    };
    activityService.unAttendActivity(followInfo).then(() => {
      this.setState({
        isFollowByLoggedUser: false,
      });
    });
  };

  handleClickButtonManage = () => {
    history.push(`/manage/${this.idActivityIsViewing}`);
  };
  render() {
    return (
      <ActivityDetail
        onClickButtonManage={this.handleClickButtonManage}
        activityIsViewing={this.state.activityIsViewing}
        isFollowByLoggedUser={this.state.isFollowByLoggedUser}
        userInfo={this.props.userInfo}
        isLoggingUserHost={this.state.isLoggingUserHost}
        onClickButtonJoin={this.handleClickButtonJoin}
        onClickButtonCancel={this.handleClickButtonCancel}
      />
    );
  }
}

export default withDashboard(ActivityDetailContainer);
