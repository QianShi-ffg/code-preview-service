import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { Demo } from './entities/demo.entity';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(Demo)
    private DemoRepository: Repository<Demo>,
  ) {}

  // create(createDemoDto: CreateDemoDto) {
  //   return 'This action adds a new demo';
  // }

  findAll(query) {
    const { page, pageSize, sort } = query;
    return (
      this.DemoRepository.createQueryBuilder('demo')
        .select(['demo.id', 'demo.name', 'demo.desc', 'demo.updataTime'])
        // .orderBy('id', sort)
        // .skip((page - 1) * pageSize)
        // .take(pageSize)
        .getMany()
    );
  }

  findOne(id: number) {
    return (
      this.DemoRepository.createQueryBuilder('demo')
        // .orderBy('id', sort)
        // .skip((page - 1) * pageSize)
        // .take(pageSize)
        .where('demo.id = :id', { id: id })
        .getOne()
    );
  }

  // update(id: number, updateDemoDto: UpdateDemoDto) {
  //   return `This action updates a #${id} demo`;
  // }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
