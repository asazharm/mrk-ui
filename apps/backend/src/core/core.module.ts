import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../config/db-connect.config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Позволяет обратиться к env во всем приложении
      envFilePath: 'envs/.backend.env', // Указываем путь до env файла
    }),
    MongooseModule.forRootAsync({
      // Модуль для работы с mongo
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig, // добавляем созданную ранее функцию подключения к БД
    }),

    JwtModule.registerAsync({
      // Добавляем JWT-модуль и предаем данные из .env
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_KEY'),
          signOptions: {
            expiresIn: config.get<number>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class CoreModule {}
