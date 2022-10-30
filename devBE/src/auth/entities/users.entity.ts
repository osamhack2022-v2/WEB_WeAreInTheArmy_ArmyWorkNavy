import { ApiProperty } from "@nestjs/swagger";
import { Board } from "src/board/entities/board.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum AccountTypes {
    ADMINISTRATOR = "administrator",
    CITIZEN = "citizen",
    MILLITARY = "millitary",
    DEFAULT = "default"
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "[primary] index of user account" })
    idx: number;

    @Column({ unique: true })
    @ApiProperty({ description: "[unique] identifier(ID)" })
    identifier: string;

    @Column()
    @ApiProperty({ description: "password(hashed)" })
    password: string;

    @Column({
        type: "enum",
        enum: AccountTypes,
        default: AccountTypes.DEFAULT,
    })
    @ApiProperty({ description: "account type: administrator, citizen, millitary" })
    type: AccountTypes;

    @Column()
    @ApiProperty({ description: "user name" })
    name: string;

    @Column()
    @ApiProperty({ description: "phone number" })
    phone: string;

    @Column({ nullable: true })
    @ApiProperty({ description: "[opt] organization" })
    organization: string;

    @Column({ nullable: true })
    @ApiProperty({ description: "[opt] email" })
    email: string;

    @Column({ nullable: true })
    @ApiProperty({ description: "[opt] address" })
    address: string;

    @CreateDateColumn()
    @ApiProperty({ description: "createdAt - auto created" })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: "updatedAt - auto created" })
    updatedAt: Date;

    @OneToMany(() => Board, (board) => board.user, { cascade: true})
    boards: Board[];
}
