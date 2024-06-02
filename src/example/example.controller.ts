import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('example')
export class ExampleController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected() {
    return 'This route is protected';
  }
}
