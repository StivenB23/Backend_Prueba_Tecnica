import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../entities/user.entity";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import type { CreateUserDto } from "../dto/create-user.dto";
import { FilterUsersDto } from "../dto/filter-user.dto";
import type { UpdateUserDto } from "../dto/update-user.dto";
import axios from "axios";
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async getAllusers(params?: FilterUsersDto): Promise<User[]> {
    if (params) {
      const { limit, offset } = params;
      return await this.userModel.find().skip(offset).limit(limit).exec();
    }
    return await this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async createUser(data: CreateUserDto) {
    console.log(data);
    const userExist = await this.userModel.findOne({ email: data.email }).exec();

    if (userExist) {
      throw new BadRequestException("El correo ya se encuentra registrado, ingrese oto por favor");
    }

    const newModel = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newModel.password, 10);
    newModel.password = hashPassword;
    const model = await newModel.save();
    const { password, ...user } = model.toJSON();
    return user;
  }

  async getUsersByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }

  async deleteUser(id: string) {
    const userDeleted = await this.userModel.updateOne({ _id: id }, { isDeleted: true }).exec();
    return userDeleted;
  }
  async updatedUserById(userId: string, userNew: UpdateUserDto): Promise<User> {
    const userUpdated = await this.userModel
      .findByIdAndUpdate(userId, userNew, { new: true })
      .exec();
    if (!userUpdated) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return userUpdated;
  }

  async deleteUserById(userId: string): Promise<User> {
    const userDeleted = await this.userModel
      .findByIdAndUpdate(userId, { isDeleted: true }, { new: true })
      .exec();
    if (!userDeleted) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return userDeleted;
  }

  // Favorites

  async addFavoriteToUser(userId: string, { favorites }: UpdateUserDto): Promise<void> {
    await this.userModel
      .findByIdAndUpdate(userId, { $push: { favorites: favorites } }, { new: true })
      .exec();
  }

  async removeFavoriteMovie(userId: string, idMovie: number): Promise<void> {
    await this.userModel
      .findByIdAndUpdate(userId, { $pull: { favorites: idMovie } }, { new: true })
      .exec();
  }

  async getFavoritesUser(userId: string) {
    let favoritesMovies = [];

    const user = await this.userModel.findById(userId).exec();
    const movies = await axios.get(`${process.env.TMDB_HOSTNAME}discover/movie`, {
      params: {
        api_key: process.env.TMDB_TOKEN,
      },
    });
    favoritesMovies = movies.data.results.filter((movie) => {
      return user?.toJSON().favorites.includes(movie.id);
    });
    return favoritesMovies;
  }
}
