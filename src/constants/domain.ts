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
