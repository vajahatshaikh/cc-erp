import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthHelper {
  constructor(private readonly jwtService: JwtService) {}

  //Decofing JWT token
  public decode(token: string): Promise<any> {
    return this.jwtService.decode(token, null);
  }

  //Generate JWT token
  public generateToken(payload: any) {
    return this.jwtService.signAsync({
      id: payload?.id,
      email: payload?.email,
    });
  }

  //Validate user password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // encode user's password
  public encodePassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  //Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async validate(token: string): Promise<any | never> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new Error(error);
    }
  }
}
