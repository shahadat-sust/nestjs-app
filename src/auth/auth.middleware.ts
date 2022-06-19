import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { UserService } from "../user/user.service";

require('dotenv').config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('SECRET: ' + process.env.SECRET);

    const authHeaders = req.headers.authorization;
    if (authHeaders) {
      const split = (authHeaders as string).split(' ');
      const prefix = split[0];
      const token = split[1];
      
      if (prefix !== 'Bearer' || !token) {
        throw new HttpException('Invalid Auth Token.', HttpStatus.UNAUTHORIZED);
      }

      const decoded: any = jwt.verify(token, process.env.SECRET);

      const user = await this.userService.getById(decoded.id);
      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req["user"] = user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }

}