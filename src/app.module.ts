import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './@shared/auth/auth.guard';
import { AuthModule } from './@shared/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
