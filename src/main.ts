import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuración Swagger para documdentación
  const config = new DocumentBuilder()
    .setTitle("API QuickbetMovies")
    .setDescription("Api Rest")
    .setVersion("1.0")
    .setContact("Albert Ospina", "url", "stiven23ospina@gmail.com")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  await app.listen(3300);
}
void bootstrap();
