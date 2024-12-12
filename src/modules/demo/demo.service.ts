import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { Demo } from './entities/demo.entity';
import { CustomException } from '../../exceptions/custom.exception';
import * as babel from '@babel/core';
import '@babel/preset-env';

@Injectable()
// @UseFilters(NotFoundFilter)
export class DemoService {
  constructor(
    @InjectRepository(Demo)
    private DemoRepository: Repository<Demo>,
    // private readonly userService: UserService,
  ) {}
  async create(createDemoDto: CreateDemoDto) {
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
        .select(['demo.id', 'demo.name', 'demo.description', 'demo.updataTime'])
        // .orderBy('id', sort)
        // .skip((page - 1) * pageSize)
        // .take(pageSize)
        .getMany()
    );
  }

  findOne(id: number) {
    // return this.DemoRepository.findOne({
    //   where: { id },
    //   relations: ['user'], // typeorm默认不查询关联信息,需要设置
    // });
    return this.DemoRepository.createQueryBuilder('demo')
      .leftJoinAndSelect('demo.user', 'user') // 加入 user 关系
      .select([
        'demo.id as id',
        'demo.name as name',
        'demo.html as html',
        'demo.css as css',
        'demo.javascript as javascript',
        'demo.htmlLanguage as htmlLanguage',
        'demo.cssLanguage as cssLanguage',
        'demo.jsLanguage as jsLanguage',
        'demo.description as description',
        'user.id as userId', // 选择 user 的 id
      ])
      .where('demo.id = :id', { id })
      .getRawOne();
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

  async running(createDemoDto: CreateDemoDto, req: any) {
    const { javascript, css } = createDemoDto; 
    // babel处理js
    let babelConfig: any = {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true, //使用esmodules
            },
            modules: false, // 不要将 ES6 模块转换为其他模块系统（如 CommonJS）
            loose: false, // 使用严格模式进行转换
            useBuiltIns: 'usage', // 当设置为"usage"时，Babel 会根据代码中实际使用的 ES2021 及之前的内置函数和方法，自动添加corejs模块的相应polyfill
            corejs: 3, // 用于提供polyfill支持
            include: [
              'transform-arrow-functions'  // 启用箭头函数
            ],
            exclude: ['transform-async-to-generator', 'transform-block-scoping'],  // 排除转换插件
            shippedProposals: false,
            bugfixes: false,
            forceAllTransforms: false,
            ignoreBrowserslistConfig: false,
            debug: false,
          },
        ],
      ],
    };
    // babelConfig.presets[0][1].targets.browsers = [`${browserInfo.browser.name} ${browserInfo.browser.version}`]
    // babelConfig.presets[0][1].targets.browsers = [`${browserInfo.browser.name} ${browserInfo.browser.version}`]
    const jsResult = await babel.transform(javascript, babelConfig);

    return [
      {
        javascript: jsResult
      },
    ];
  }
}
