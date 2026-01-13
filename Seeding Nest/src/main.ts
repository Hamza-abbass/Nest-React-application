import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'http://localhost:3001',
    methods:'GET,POST,PUT,DELETE',
    Credentials:true,
  })
  await app.listen(3000);


}

bootstrap();
