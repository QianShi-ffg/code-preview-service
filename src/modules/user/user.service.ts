import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CustomException } from '../../exceptions/custom.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async login(createUserDto: CreateUserDto) {
    const { userName, passWord } = createUserDto;
    console.log(userName, passWord);
    const res = await this.UserRepository.findOne({ where: { userName } });
    if (res) {
      const res1 = await this.UserRepository.findOne({
        where: { userName, passWord },
        select: ['id', 'userName'],
      });
      if (res1) {
        return res1;
      } else {
        throw new CustomException('账号或密码错误', 404);
      }
    } else {
      throw new CustomException('不存在该用户', 200);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
