import { Controller, Get, Post, Body, Param, ValidationPipe, Req, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';

@Controller('api/auth/')
@ApiTags('Users and Authentication API')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@ApiOperation({ summary: '[Post] signUp / (Body:CreateUserDto) => {user_object}' })
	@Post('/signup')
	signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<CreateUserDto> {
		return this.authService.signUp(createUserDto);
	}

	@Post('/signin')
	@ApiOperation({ summary: '[Post] signIn / (Body:AuthCredentialDto) => {user_object, bearer_token}' })
	signIn(
		@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
	): Promise<{ user: User, accessToken: string }> {
		return this.authService.signIn(authCredentialsDto);
	}

	@Get('/getUserInfo/:identifier')
	@ApiOperation({ summary: '[Get] get user info from identifier / (ID:string) => {user_object}' })
	getUserInfo(@Param("identifier") identifier: string): Promise<User> {
		return this.authService.getUserInfo(identifier);
	}

	@Get('/getUserInfoByAuth')
	@UseGuards(AuthGuard())
	@ApiOperation({ summary: '[Get] get user info from authenticated token / () => {user_object}' })
	getUserInfoByAuth(@Req() req): Promise<User> {
		return req.user;
	}
}
