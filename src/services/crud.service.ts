import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import globalValues from 'src/globalValues';
import { Injectable } from '@nestjs/common';
import { User } from '../users/schemas/user.schema';


@Injectable()
export class CrudService {
  constructor(
    @InjectModel('User') private readonly usersModel: Model<User>,
  ) {}

  async findAll(model: string, query = {}) {
    const mdl = await this.findSchema(model);
    const result = await mdl.find(query);
    return result;
  }

  async findById(model: string, id: string) {
    const mdl = await this.findSchema(model);
    const result = await mdl.findById(id);
    return result;
  }

  async create(model: string, query: any) {
    const mdl = await this.findSchema(model);
    const result = await mdl.create(query);
    return result;
  }

  async updateOne(model: string, query: any, newData: any) {
    const mdl = await this.findSchema(model);
    const result = await mdl.updateOne(query, newData )
    return result;
  }

  async findOneAndDelete(model: string, query: any) {
    const mdl = await this.findSchema(model);
    const result = await mdl.findOneAndDelete({}, query);
    return result;
  }

  private async findSchema(modelName: string) {
    let model;
    switch (modelName) {
      case globalValues.db.collections.users.name:
      default:
        model = this.usersModel;
        break;

    }
    return model;
  }
}
