import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getStatus(): {[key: string]: string} {
    return {
      status: 'OK'
    };
  }

}
