import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255, unique: true })
    email: string;

    @Column('varchar')
    password: string;

    @Column('varchar', { length: 255 })
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[]


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLocaleLowerCase().trim()
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.email = this.email.toLocaleLowerCase().trim()
    }

}
