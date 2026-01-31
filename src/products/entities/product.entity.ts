import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    title: string;

    @Column('text')
    description: string;

    @Column('varchar', { length: 255, unique: true })
    slug: string;

    @Column('money', { default: 0 })
    price: number;

    @Column('int', { default: 0 })
    stock: number;

    // tags
    // images


}
