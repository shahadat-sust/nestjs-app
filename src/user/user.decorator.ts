import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDTO } from './user.dto';

require('dotenv').config();

export const User = createParamDecorator((data: any, ctx: ExecutionContext): UserDTO => {
  const req = ctx.switchToHttp().getRequest();
  return !!data ? req[data] : req.user;
});