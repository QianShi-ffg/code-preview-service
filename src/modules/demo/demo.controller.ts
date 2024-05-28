import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { LoginGuard } from 'src/login.guard';

@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  // @Post()
  // create(@Body() createDemoDto: CreateDemoDto) {
  //   return this.demoService.create(createDemoDto);
  // }

  @Get()
  // @UseGuards(LoginGuard)
  async findAll(@Query() query: any) {
    const res = await this.demoService.findAll(query);
    console.log(res);
    return {
      code: 200,
      message: 'success',
      data: res,
      // total: Number(res1.count),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.demoService.findOne(+id);
    return {
      code: 200,
      message: 'success',
      data: res,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
  //   return this.demoService.update(+id, updateDemoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoService.remove(+id);
  }
}
