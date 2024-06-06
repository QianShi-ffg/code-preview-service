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
import { ParseIntPipe } from '@nestjs/common';

@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  /**
   * 查询当前用户所有demo
   * @param userId 用户id
   * @returns
   */
  @Get('user/:userId')
  findPostsByUser(@Param('userId') userId: number) {
    return this.demoService.findPostsByUser(userId);
  }

  /**
   * 判断当前demo是否为当前用户所有
   * @param demoId demo id
   * @param userId 用户 id
   * @returns
   */
  @Get('belongsTo')
  isDemoBelongsToUser(
    @Query('demoId') demoId: number,
    @Query('userId') userId: number,
  ) {
    console.log(12312321, demoId, userId);
    const belongsTo = this.demoService.isDemoBelongsToUser(demoId, userId);
    return belongsTo;
  }

  @Post()
  create(@Body() createDemoDto: CreateDemoDto) {
    return this.demoService.create(createDemoDto);
  }

  @Get()
  // @UseGuards(LoginGuard)
  findAll(@Query() query: any) {
    return this.demoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    console.log('aaaaaaaaaaaaaaaaa');
    return this.demoService.update(+id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoService.remove(+id);
  }
}
