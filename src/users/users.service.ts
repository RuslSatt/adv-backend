import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepo: typeof User,
        private roleService: RolesService
    ) {}

    async create(dto: CreateUserDto) {
        const user = await this.userRepo.create(dto);
        const role = await this.roleService.getByValue('User');
        await user.$set('roles', [role.id]);
        return user;
    }

    async getAll() {
        const users = await this.userRepo.findAll({ include: { all: true } });
        return users;
    }
}
