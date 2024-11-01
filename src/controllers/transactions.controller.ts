import { Controller, Post, Get, Put, Delete, Body, Param, ValidationPipe } from '@nestjs/common';
import { TransactionService } from 'src/services/transaction.service';
import { CreateTransactionDto } from 'src/dtos/transactions.dto';
import { UpdateTransactionDto } from 'src/dtos/transactions.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva transacción' })
  async createTransaction(@Body(ValidationPipe) createTransactionDto: CreateTransactionDto) {
    return await this.transactionService.createTransaction(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las transacciones' })
  async getAllTransactions() {
    return await this.transactionService.findAllTransactions();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Obtener transacción por código' })
  async getTransactionById(@Param('codigo') codigo: number) {
    return await this.transactionService.findTransactionById(codigo);
  }

  @Put(':codigo')
  @ApiOperation({ summary: 'Actualizar transacción' })
  async updateTransaction(@Param('codigo') codigo: number, @Body(ValidationPipe) updateTransactionDto: UpdateTransactionDto) {
    return await this.transactionService.updateTransaction(codigo, updateTransactionDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Eliminar transacción' })
  async deleteTransaction(@Param('codigo') codigo: number) {
    await this.transactionService.deleteTransaction(codigo);
    return { message: 'Transacción eliminada exitosamente' };
  }
}
