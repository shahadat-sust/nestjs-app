import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { User } from "../user/user.decorator";
import { UserDTO } from "../user/user.dto";
import { ItemDTO } from "./item.dto";
import { ItemService } from "./item.service";

@Controller("items")
@ApiBearerAuth('jwt')
export class ItemController {

  constructor(private readonly itemService: ItemService) {}

  @Get()
  public async getAll(): Promise<ItemDTO[]> {
    return await this.itemService.getAll();
  }

  @Post()
  public async create(@User() userDTO: UserDTO, @Body(new ValidationPipe({ transform: true })) itemDTO: ItemDTO): Promise<ItemDTO> {
    return await this.itemService.create(itemDTO, userDTO);
  }

};