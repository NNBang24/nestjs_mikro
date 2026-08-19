import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const orm = app.get(MikroORM);
    const PORT = process.env.PORT || 5000;
    if (await orm.isConnected()) {
      console.log('ket noi database thanh cong ');
    }
    await app.listen(PORT, () => {
      console.log(`Server dang chay tai  http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Loi ket noi:', error);
  }
}
void bootstrap();
