import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { Demo } from './entities/demo.entity';
import { CustomException } from '../../exceptions/custom.exception';
import { UserService } from '../user/user.service';
@Injectable()
// @UseFilters(NotFoundFilter)
export class DemoService {
  constructor(
    @InjectRepository(Demo)
    private DemoRepository: Repository<Demo>,
    private readonly userService: UserService,
  ) {}
  async create(createDemoDto: CreateDemoDto) {
    console.log(createDemoDto);
    const { name } = createDemoDto;
    const res = await this.DemoRepository.findOne({ where: { name } });
    if (res) {
      throw new CustomException('Demo名称重复', 200);
    } else {
      return this.DemoRepository.save(createDemoDto);
    }
  }

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
    return this.DemoRepository.createQueryBuilder('demo')
      .where('demo.id = :id', { id: id })
      .getOne();
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    console.log(id, updateDemoDto);
    return this.DemoRepository.update(id, updateDemoDto);
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }

  findPostsByUser(userId: number): Promise<Demo[]> {
    return this.DemoRepository.find({
      where: { user: { id: userId } },
    });
  }

  async isDemoBelongsToUser(demoId: number, userId: number): Promise<boolean> {
    const res = await this.DemoRepository.findOne({
      where: { id: demoId, user: { id: userId } },
    });
    console.log(res);
    return !!res;
  }
}
