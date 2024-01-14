import { Injectable } from '@nestjs/common';
import { valid } from 'joi';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

  private readonly apiKeyService;

  constructor(readonly configService: ConfigService) {
    this.apiKeyService = configService.get('apiKey');
  }
}

  validateApiKey(apiKey: string): boolean {
    return apiKeyService === apiKey;
  }