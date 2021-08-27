import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ActivityInfo, FollowInfo, UserInfo } from 'constants/domain';
import history from 'helper/history';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import ActivityDetail from './ActivityDetail';

interface ActivityDetailContainerState {
  activityIsViewing: ActivityInfo;
  followInfo: FollowInfo;
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
    creator: '',
    idcreator: '',
    description: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    city: '',
  },
  idActCurrentFollowByUser: '',
  isLoggingUserHost: false,
  isFollowByLoggedUser: false,
  followInfo: {
    id: '',
    idUser: '',
    idActivityFollow: '',
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
  updateFollowInfo = () => {
    const attrRequest = {
      idUser: this.props.userInfo.id,
      idActivityFollow: this.idActivityIsViewing,
    };
    activityService.getFollowInfoByAttr(attrRequest).then((result) => {
      if (result) {
        this.setState({
          followInfo: result.followinfo,
          isFollowByLoggedUser: result !== null,
        });
      }
    });
  };
  componentDidMount = () => {
    activityService
      .getDetailActivity(this.idActivityIsViewing)
      .then((result) => {
        this.setState({
          activityIsViewing: result,
          isLoggingUserHost: result.idcreator === this.props.userInfo.id,
        });
      });
    this.updateFollowInfo();
  };

  handleClickButtonJoin = () => {
    const newFollowInfo = {
      id: uuidv4(),
      idUser: this.props.userInfo.id,
      idActivityFollow: this.state.activityIsViewing.id,
    };
    activityService.insertFollowInfo(newFollowInfo);
    this.updateFollowInfo();
  };

  handleClickButtonCancel = () => {
    activityService.cancelJoinActivity(this.state.followInfo.id).then(() => {
      this.setState({
        isFollowByLoggedUser: false,
        followInfo: {
          id: '',
          idUser: '',
          idActivityFollow: '',
        },
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
