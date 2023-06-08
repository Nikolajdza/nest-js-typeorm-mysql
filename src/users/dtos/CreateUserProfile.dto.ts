import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  dob?: string;
}
