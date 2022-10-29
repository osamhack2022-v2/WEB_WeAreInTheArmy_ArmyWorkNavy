import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ValidationPipe,
	Req,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';

@Controller('api/auth/')
@ApiTags('Users and Authentication API')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('/signup')
	@ApiOperation({ summary: 'createUser API' })
	signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<CreateUserDto> {
		return this.authService.signUp(createUserDto);
	}

	@Post('/signin')
	@ApiOperation({ summary: 'authenticateCredentials API' })
	signIn(
		@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
	): Promise<{ user: User, accessToken: string }> {
		return this.authService.signIn(authCredentialsDto);
	}

	@Get('/getUserInfo/:identifier')
	@ApiOperation({ summary: 'get user object from identifier' })
	getUserInfo(@Param("identifier") identifier: string): Promise<User> {
		return this.authService.getUserInfo(identifier);
	}

	@Get('/getUserInfoByAuth')
	@UseGuards(AuthGuard())
	@ApiOperation({ summary: 'get user object from authenticated client API' })
	getUserInfoByAuth(@Req() req): Promise<User> {
		return req.user;
	}

	/*
  @Get()
  findAll() {
	return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
	return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
	return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
	return this.authService.remove(+id);
  }
  */
}
