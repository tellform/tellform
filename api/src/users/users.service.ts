import { Model } from 'mongoose';
import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from "./interfaces/user.interface"

export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

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
