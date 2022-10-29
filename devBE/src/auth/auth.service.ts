import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from "bcryptjs";
import { User } from './entities/users.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UsersRepository) // delete if error occured
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) { }

  async signUp(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersRepository.createUser(createUserDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ user: User, accessToken: string }> {

    const { identifier, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ identifier });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create user token (secret + payload)
      const payload = { identifier };
      const accessToken = await this.jwtService.sign(payload);
      return { user, accessToken };
    } else {
      throw new UnauthorizedException("Login failed");
    }
  }

  async getUserInfo(identifier: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({identifier});
      return user;
    } catch (err) {
      throw err;
    }
  }


  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
