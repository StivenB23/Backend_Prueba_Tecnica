import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { MongoIdPipe } from "src/common/mongo-id/mongo-id.pipe";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { FilterUsersDto } from "src/user/dto/filter-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import type { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/services/user.service";
import { Request } from "express";
import { PayloadToken } from "src/auth/model/token.model";
@Controller("api/users")
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("test")
  test(@Query() params: FilterUsersDto) {
   console.log(process.env.NODE_ENV);
   return ""
  }

  @Get()
  findAll(@Query() params: FilterUsersDto) {
    return this.userService.getAllusers(params);
  }
  
  @Get(":id")
  findOne(@Param("id", MongoIdPipe) id: string) {
    return this.userService.getUserById(id);
  }
  
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.createUser(payload);
  }
  
  @Post('/signup')
  signUpUser(@Body() payload: CreateUserDto) {
    return this.userService.createUser(payload);
  }
  
  @Put(":id")
  update(@Param("id") id: string, @Body() payload: UpdateUserDto): Promise<User> {
    return this.userService.updatedUserById(id, payload);
  }
  
  @Delete(":id")
  deledtUser(@Param("id") id: string): Promise<User> {
    return this.userService.deleteUserById(id);
  }
  
  @Get(":id/movies/favorites")
  findMoviesFavorites(@Param("id") id: string) {
    return this.userService.getFavoritesUser(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("movies/favorites")
  favoriteUser(@Body() payload: UpdateUserDto, @Req() req: Request) {
    const headJWT: PayloadToken = req.user as PayloadToken; 
    return this.userService.addFavoriteToUser(headJWT.sub, payload); 
  }
  
  @UseGuards(AuthGuard("jwt"))
  @Delete("movies/favorites/:id")
  deleteFavoriteUser(@Param('id') id: string, @Req() req: Request) {
    const headJWT: PayloadToken = req.user as PayloadToken; 
    return this.userService.removeFavoriteMovie(headJWT.sub, Number(id));
  }
}
