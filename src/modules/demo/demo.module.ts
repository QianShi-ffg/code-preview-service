import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { UserService } from '../user/user.service';
import { DemoController } from './demo.controller';
import { LoginGuard } from '../../login.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { Demo } from './entities/demo.entity';
import { UserModule } from '../user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Demo]), UserModule],
  controllers: [DemoController],
  providers: [
    DemoService,
    UserService,
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard,
    // },
  ],
})
export class DemoModule {}
