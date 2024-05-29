// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
