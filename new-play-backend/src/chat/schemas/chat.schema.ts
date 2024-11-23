// src/chat/schemas/chat.schema.ts

import { Schema, Document } from 'mongoose';

export interface Chat extends Document {
  event: string;
  data: {
    userId: string;
    message: string;
  };
}

export const ChatSchema = new Schema<Chat>({
  event: { type: String, required: true },
  data: {
    userId: { type: String, required: true },
    message: { type: String, required: true },
  },
});
