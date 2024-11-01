import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { Product } from 'src/entities/product.entity';
import { CreateTransactionDto } from 'src/dtos/transactions.dto';
import { UpdateTransactionDto } from 'src/dtos/transactions.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    // Verificar si el producto existe
    const product = await this.productRepository.findOne({ where: { codigo_producto: createTransactionDto.codigo_producto } });
    if (!product) {
      throw new NotFoundException(`Producto con código ${createTransactionDto.codigo_producto} no encontrado`);
    }
  
    // Actualizar cantidad_stock según el tipo de transacción
    if (createTransactionDto.tipo === 1) {
      // Tipo 1: Entrada, se suma
      product.cantidad_stock += createTransactionDto.cantidad;
    } else if (createTransactionDto.tipo === 0) {
      // Tipo 0: Salida, se resta
      if (product.cantidad_stock < createTransactionDto.cantidad) {
        throw new BadRequestException(`No hay suficiente stock para realizar esta transacción. Stock actual: ${product.cantidad_stock}`);
      }
      product.cantidad_stock -= createTransactionDto.cantidad;
    } else {
      throw new BadRequestException(`Tipo de transacción no válido`);
    }
  
    // Guardar los cambios en el producto
    await this.productRepository.save(product);
  
    // Crear la transacción
    const transaction = this.transactionRepository.create(createTransactionDto);
    return await this.transactionRepository.save(transaction);
  }
  

  async findAllTransactions(): Promise<Transaction[]> {
    return await this.transactionRepository.find({ relations: ['producto'] }); // Puedes cargar relaciones si es necesario
  }

  async findTransactionById(codigo_transaccion: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { codigo_transaccion } });
    if (!transaction) {
      throw new NotFoundException(`Transacción con código ${codigo_transaccion} no encontrada`);
    }
    return transaction;
  }

  async updateTransaction(codigo_transaccion: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.findTransactionById(codigo_transaccion);
    const updatedTransaction = this.transactionRepository.merge(transaction, updateTransactionDto);
    return await this.transactionRepository.save(updatedTransaction);
  }

  async deleteTransaction(codigo_transaccion: number): Promise<void> {
    const result = await this.transactionRepository.delete(codigo_transaccion);
    if (result.affected === 0) {
      throw new NotFoundException(`Transacción con código ${codigo_transaccion} no encontrada`);
    }
  }
}
