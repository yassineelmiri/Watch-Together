import { Controller, Post, Body, Get, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { videoFileInterceptor } from './interceptors/video-file.interceptor'; 
import { CreateVideoDto } from './dto/create-video.dto'; 
import { VideoService } from './video.service'; 

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('create')
  @UseInterceptors(videoFileInterceptor)
  async createVideo(
    @Body() createVideoDto: CreateVideoDto, 
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {        
      throw new BadRequestException('No file uploaded or file is not a valid video');
    }

    if (!file.mimetype.startsWith('video/')) {
      throw new BadRequestException('Only video files are allowed');
    }

    if (file.size > 50000000) {  // Limite de taille de fichier à 50 MB
      throw new BadRequestException('File size exceeds the limit of 50 MB');
    }

    const videoData = {
      ...createVideoDto,
      file: file.filename,
    };
    console.log('Video data:', videoData);

    const video = await this.videoService.createVideo(videoData);
    return {
      message: 'Video uploaded successfully',
      video,
    };
  }

  @Get('list')
  async getAllVideos() {
    const videos = await this.videoService.getAllVideos();
    return {
      message: 'List of all videos',
      videos,
    };
  }
}
