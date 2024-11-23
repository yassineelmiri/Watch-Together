import { Schema, Document, model } from 'mongoose';

 interface Video extends Document {
  name: string;
  userId: string;
  file: string;

}

const videoSchema = new Schema<Video>(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true },
    file: { type: String, required: true },
  },
  { timestamps: true },
);

const VideoModel = model<Video>('Video', videoSchema);

export { VideoModel, Video,videoSchema };
