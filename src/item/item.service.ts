import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemDTO } from "./item.dto";
import { Item } from "../model/item.entity";
import { UserDTO } from "../user/user.dto";

@Injectable()
export class ItemService {

  constructor(@InjectRepository(Item) private readonly itemRepo: Repository<Item>) {}

  async getAll(): Promise<ItemDTO[]> {
    return await this.itemRepo.find().then(items => items.map(item => ItemDTO.fromEntity(item)));
  }

  public async create(itemDTO: ItemDTO, userDTO: UserDTO): Promise<ItemDTO> {
    return await this.itemRepo.save(itemDTO.toEntity(userDTO)).then(item => ItemDTO.fromEntity(item));
  }

}