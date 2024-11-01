import { IsString, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

  @IsString()
  @ApiProperty()
  descripcion: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  cantidad_stock: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  precio: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  stock_minimo: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  stock_maximo: number;
}
 export class UpdateProductDto extends CreateProductDto {}