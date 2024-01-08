import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

  private users = [{ name: 'dario', id: '1' }, { name: 'pepe', id: '2' }];

  async findAll() {
    return this.users.map(user => user.name);
  }

  async findById(id: string) {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found with id ' + id);
    }

    return user;
  }

  async createUser(createUserDto: any) {

    this.logger.log('Creating user in service');
   
    return { createUserDto };
  }

  async updateUser(updateUserDto: any, id: string) {
    return {};
  }

  async deleteUser(id: string) {
    return {};
  }

}
