import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/@shared/prisma/prisma.service';
import { EncryptService } from 'src/@shared/encrypt/encrypt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, EncryptService],
})
export class UserModule {}
