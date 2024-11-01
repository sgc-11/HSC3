import { Controller, Post, Get, Put, Delete, Body, Param, ValidationPipe } from '@nestjs/common';
import { ProductService } from 'src/services/products.service';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  async createProduct(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  async getAllProducts() {
    return await this.productService.findAllProducts();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Obtener producto por código' })
  async getProductById(@Param('codigo') codigo: number) {
    return await this.productService.findProductById(codigo);
  }

  @Put(':codigo')
  @ApiOperation({ summary: 'Actualizar producto' })
  async updateProduct(
    @Param('codigo') codigo: number, 
    @Body(ValidationPipe) updateProductDto: UpdateProductDto
  ) {
    return await this.productService.updateProduct(codigo, updateProductDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Eliminar producto' })
  async deleteProduct(@Param('codigo') codigo: number) {
    await this.productService.deleteProduct(codigo);
    return { message: 'Producto eliminado exitosamente' };
  }

  @Put(':codigo/stock')
  @ApiOperation({ summary: 'Actualizar stock de producto' })
  async updateStock(
    @Param('codigo') codigo: number, 
    @Body('cantidad') cantidad: number
  ) {
    return await this.productService.updateStock(codigo, cantidad);
  }
}