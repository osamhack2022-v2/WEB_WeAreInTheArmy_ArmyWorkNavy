import { AccountTypes, User } from "src/auth/entities/users.entity";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { AcceptanceStatus, Board } from "./entities/board.entity";
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UnitJoinDto } from './dto/unit-join.dto';
import { SoldierJoinDto } from './dto/soldier-join.dto';
import { NotAcceptableException } from '@nestjs/common';
import { SetStatusDto } from './dto/set-status.dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { type, title, description, location, admit, image } = createBoardDto;

        const board = this.create({
            identifier: user.identifier, type, title, description, location, admit, image, status: AcceptanceStatus.PENDING, done: false, user
        });
        await this.save(board);
        return board;
    }

    async updateBoard(idx: number, updateBoardDto: UpdateBoardDto, user: User): Promise<Board> {
        const { type, title, description, location, admit, image, status, done, participants } = updateBoardDto;

        const board = await this.findOne(
            {
                where: {
                    idx,
                    user: {
                        identifier: user.identifier
                    },
                }
            });
        board.type = type || board.type;
        board.title = title || board.title;
        board.description = description || board.description;
        board.location = location || board.location;
        board.admit = admit || board.admit;
        board.image = image || board.image;
        board.status = status || board.status;
        board.done = done || board.done;
        board.participants = JSON.stringify(participants) || board.participants;

        await this.save(board);
        return board;
    }

    async getBoardsByIdentifier(identifier: string): Promise<Board[]> {
        const query = this.createQueryBuilder("board");

        query.where("board.identifier = :identifier", { identifier: identifier })

        const boards = await query.getMany();

        return boards;
    }

    async deleteBoard(idx: number, user: User): Promise<void> {
        try {
            const result = await this.createQueryBuilder()
                .delete()
                .from("board")
                .where("idx=:idx", { idx })
                .andWhere("identifier=:identifier", { identifier: user.identifier })
                .execute();
            console.log("result:", result);
        } catch {
            throw new NotFoundException(`Can't find board with idx: ${idx}`);
        }
    }

    async unitParticipate(unitJoinDto: UnitJoinDto, user: User): Promise<Board> {
        if (user.type !== AccountTypes.ADMINISTRATOR) {
            throw new UnauthorizedException(`Only administrator allowed, your account type: ${user.type}`);
        }

        const { board_idx, unit, password } = unitJoinDto;
        try {
            const board = await this.findOneBy({ idx: board_idx });
            let participants;
            if (!board.participants) {
                participants = {
                    units: {},
                    soldiers: {},
                }
            } else {
                participants = JSON.parse(board.participants);
            }

            participants.units[user.identifier] = {
                unit,
                password,
            }

            board.participants = JSON.stringify(participants);

            await this.save(board);
            return board;
        } catch (err) {
            throw err;
        }
    }

    async unitCancelParticipation(idx:number, user:User): Promise<Board> {
        try {
            const board = await this.findOneBy({idx});
            const participants = JSON.parse(board.participants);
            const participationInfo = participants.units[user.identifier];
            delete participants.units[user.identifier];
            for (const prop in participants.soldiers) {
                const soldierObject = participants.soldiers[prop];
                if (soldierObject.unit === participationInfo.unit) {
                    delete participants.soldiers[prop]
                }
            }

            board.participants = JSON.stringify(participants);
            await this.save(board);
            return board;
        } catch (err) {
            throw err;
        }

    }

    async soldierParticipate(soldierJoinDto: SoldierJoinDto, user: User): Promise<Board> {
        if (user.type !== AccountTypes.MILLITARY) {
            throw new UnauthorizedException(`Only MILLITARY user allowed, your account type: ${user.type}`);
        }

        const { board_idx, name, unit, serial_number, password } = soldierJoinDto;

        try {
            const board = await this.findOneBy({ idx: board_idx });
            let participants;
            if (!board.participants) {
                participants = {
                    units: {},
                    soldiers: {},
                }
                throw new NotAcceptableException(`Your unit didn't joined this request yet.`)
            }

            participants = JSON.parse(board.participants);


            let found = {};
            for (const prop in participants.units) {
                const unitObject = participants.units[prop]
                if (unitObject.unit === unit && unitObject.password === password) {
                    found = unitObject;
                }
            }

            if (Object.keys(found).length===0) {
                throw new NotAcceptableException(`Your unit didn't joined this request yet.`);
            }

            participants.soldiers[user.identifier] = {
                name,
                unit,
                serial_number
            }

            board.participants = JSON.stringify(participants);
            await this.save(board);
            return board;

        } catch (err) {
            throw err;
        }
    }

    async soldierCancelParticipation(idx:number, user:User): Promise<Board> {
        try {
            const board = await this.findOneBy({idx});
            const participants = JSON.parse(board.participants);

            delete participants.soldiers[user.identifier];
            board.participants = JSON.stringify(participants);
            await this.save(board);
            return board;
        } catch (err) {
            throw err;
        }

    }

    async setStatus(setStatusDto: SetStatusDto, user:User): Promise<Board> {
        const {board_idx, status} = setStatusDto;
        try {
            if (user.type!=="administrator" ) {
                throw new UnauthorizedException(`Only ADMINISTRATOR user allowed, your account type: ${user.type}`);
            }
            const board = await this.findOneBy({idx: board_idx});
            board.status = status;
            await this.save(board);
            return board;
        } catch (err) {
            throw err;
        }
    }

    async setDone(idx: number, user: User): Promise<Board> {
        try {
            const board = await this.findOneBy({idx});
            if (board.identifier !== user.identifier) {
                throw new UnauthorizedException(`Only post writer can check done, writer: ${board.identifier}`);
            }
            board.done = true;
            await this.save(board);
            return board;
        } catch (err) {
            throw err;
        }
    }

}