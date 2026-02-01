import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { title } from 'process';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);

      await this.productRepository.save(product);

      return product;

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.productRepository.find(
      {
        take: limit,
        skip: offset
      }
    )
  }

  async findOne(term: string) {

    let product: Product | null;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    }
    else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder.where(`LOWER(title) =:title or LOWER(slug) =:slug`, { title: term.toLocaleLowerCase(), slug: term.toLocaleLowerCase() }).getOne();
    }



    if (!product)
      throw new NotFoundException(`Product whit term ${term} was not found`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {


    try {
      const product = await this.productRepository.preload({
        id: id,
        ...updateProductDto
      });
      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`)

      return await this.productRepository.save(product);
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);
      if (product) {
        await this.productRepository.delete({ id: id });
        return product;
      }
      throw new NotFoundException(`Product with id ${id} not found`);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {

    if (error instanceof HttpException) {
      throw error;
    }
    if (error.code == '23505') {
      throw new BadRequestException(error.detail);

    }

    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
