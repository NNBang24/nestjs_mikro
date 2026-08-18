import { Injectable } from '@nestjs/common';

@Injectable() // Decorator
export class AppService {
  getHello(): string {
    return 'Hello World & Bang ne!';
  }
}
