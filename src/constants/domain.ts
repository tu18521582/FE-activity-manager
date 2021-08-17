export interface UserInfo {
  username: String;
  displayname: String;
  id: String;
  email: String;
  password: String;
}

export interface UserRegisterInfo {
  username: String;
  displayname: String;
  email: String;
  password: String;
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
  id_post_follow: string;
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
  userList: UserInfo[];
}

//xoa
export interface ParticipantInfo {
  id: string;
  id_post: string;
  id_follower: string;
  displayname: string;
}
