import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @ApiProperty()
  authorId: number;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsString()
  @ApiProperty()
  slug: string;
}
