import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PostOutputDTO implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
