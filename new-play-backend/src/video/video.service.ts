import { Injectable } from '@nestjs/common';
import { Video, VideoModel } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VideoService {
  constructor(@InjectModel(VideoModel.name) private videoModel: Model<Video>) {}

  async createVideo(createVideoDto: CreateVideoDto) {
    try {
      // Crée une nouvelle entrée dans la base de données en utilisant le modèle vidéo
      const videoCreated = await this.videoModel.create(createVideoDto);
      return videoCreated;
    } catch (error) {
      console.error('Error saving video to the database:', error);
      throw new Error(`Error saving video to the database: ${error.message}`);
    }
  }

  async getAllVideos(): Promise<Video[]> {
    try {
      // Récupère toutes les vidéos de la base de données
      const videos = await this.videoModel.find().exec();
      return videos;
    } catch (error) {
      console.error('Error fetching videos from the database:', error);
      throw new Error(`Error fetching videos from the database: ${error.message}`);
    }
  }
}
