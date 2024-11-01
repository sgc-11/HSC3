import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prediction } from 'src/entities/prediction.entity';
import { Product } from 'src/entities/product.entity';
import { CreatePredictionDto } from 'src/dtos/predictions.dto';
import { UpdatePredictionDto } from 'src/dtos/predictions.dto';

@Injectable()
export class PredictionService {
  constructor(
    @InjectRepository(Prediction)
    private predictionRepository: Repository<Prediction>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async createPrediction(createPredictionDto: CreatePredictionDto): Promise<Prediction> {
    const product = await this.productRepository.findOne({ where: { codigo_producto: createPredictionDto.codigo_producto } });
    if (!product) {
      throw new NotFoundException(`Producto con código ${createPredictionDto.codigo_producto} no encontrado`);
    }

    const prediction = this.predictionRepository.create(createPredictionDto);
    return await this.predictionRepository.save(prediction);
  }

  async findAllPredictions(): Promise<Prediction[]> {
    return await this.predictionRepository.find({ relations: ['producto'] }); // Cargar relaciones si es necesario
  }

  async findPredictionById(codigo_prediccion: number): Promise<Prediction> {
    const prediction = await this.predictionRepository.findOne({ where: { codigo_prediccion } });
    if (!prediction) {
      throw new NotFoundException(`Predicción con código ${codigo_prediccion} no encontrada`);
    }
    return prediction;
  }

  async updatePrediction(codigo_pred: number, updatePredictionDto: UpdatePredictionDto): Promise<Prediction> {
    const prediction = await this.findPredictionById(codigo_pred);
    const updatedPrediction = this.predictionRepository.merge(prediction, updatePredictionDto);
    return await this.predictionRepository.save(updatedPrediction);
  }

  async deletePrediction(codigo_pred: number): Promise<void> {
    const result = await this.predictionRepository.delete(codigo_pred);
    if (result.affected === 0) {
      throw new NotFoundException(`Predicción con código ${codigo_pred} no encontrada`);
    }
  }
}
