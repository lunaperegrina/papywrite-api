import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create_user.dto';
import { UserOutputDTO } from './dto/output.dto';
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

  @Public()
  @Get()
  @ApiCreatedResponse({ type: UserOutputDTO })
  async readAll(
    @Query() query: GetAllQueryDTO,
  ): Promise<User[] | PaginatedOutputDTO<UserOutputDTO>> {
    return this.service.readAll(query);
  }
}
