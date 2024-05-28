import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './modules/demo/demo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: '1',
        password: '1',
        database: '1',
        timezone: '+08:00',
        charset: 'utf8mb4',
        // entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
        autoLoadEntities: true,
      }),
    }),
    DemoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
