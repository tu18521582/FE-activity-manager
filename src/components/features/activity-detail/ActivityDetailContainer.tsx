import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ActivitySummary, UserInfo } from 'constants/domain';
import history from 'helper/history';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import ActivityDetail from './ActivityDetail';

interface ActivityDetailContainerState {
  activityIsViewing: ActivitySummary;
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
    window.scrollTo(0, 0);
    activityService
      .getDetailActivity(this.idActivityIsViewing)
      .then((result) => {
        this.setState({
          activityIsViewing: result,
        });
      });
  };

  checkIsFollowByLoggedUser = () => {
    return this.state.activityIsViewing.userAttend?.some(
      (user: UserInfo) => user.id === this.props.userInfo.id
    );
  };

  checkIsLoggingUserHost = () => {
    return this.state.activityIsViewing.host.id === this.props.userInfo.id;
  };

  handleClickButtonJoin = () => {
    activityService.attendActivity(this.state.activityIsViewing.id).then(() => {
      const userInfoJoinActivity = this.props.userInfo;
      let activityIsViewingAfterJoin = { ...this.state.activityIsViewing };
      if (!activityIsViewingAfterJoin.userAttend) {
        activityIsViewingAfterJoin.userAttend = [];
      }
      activityIsViewingAfterJoin.userAttend?.push(userInfoJoinActivity);
      this.setState({
        activityIsViewing: activityIsViewingAfterJoin,
      });
    });
  };

  handleClickButtonCancel = () => {
    activityService
      .unAttendActivity(this.state.activityIsViewing.id)
      .then(() => {
        const usersAttendAfterCancel =
          this.state.activityIsViewing.userAttend?.filter(
            (user: UserInfo) => user.id !== this.props.userInfo.id
          );
        let activityIsViewingAfterCancel = { ...this.state.activityIsViewing };
        activityIsViewingAfterCancel.userAttend = usersAttendAfterCancel;
        this.setState({
          activityIsViewing: activityIsViewingAfterCancel,
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
        isFollowByLoggedUser={this.checkIsFollowByLoggedUser()}
        userInfo={this.props.userInfo}
        isLoggingUserHost={this.checkIsLoggingUserHost()}
        onClickButtonJoin={this.handleClickButtonJoin}
        onClickButtonCancel={this.handleClickButtonCancel}
      />
    );
  }
}

export default withDashboard(ActivityDetailContainer);
