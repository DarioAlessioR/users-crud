import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  async findAll() {
    return [{ id: 1, name: "dario" }, { id: 2, name: "dario2" }, { id: 3, name: "dario3"}];
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: number) {
    return { id: id, name: "dario" };
  }

  @Post()
  async createUser(@Body() createUserDto: any) {
    return "hola" + " " + createUserDto.name;
  }

  @Patch(':id')
  async updateUser(@Body() updateUserDto: any , @Param('id') id: number) {
    return { id, updateUserDto };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return { id };
  }


}
