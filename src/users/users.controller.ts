import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 201, type: [User] })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 201, type: [User] })
    @UseGuards(AuthGuard)
    @Get()
    getAll() {
        return this.usersService.getAll();
    }
}
