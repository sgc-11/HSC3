import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from 'src/dtos/products.dto';
import { UpdateProductDto } from 'src/dtos/products.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findProductById(codigo_producto: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { codigo_producto } });
    if (!product) {
      throw new NotFoundException(`Producto con código ${codigo_producto} no encontrado`);
    }
    return product;
  }

  async updateProduct(codigo: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findProductById(codigo);
    return await this.productRepository.save({ ...product, ...updateProductDto });
  }

  async deleteProduct(codigo: number): Promise<void> {
    const result = await this.productRepository.delete(codigo);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con código ${codigo} no encontrado`);
    }
  }

  async updateStock(codigo: number, cantidad: number): Promise<Product> {
    const product = await this.findProductById(codigo);
    product.cantidad_stock += cantidad;
    return await this.productRepository.save(product);
  }
}