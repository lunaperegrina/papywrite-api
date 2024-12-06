import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserOutputDTO implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
