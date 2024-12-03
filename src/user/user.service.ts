import { PrismaService } from 'src/@shared/prisma/prisma.service';
import { CreateUserDTO } from './dto/create_user.dto';
import { Prisma, User } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetAllQueryDTO } from './dto/get_all_query.dto';
import { createPaginator } from 'prisma-pagination';
import { UserOutputDTO } from './dto/output.dto';
import { EncryptService } from 'src/@shared/encrypt/encrypt.service';

@Injectable()
export class UserService {
  constructor(
    private encrypt: EncryptService,
    private prisma: PrismaService,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new HttpException(
        'E-mail already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.encrypt.hashString(data.password);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });
  }

  async readAll(query: GetAllQueryDTO) {
    if (query.page === 0) {
      return this.prisma.user.findMany({
        orderBy: {
          createdAt: query.created ?? 'desc',
        },
      });
    }

    const paginate = createPaginator({ perPage: query.perPage });

    return paginate<UserOutputDTO, Prisma.UserFindManyArgs>(
      this.prisma.user,
      {
        orderBy: {
          createdAt: query.created ?? 'desc',
        },
      },
      { page: query.page },
    );
  }
}
