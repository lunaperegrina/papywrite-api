import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ParamId } from 'src/@shared/decorators/param-id';
import { Public } from 'src/@shared/decorators/public-route.decorator';
import { PostOutputDTO } from './dto/output.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { Post as PostPrisma } from '@prisma/client';
import { GetAllQueryDTO } from './dto/get-all-query.dto';
import { PaginatedOutputDTO } from 'src/@shared/pagination/dto/paginated_output.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Post()
  @ApiCreatedResponse({ type: PostOutputDTO })
  async create(@Body() data: CreatePostDto): Promise<PostPrisma> {
    return this.postService.create(data);
  }

  @Public()
  @Get()
  @ApiCreatedResponse({ type: PostOutputDTO })
  async readAll(
    @Query() query: GetAllQueryDTO,
  ): Promise<PostPrisma[] | PaginatedOutputDTO<PostOutputDTO>> {
    return this.postService.readAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ type: PostOutputDTO })
  @ApiParam({ name: 'id', type: Number })
  async readById(@ParamId('id') id: number): Promise<PostPrisma> {
    return this.postService.readById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PostOutputDTO })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @ParamId('id') id: number,
    @Body() data: UpdatePostDto,
  ): Promise<PostPrisma> {
    return this.postService.update(id, data);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostOutputDTO })
  @ApiParam({ name: 'id', type: Number })
  async delete(@ParamId('id') id: number): Promise<PostPrisma> {
    return this.postService.delete(id);
  }
}
