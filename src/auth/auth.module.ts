import { Module } from "@nestjs/common";
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserService } from "src/user/services/user.service";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [UserModule, PassportModule, JwtModule.registerAsync({
    inject:[],
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
