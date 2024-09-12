import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PayloadToken } from '../model/token.model';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // Función validación de login email y password
  async validateUser(email: string, password: string) {
    console.log("token");

    const user = await this.usersService.getUsersByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...rta } = user.toJSON();
      return rta;
    }
    return null;
  }

  // Función para generar JWT
  generateJWT(user) {
    const payload: PayloadToken = {
      sub: user._id,
    }; 
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h', 
      }),
      user,
    };
  }

  // Función para verificar el token
  verifyToken(token: string): PayloadToken {
    console.log("token");
    
    let validation =  this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    }) as PayloadToken;
    return validation;
  }
}
