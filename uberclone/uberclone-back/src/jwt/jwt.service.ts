import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from './interfaces/jwt-module-options.interface';

@Injectable()
export class JwtService {
  constructor(@Inject('BANANAS') private readonly options: JwtModuleOptions) {
    console.log(options);
  }
  hello() {
    console.log('hello');
  }
}
