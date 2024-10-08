import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017", {
      user: "",
      pass: "",
      dbName: "Movie",
    }),
  ],
})
export class DatabaseModule {}
