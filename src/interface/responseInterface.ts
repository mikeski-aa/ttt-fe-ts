export interface IResponse {
  error?: boolean;
  username?: string;
  id?: number;
  token?: string;
  errorMessage?: string;
  gameswon?: number;
  gamesdrawn?: number;
  gameslost?: number;
  currentstreak?: number;
  maxstreak?: number;
}

export interface IUser {
  username?: string;
  id?: number;
  gameswon?: number;
  gameslost?: number;
  gamesdrawn?: number;
  currentstreak?: number;
  maxstreak?: number;
}
