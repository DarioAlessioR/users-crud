import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

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

}
