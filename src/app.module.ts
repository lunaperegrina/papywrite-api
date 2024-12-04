import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './@shared/auth/auth.guard';
import { AuthModule } from './@shared/auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, AuthModule, PostModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
