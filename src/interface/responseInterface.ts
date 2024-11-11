export interface IResponse {
  error?: boolean;
  username?: string;
  id?: number;
  token?: string;
  errorMessage?: string;
  gameswon?: number;
  gameslost?: number;
  winstreak?: number;
}

export interface IUser {
  username?: string;
  id?: number;
  gameswon?: number;
  gameslost?: number;
  winstreak?: number;
}
