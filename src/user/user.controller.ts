import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserOutputDTO } from './dto/output.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { Public } from 'src/@shared/decorators/public-route.decorator';
import { GetAllQueryDTO } from './dto/get-all-query.dto';
import { PaginatedOutputDTO } from 'src/@shared/pagination/dto/paginated_output.dto';
import { ParamId } from 'src/@shared/decorators/param-id';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @Post()
  @ApiCreatedResponse({ type: UserOutputDTO })
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return this.service.create(data);
  }

  @Public()
  @Get()
  @ApiCreatedResponse({ type: UserOutputDTO })
  async readAll(
    @Query() query: GetAllQueryDTO,
  ): Promise<User[] | PaginatedOutputDTO<UserOutputDTO>> {
    return this.service.readAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ type: UserOutputDTO })
  @ApiParam({ name: 'id', type: Number })
  async readById(@ParamId('id') id: number): Promise<User> {
    return this.service.readById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserOutputDTO })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserOutputDTO })
  @ApiParam({ name: 'id', type: Number })
  async delete(@Param('id') id: number): Promise<User> {
    return this.service.delete(id);
  }
}
