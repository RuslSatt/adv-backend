import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleDTO } from './dto/role.dto';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @Post()
    async create(@Body() role: RoleDTO) {
        return this.roleService.create(role);
    }

    @Get('/:value')
    async getByValue(@Param('value') value: string) {
        return this.roleService.getByValue(value);
    }
}
