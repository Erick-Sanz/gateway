import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The name must not contain special characters',
  })
  @Length(3, 40)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The paternal surname must not contain special characters',
  })
  @Length(3, 40)
  paternalSurname: string;
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The maternal surname must not contain special characters',
  })
  @Length(3, 40)
  maternalSurname: string;
  @IsOptional()
  @Matches(/^\d+$/, {
    message: 'The phone number should only contain numbers.',
  })
  @IsString()
  @Length(10)
  phoneNumber: string;
  @IsEmail()
  @MaxLength(40)
  email: string;
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The userName must not contain special characters',
  })
  @IsString()
  @Length(5, 30)
  userName: string;
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  password: string;
}
