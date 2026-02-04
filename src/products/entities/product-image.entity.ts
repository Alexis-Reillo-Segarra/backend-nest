import { Entity, PrimaryGeneratedColumn, Column, ForeignKey, ManyToOne } from "typeorm";
import { Product } from ".";

@Entity()
export class ProductImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(
        () => Product,
        (product) => product.images,
        { onDelete: 'CASCADE' }
    )
    product: Product
}