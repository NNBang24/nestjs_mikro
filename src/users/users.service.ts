import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entitys/user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: EntityRepository<User>,
  ) {}

  getHashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };
  async create(createUserDto: CreateUserDto) {
    // return createUserDto;
    // async create(email: string, password: string, name: string) {
    const hashPassword = this.getHashPassword(createUserDto.password);
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: hashPassword,
      name: createUserDto.name,
    });
    await this.usersRepository.getEntityManager().flush();
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async findOne(id: string) {
    const numberID = Number(id);
    if (isNaN(numberID)) {
      throw new BadRequestException(`ID nguoi dung khong hop le ${id}`); // day la loi 400
    }
    const user = await this.usersRepository.findOne({
      id: Number(id),
    });
    if (!user) {
      throw new NotFoundException(`khong tim thay nguoi dung voi id: ${id}`);
    }
    return user;
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({
      email: username,
    });
  }

  isValidPassword(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`khong tim thay nguoi dung id : ${id}`);
    }

    this.usersRepository.assign(user, updateUserDto);
    await this.usersRepository.getEntityManager().flush();
    return user;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`khong tim thay nguoi dung id : ${id}`);
    }

    const em = this.usersRepository.getEntityManager();
    em.remove(user);
    await em.flush();

    return {
      message: `da xoa thanh cong nguoi dung id: ${id}`,
    };
  }
}
