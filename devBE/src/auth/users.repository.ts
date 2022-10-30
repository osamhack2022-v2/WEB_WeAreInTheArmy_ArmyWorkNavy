import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@CustomRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {

        const { identifier, password, type, name, phone, organization, email, address } = createUserDto;

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const user = { identifier, password: hash, type, name, phone, organization, email, address };
        const userCreateSql = this.create(user);

        try {
            await this.save(userCreateSql);
        } catch (error) {
            if (error.errno === 1062) {
                throw new ConflictException("The username already exists.");
            } else {
                throw error;
            }
        }
        return user;
    }
}