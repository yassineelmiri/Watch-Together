// src/chat/chat.gateway.ts

import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';

@WebSocketGateway()
@Injectable()
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): string {
    console.log('Received message: ', message);
    return 'Hello from WebSocket';
  }
}
