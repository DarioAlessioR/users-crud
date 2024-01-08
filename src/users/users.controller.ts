import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Logger } from '@nestjs/common';


@Controller('users')
export class UsersController {

  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {

    this.logger.log('Creating user in controller');

    const user = await this.usersService.createUser(createUserDto);

    this.logger.log('Finalized user in controller');

    return user;
  }

  @Patch(':id')
  async updateUser(@Body() updateUserDto: any , @Param('id') id: string) {
    return await this.usersService.updateUser(updateUserDto, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }

}
