export interface UserInfo {
  username: string;
  displayName: string;
  id: string;
  email: string;
  password: string;
}

export interface UserRegisterInfo {
  username: string;
  displayName: string;
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
  idcreator: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
}

export interface FollowInfo {
  idUser: string;
  idActivityFollow: string;
}

export interface ActivitySummary {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  host: UserInfo;
  userAttend: Array<UserInfo>;
}

export enum ErrorCode {
  InternalError = 500,
}
