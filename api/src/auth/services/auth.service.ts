import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { PasswordService } from "./password.service"
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from "../interfaces/auth.user.interface"
import { User } from "../../users/interfaces/user.interface"
import {AuthJwt} from "../interfaces/auth.jwt.interface"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async verifyForLogin(identifier: string, pass: string): Promise<AuthUser | null> {
    try {
      const user = await this.usersService.findOneByIdentifier(identifier);

      if (await this.passwordService.verify(pass, user.passwordHash, user.salt)) {
        return AuthService.setupAuthUser(user)
      }
    } catch (e) {}

    return null;
  }

  async validate(identifier: string): Promise<AuthUser | null> {
    try {
      return AuthService.setupAuthUser(
        await this.usersService.findOneByIdentifier(identifier)
      )
    } catch (e) {}

    return null;
  }

  private static setupAuthUser(user:User):AuthUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      created: user.created,
      lastUpdated: user.lastUpdated
    };
  }

  async createToken(user: AuthUser): Promise<AuthJwt> {
    const payload = {
      id: user.id,
      username: user.username,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
      // TODO add refresh token invalidation uppon usage! They should only work once
      refresh_token: this.jwtService.sign(
        {
          ...payload,
          refresh: true
        },
        {
          expiresIn: '30days',
        }
      ),
    };
  }
}
