import { Document } from 'mongoose';

export interface User extends Document{
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly username: string;
  readonly passwordHash: string;
  readonly salt: string;
  readonly provider: string;
  readonly roles: [string];
  readonly language: string;
  readonly created: Date;
  readonly lastUpdated: Date;
  readonly resetPasswordToken: string;
  readonly resetPasswordExpires: Date;
  readonly token: string;
  readonly apiKey: string;
}
