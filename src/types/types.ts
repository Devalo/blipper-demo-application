export interface IBlips {
  text: string;
  id: string;
  user: IUser;
  createdAt: {
    nanoseconds: number,
    seconds: number,
  };
  comments: any;
};

export interface IUser {
  blips: Array<IBlips>;
  displayName: string;
  email: string;
  id?: string;
  uid?: string;
  photoURL: string;
};