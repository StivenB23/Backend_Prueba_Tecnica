import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../services/auth.service';
import { Strategy } from 'passport-local';
import { PayloadToken } from '../model/token.model';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('not allow');
    }
    return user;
  }

  generateJWT(user: User) {
    const payload:PayloadToken = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }
}
