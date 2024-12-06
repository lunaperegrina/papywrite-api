import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PostOutputDTO implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  author_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  banner: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
