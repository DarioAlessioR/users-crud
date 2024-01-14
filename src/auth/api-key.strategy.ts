import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Passport } from "passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthService } from "./auth.service";


@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private authService: AuthService) {
    super({ header: 'apiKey', prefix: '' }, true, (apiKey, done) => {
        const checkKey = authService.validateApiKey(apiKey);
        if (!checkKey) {
          return done(false);
        }
        return done(true);
        });
    }
}