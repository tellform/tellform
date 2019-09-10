import { AuthService } from "./services/auth.service"
import { PasswordService } from "./services/password.service"
import { PasswordStrategy } from "./strategies/password.strategy"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { JwtRefreshStrategy } from "./strategies/jwt.refresh.strategy"
import { RegisterService } from "./services/register.service"

export default [
  AuthService,
  PasswordService,
  PasswordStrategy,
  JwtStrategy,
  JwtRefreshStrategy,
  RegisterService,
]
