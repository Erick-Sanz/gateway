import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LogoutDto {
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  userId: string;
}
