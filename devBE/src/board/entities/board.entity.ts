import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/users.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum RequestTypes {
    ENVIROMENTAL = "enviromental",
    DISASTOR = "disastor",
    SOCIAL = "social",
    DEFAULT = "default"
}

export enum AcceptanceStatus {
    PENDING = "pending",
    ACCPEPTED = "accepted",
    DENIED = "denied",
}

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "[primary] index" })
    idx: number;
    
    @Column()
    @ApiProperty({ description: "identifier" })
    identifier: string;
    
    @Column({
        type: "enum",
        enum: RequestTypes,
        default: RequestTypes.DEFAULT,
    })
    @ApiProperty({ description: "request types: enviromental, disastor, social, default" })
    type: RequestTypes;

    @Column()
    @ApiProperty({ description: "request title" })
    title: string;

    @Column({ type: "text" })
    @ApiProperty({ description: "request description" })
    description: string;

    @Column()
    @ApiProperty({ description: "request location" })
    location: string;

    @Column()
    @ApiProperty({ description: "agreement of providing personal information" })
    admit: boolean;

    @Column({ nullable: true })
    @ApiProperty({ description: "image of the place" })
    image: string;

    @Column({
        type: "enum",
        enum: AcceptanceStatus,
        default: AcceptanceStatus.PENDING,
    })
    @ApiProperty({ description: "Acceptance Status: pending, accepted, denied" })
    status: AcceptanceStatus;

    @Column({type: "text", nullable: true})
    @ApiProperty({ description: "likes" })
    likes: string;

    @Column()
    @ApiProperty({ description: "done or not" })
    done: boolean;

    @Column({ type: "longtext", nullable: true })
    @ApiProperty({ description: "json data of admin/soldier on the request" })
    participants: string;

    @CreateDateColumn()
    @ApiProperty({ description: "createdAt - auto created" })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: "updatedAt - auto created" })
    updatedAt: Date;

    @JoinColumn({referencedColumnName: "identifier", name: "identifier"})
    @ManyToOne(() => User, (user) => user.boards, { onDelete: "CASCADE", lazy: true})
    user: User;
}
