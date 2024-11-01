import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Prediction } from './prediction.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  codigo_producto: number;

  @Column()
  descripcion: string;

  @Column('int')
  cantidad_stock: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  stock_minimo: number;

  @Column()
  stock_maximo: number;

  @OneToMany(() => Transaction, transaction => transaction.producto)
  transacciones: Transaction[];

  @OneToMany(() => Prediction, prediction => prediction.producto)
  predicciones: Prediction[];
}