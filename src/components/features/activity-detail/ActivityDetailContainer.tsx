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
  idActCurrentFollowByUser: string;
  isLoggingUserHost: boolean;
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
    activityService
      .getFollowInfoByIdAct(this.idActivityIsViewing)
      .then((result) => {
        let followInfoCurrent = result.find(
          (element: FollowInfo) => element.idUser === this.props.userInfo.id
        );
        this.setState({
          idActCurrentFollowByUser: followInfoCurrent?.id,
        });
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
    activityService.cancelJoinActivity(this.state.idActCurrentFollowByUser);
    this.updateFollowInfo();
  };

  handleClickButtonManage = () => {
    history.push(`/manage/${this.idActivityIsViewing}`);
  };
  render() {
    return (
      <ActivityDetail
        onClickButtonManage={this.handleClickButtonManage}
        activityIsViewing={this.state.activityIsViewing}
        idActCurrentFollowByUser={this.state.idActCurrentFollowByUser}
        userInfo={this.props.userInfo}
        isLoggingUserHost={this.state.isLoggingUserHost}
        onClickButtonJoin={this.handleClickButtonJoin}
        onClickButtonCancel={this.handleClickButtonCancel}
      />
    );
  }
}

export default withDashboard(ActivityDetailContainer);
