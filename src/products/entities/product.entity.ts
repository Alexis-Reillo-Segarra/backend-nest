import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    title: string;

    @Column('text', { nullable: true })
    description: string;

    @Column('varchar', { length: 255, unique: true })
    slug: string;

    @Column('decimal', { default: 0 })
    price: number;

    @Column('int', { default: 0 })
    stock: number;

    // tags
    // images

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
