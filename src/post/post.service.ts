import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/@shared/prisma/prisma.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetAllQueryDTO } from './dto/get-all-query.dto';
import { createPaginator } from 'prisma-pagination';
import { PostOutputDTO } from './dto/output.dto';
import { Prisma } from '@prisma/client';
import { customAlphabet } from 'nanoid';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    const slug = await this.generateSlug(data.title);
    return this.prisma.post.create({
      data: {
        author_id: data.author_id,
        title: data.title,
        content: data.content,
        slug,
      },
    });
  }

  async readAll(query: GetAllQueryDTO) {
    if (query.page === 0) {
      return this.prisma.post.findMany({
        orderBy: {
          created_at: query.created ?? 'desc',
        },
      });
    }

    const paginate = createPaginator({ perPage: query.perPage });

    return paginate<PostOutputDTO, Prisma.PostFindManyArgs>(
      this.prisma.post,
      {
        orderBy: {
          created_at: query.created ?? 'desc',
        },
      },
      { page: query.page },
    );
  }

  async readById(id: number) {
    await this.exists(id);

    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async readByAuthorId(id: number) {
    console.log(id);
    return this.prisma.post.findMany({
      where: {
        author_id: id,
      },
    });
  }

  async update(id: number, data: UpdatePostDto) {
    await this.exists(id);

    return this.prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.post.delete({
      where: { id },
    });
  }

  async exists(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }
  }

  async generateSlug(title: string): Promise<string> {
    const nanoid = await customAlphabet(
      '0123456789abcdefghijklmnopqrstuvwxyz',
      8,
    );

    const sanitizedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${sanitizedTitle}-${nanoid()}`;
  }
}
