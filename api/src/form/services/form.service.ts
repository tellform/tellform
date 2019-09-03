import {Injectable} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import {Form} from "../models/form.model"
import {User} from "../../user/models/user.model"

@Injectable()
export class FormService {
  constructor(@InjectModel(Form) private readonly formModel: ModelType<Form>) {}

  async findById(id: string): Promise<Form> {
    return await this.formModel.findById(id).exec()
  }

  async findBy(conditions): Promise<Form[]> {
    return await this.formModel.find(conditions).exec()
  }
}
