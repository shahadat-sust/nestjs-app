import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { UserDTO } from "./user.dto";
import { User } from "../model/user.entity";
import { AuthDTO } from "../auth/auth.dto";

require('dotenv').config();

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  public async getAll(): Promise<UserDTO[]> {
    return await this.userRepo.find().then(users => users.map(user => UserDTO.fromEntity(user)));
  }

  public async getById(id: string): Promise<UserDTO> {
    return await this.userRepo.findOne({
      where: {
        id
      }
    }).then(user => UserDTO.fromEntity(user));
  }

  public async register(userDTO: UserDTO): Promise<UserDTO> {
    const user = await this.userRepo.findOne({
      select: {
        id: true,
      },
      where: {
        email: userDTO.email
      },
    });

    if (user) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT)
    }

    return await this.userRepo.save(userDTO.toEntity()).then(user => UserDTO.fromEntity(user));
  }

  public async generateToken(authDTO: AuthDTO): Promise<string> {
    console.log('SECRET: ' + process.env.SECRET);

    const user = await this.userRepo.findOne({
      select: {
        id: true,
        email: true,
        password: true
      },
      where: {
        email: authDTO.email
      },
    });

    if (!user) {
      throw new HttpException('Email or password not matched.', HttpStatus.UNAUTHORIZED);
    }

    if (!(await argon2.verify(user.password, authDTO.password))) {
      throw new HttpException('Email or password not matched.', HttpStatus.UNAUTHORIZED);
    }

    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, process.env.SECRET);
  }

}