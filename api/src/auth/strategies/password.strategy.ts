import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {AuthUser} from "../interfaces/auth.user.interface"

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy, 'password') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(username: string, password: string): Promise<AuthUser | null> {
    return this.authService.verifyForLogin(username, password);
  }
}
