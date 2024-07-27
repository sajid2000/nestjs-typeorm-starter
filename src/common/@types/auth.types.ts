export interface OauthResponse {
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}

export interface AuthResponse {
  user: {
    id: number;
  };
  accessToken: string;
  refreshToken: string;
}

export interface AccessTokenPayload {
  email: string;
  isTwoFactorEnabled?: boolean;
}
