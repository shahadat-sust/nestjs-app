import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthDTO } from "../auth/auth.dto";
import { UserDTO } from "./user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth('jwt')
  public async getAll(): Promise<UserDTO[]> {
    return await this.userService.getAll();
  }

  @Post()
  public async register(@Body(new ValidationPipe({ transform: true })) userDTO: UserDTO): Promise<UserDTO> {
    return await this.userService.register(UserDTO.from(userDTO));
  }

  @Post("/generate-token")
  public async generateToken(@Body(new ValidationPipe({ transform: true })) authDTO: AuthDTO): Promise<string> {
    return await this.userService.generateToken(authDTO);
  }

};