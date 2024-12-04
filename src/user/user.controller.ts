import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create_user.dto';
import { UserOutputDTO } from './dto/output.dto';
import { UpdateUserDTO } from './dto/update_user.dto';
import { User } from '@prisma/client';
import { Public } from 'src/@shared/decorators/public-route.decorator';
import { GetAllQueryDTO } from './dto/get_all_query.dto';
import { PaginatedOutputDTO } from 'src/@shared/pagination/dto/paginated_output.dto';

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

  // @Public()
  @Get()
  @ApiCreatedResponse({ type: UserOutputDTO })
  async readAll(
    @Query() query: GetAllQueryDTO,
  ): Promise<User[] | PaginatedOutputDTO<UserOutputDTO>> {
    return this.service.readAll(query);
  }

  @Public()
  @Get(':id')
  @ApiCreatedResponse({ type: UserOutputDTO })
  @ApiParam({ name: 'id', type: Number })
  async readById(@Param('id') id: number): Promise<User> {
    return this.service.readById(id);
  }

  @Public()
  @Put(':id')
  @ApiCreatedResponse({ type: UserOutputDTO })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    return this.service.update(id, data);
  }

  @Public()
  @Delete(':id')
  @ApiCreatedResponse({ type: UserOutputDTO })
  @ApiParam({ name: 'id', type: Number })
  async delete(@Param('id') id: number): Promise<User> {
    return this.service.delete(id);
  }
}
