import { Controller, Post, Get, Param, Body, ValidationPipe, Delete } from '@nestjs/common';
import { PredictionService } from 'src/services/predictions.service';
import { CreatePredictionDto } from 'src/dtos/predictions.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('predictions')
@Controller('predictions')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva predicción' })
  async createPrediction(@Body(ValidationPipe) createPredictionDto: CreatePredictionDto) {
    return await this.predictionService.createPrediction(createPredictionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las predicciones' })
  async getAllPredictions() {
    return await this.predictionService.findAllPredictions();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Obtener predicción por código' })
  async getPredictionById(@Param('codigo') codigo: number) {
    return await this.predictionService.findPredictionById(codigo);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Eliminar predicción' })
  async deletePrediction(@Param('codigo') codigo: number) {
    await this.predictionService.deletePrediction(codigo);
    return { message: 'Predicción eliminada exitosamente' };
  }
}
