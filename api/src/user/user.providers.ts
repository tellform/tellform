import { UserService } from "./services/user.service"
import { UsernameAlreadyInUse } from "./validators/UsernameAlreadyInUse"
import { EmailAlreadyInUse } from "./validators/EmailAlreadyInUse"

export default [
  UserService,
  UsernameAlreadyInUse,
  EmailAlreadyInUse,
]
