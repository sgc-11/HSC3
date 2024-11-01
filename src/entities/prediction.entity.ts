import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('predictions')
export class Prediction {
  @PrimaryGeneratedColumn()
  codigo_prediccion: number;

  @Column()
  codigo_producto: number;

  @Column()
  stock_predicho: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  fecha_prediccion: Date;

  @ManyToOne(() => Product, product => product.predicciones)
  @JoinColumn({ name: 'codigo_producto' })
  producto: Product;
}