export interface IAuth {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}
