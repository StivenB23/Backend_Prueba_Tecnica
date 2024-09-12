import { Module } from "@nestjs/common";
import { UserController } from "./user/controller/user/user.controller";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
