// create-prediction.dto.ts
import { IsString, IsNumber, IsPositive } from 'class-validator';
import { CreateTransactionDto } from './transactions.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePredictionDto {
  @IsNumber()
  @ApiProperty()
  codigo_producto: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  stock_predicho: number;
}

export class UpdatePredictionDto extends CreateTransactionDto {}
