import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getByEmail(userDto.email);
        const equalPassword = await bcrypt.compare(userDto.password, user?.password || '');
        if (equalPassword) return user;

        throw new UnauthorizedException({ message: 'Неверный пароль или email' });
    }

    async registration(userDto: CreateUserDto) {
        const foundUser = await this.userService.getByEmail(userDto.email);
        if (foundUser) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);

        const user = await this.userService.create({ ...userDto, password: hashPassword });

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { id: user.id, email: user.email, roles: user.roles };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
