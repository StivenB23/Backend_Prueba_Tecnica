import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../services/auth.service";
import { ApiTags } from "@nestjs/swagger";
@Controller("api/auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private AuthService: AuthService) { }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Req() req: Request) {
    const user = req.user as User;
    console.log(user);
    return this.AuthService.generateJWT(user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("testauth")
  test(@Req() req: Request) {
    console.log(req.user);
    return process.env.JWT_SECRET;
  }
}
