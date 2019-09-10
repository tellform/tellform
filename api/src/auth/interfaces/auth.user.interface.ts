export interface AuthUser {
  id: string;
  username: string;
  email: string;
  roles: [string];
  created: Date;
  lastUpdated: Date;
}
