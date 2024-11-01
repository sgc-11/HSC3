import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module'; 
import { ProductModule } from './modules/products.module';
import { TransactionModule } from './modules/transactions.module';
import { PredictionModule } from './modules/predictions.module';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    TransactionModule,
    PredictionModule,
  ],
})
export class AppModule {}
