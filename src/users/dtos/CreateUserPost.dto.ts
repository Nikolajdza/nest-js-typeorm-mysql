import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserPostDto {
  @IsNotEmpty()
  @IsString()
  title;

  @IsNotEmpty()
  @IsString()
  description;
}
