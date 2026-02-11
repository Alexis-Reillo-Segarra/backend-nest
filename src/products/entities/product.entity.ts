import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from ".";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Product {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column('varchar', { length: 255 })
    title: string;

    @ApiProperty()
    @Column('text', { nullable: true })
    description: string;

    @ApiProperty()
    @Column('varchar', { length: 255, unique: true })
    slug: string;

    @ApiProperty()
    @Column('decimal', { default: 0 })
    price: number;

    @ApiProperty()
    @Column('int', { default: 0 })
    stock: number;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .toLowerCase();;
        }
        else {
            this.slug = this.slug
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .toLowerCase();;
        }
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        if (!this.slug) {
            this.slug = this.title
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .toLowerCase();;
        }
        else {
            this.slug = this.slug
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .toLowerCase();;
        }
    }

}
