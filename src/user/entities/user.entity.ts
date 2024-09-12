import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty({ description: "This is _id of user", required: true })
  @Prop()
  name: string = "";

  @ApiProperty({ description: "This is _id of user", required: true })
  @Prop()
  lastname: string = "";

  
  @ApiProperty({ description: "This is email of user", required: true })
  @Prop({ unique: true })
  email: string = "";

  @ApiProperty({ description: "This is password of user", required: true })
  @Prop()
  password: string = "";

  @ApiProperty({ description: "List favorite users" })
  @Prop()
  favorites: string[] = [];

  @ApiProperty({ description: "Is deleted" })
  @Prop({ default: false })
  isDeleted: boolean = false;
}

export const UserSchema = SchemaFactory.createForClass(User).set("versionKey", false);
