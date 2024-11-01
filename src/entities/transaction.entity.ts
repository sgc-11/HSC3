import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  codigo_transaccion: number;

  @Column()
  tipo: number;

  @Column()
  codigo_producto: number;

  @Column('int')
  cantidad: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @ManyToOne(() => Product, product => product.transacciones)
  @JoinColumn({ name: 'codigo_producto' })
  producto: Product;
}