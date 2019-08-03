import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { User } from "../models/user.model"

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {}

  async findOneByIdentifier(identifier: string): Promise<User> {
    const results = await this.userModel.find().or([
      {
        username: identifier
      },
      {
        email: identifier
      }
    ]).exec();

    if (results.length !== 1) {
      throw new NotFoundException()
    }

    return results[0]
  }
}
