import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const adminEmail = 'admin@gmail.com';

    const existingAdmin = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const password = await bcrypt.hash('Admin@123', 10); // secure default

      const adminUser = this.userRepository.create({
        name: 'Admin',
        email: adminEmail,
        password,
        role: 'admin',
      });

      await this.userRepository.save(adminUser);
      console.log('✅ Default admin user created.');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }
  }

  async create(data: Partial<User>) {
    const existing = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('A user with this email already exists');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findAll({
    search,
    page,
    limit,
  }: {
    search?: string;
    page: number;
    limit: number;
  }) {
    const query = this.userRepository.createQueryBuilder('user');
    query.where('user.role = :role', { role: 'user' });
    if (search) {
      query.andWhere('user.name ILIKE :search OR user.email ILIKE :search', {
        search: `%${search}%`,
      });
    }

    // Pagination
    query.skip((page - 1) * limit).take(limit);

    // Optional: Order by created date
    query.orderBy('user.createdAt', 'DESC');

    const [users, total] = await query.getManyAndCount();

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);

    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: 'User deleted successfully' };
  }
}
