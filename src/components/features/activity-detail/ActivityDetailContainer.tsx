import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ActivityInfo, FollowInfo, UserInfo } from 'constants/domain';
import { activityService } from 'services';
import withDashboard from 'components/common/withDashboard';
import ActivityDetail from './ActivityDetail';
import history from 'helper/history';

interface ActivityDetailContainerState {
  activityIsViewing: ActivityInfo;
  followByLoggingUser: Array<FollowInfo>;
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
  followByLoggingUser: [],
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
  getAllFollowInfo = () => {
    activityService.followInfo().then((result) => {
      let arrayFollowOfLoggingUser = result.followinfos.filter(
        (element: FollowInfo) => element.id_user === this.props.userInfo.id
      );
      this.setState({
        followByLoggingUser: arrayFollowOfLoggingUser,
      });
    });
  };
  componentDidMount = () => {
    activityService
      .getDetailActivity(this.idActivityIsViewing)
      .then((result) => {
        if (result.idcreator === this.props.userInfo.id) {
          this.setState({
            activityIsViewing: result,
            isLoggingUserHost: true,
          });
        }
        this.setState({
          activityIsViewing: result,
        });
      });
    this.getAllFollowInfo();
  };
  hadleClickButtonJoin = () => {
    const newFollowInfo = {
      id: uuidv4(),
      id_user: this.props.userInfo.id,
      id_activity_follow: this.state.activityIsViewing.id,
    };
    activityService.insertFollowInfo(newFollowInfo);
    this.getAllFollowInfo();
  };

  hadleClickButtonCancle = () => {
    const idFollowInfoCurrent = this.state.followByLoggingUser.find(
      (ele) => ele.id_activity_follow === this.state.activityIsViewing.id
    )?.id as string;
    activityService.cancelJoinActivity(idFollowInfoCurrent);
    this.getAllFollowInfo();
  };

  handleClickButtonManage = () => {
    history.push(`/manage/${this.idActivityIsViewing}`);
  };
  render() {
    return (
      <ActivityDetail
        onClickButtonManageProps={this.handleClickButtonManage}
        activityProps={this.state.activityIsViewing}
        followByLoggingUser={this.state.followByLoggingUser}
        userInfo={this.props.userInfo}
        isLoggingUserHost={this.state.isLoggingUserHost}
        onClickButtonJoinProps={this.hadleClickButtonJoin}
        onClickButtonCancelProps={this.hadleClickButtonCancle}
      />
    );
  }
}

export default withDashboard(ActivityDetailContainer);
