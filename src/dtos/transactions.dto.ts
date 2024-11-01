import { IsIn, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @IsNumber()
  @ApiProperty()
  codigo_producto: number;

  @IsNumber()
  @ApiProperty()
  cantidad: number;

  @IsIn([0, 1])
  @ApiProperty()
  tipo: number;
}

export class UpdateTransactionDto extends CreateTransactionDto {}
