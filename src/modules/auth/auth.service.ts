import { Inject, Injectable } from '@nestjs/common';
import { AuthHelper } from 'src/modules/auth/auth.helper';
import { UserRepository } from './repository/user-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthHelper) private readonly authHelper: AuthHelper,
    private readonly userRepository: UserRepository,
  ) {}

  async adminLogin(payload: any) {
    try {
      const userCondition = {
        select: {
          id: true,
          email: true,
          mobile_number: true,
          name: true,
          password: true,
        },
        where: {
          email: payload.email,
        },
      };
      const user = await this.userRepository.findOne(
        userCondition.select,
        userCondition.where,
      );
      if (!user) {
        return { status: false, message: 'User with this email not found.' };
      }
      const isPasswordMatch = this.authHelper.isPasswordValid(
        payload.password,
        user.password,
      );
      if (!isPasswordMatch) {
        return { status: false, message: 'Invalid credentials.' };
      }
      const accessToken = await this.authHelper.generateToken({
        id: user?.id,
        email: user?.email,
      });

      delete user.password;
      return {
        status: true,
        message: 'Login successfull.',
        data: { accessToken: accessToken, user: user },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProfile(request: any, payload: any) {
    try {
      const authId = request.auth.id;
      const password = await this.userRepository.update(
        {
          id: authId,
        },
        {
          email: payload.email,
          name: payload.name,
          password: await bcrypt.hash(payload.password, 10),
        },
      );
      return {
        status: true,
        message: 'Profile updated successfully.',
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
