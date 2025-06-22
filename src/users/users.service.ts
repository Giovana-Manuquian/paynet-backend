import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

 async findAll(): Promise<any[]> {
  const users = await this.userModel.find().select('-password').lean();
  return users.map(user => ({
    ...user,
    fullName: user.nome, // <-- converte 'nome' para 'fullName'
  }));
}


  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password');
  }
}
