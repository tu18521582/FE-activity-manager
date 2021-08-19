export interface UserInfo {
  username: string;
  displayname: string;
  id: string;
  email: string;
  password: string;
}

export interface UserRegisterInfo {
  username: string;
  displayname: string;
  email: string;
  password: string;
}

export interface ActionType {
  type: string;
  error?: any;
  meta?: any;
  payload?: any;
}

export interface ActivityInfo {
  id: string;
  title: string;
  creator: string;
  idcreator: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
}

export interface FollowInfo {
  id: string;
  id_user: string;
  id_activity_follow: string;
}

export interface ActivitySummary {
  id: string;
  title: string;
  creator: string;
  idcreator: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  userList: Array<UserInfo>;
}
