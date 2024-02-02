import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { RoleDTO } from './dto/role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private RoleModel: typeof Role) {}

    async create(dto: RoleDTO) {
        const role = await this.RoleModel.create(dto);
        return role;
    }

    async getByValue(value: string) {
        const role = await this.RoleModel.findOne({ where: { value }, include: { all: true } });
        return role;
    }
}
