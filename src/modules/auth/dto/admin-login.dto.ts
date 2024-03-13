import { IsEmail, IsNotEmpty } from 'class-validator';
import { ValidatePassword } from 'src/common/custom-validation-decorators';

export class AdminLoginDto {
  @IsNotEmpty({ message: 'Email field is required' })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @ValidatePassword()
  readonly password: string;
}
