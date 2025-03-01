import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key']; // Pega a chave do header
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
      throw new UnauthorizedException('Acesso negado.');
    }
    
    return true;
  }
}
