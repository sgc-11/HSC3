import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from 'src/entities/prediction.entity';
import { PredictionController } from 'src/controllers/predictions.controller';
import { PredictionService } from 'src/services/predictions.service';
import { ProductModule } from './products.module';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prediction, Product]), 
    ProductModule,
], // Importa la entidad Prediction
  controllers: [PredictionController],
  providers: [PredictionService],
  exports: [PredictionService],
})
export class PredictionModule {}
