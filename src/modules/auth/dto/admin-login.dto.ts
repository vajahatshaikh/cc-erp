import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class AdminLoginDto {
  @IsNotEmpty({ message: 'Email field is required' })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Matches(/^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/, {
    message: 'Password must be atleast 8 characters and must contain 1 Capital, 1 small, 1 digit and 1 special character.'
  })
  readonly password: string;
}
