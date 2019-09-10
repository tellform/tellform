import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { User } from "../models/user.model"
import {Form} from "../../form/models/form.model"

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

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec()
  }

  async findOneBy(conditions): Promise<User> {
    return await this.userModel.findOne(conditions).exec()
  }

  async findBy(conditions): Promise<User[]> {
    return await this.userModel.find(conditions).exec()
  }

  async save(user: User): Promise<User> {
    let model = new this.userModel(user)
    return await model.save()
  }
}
