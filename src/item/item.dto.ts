
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from "class-validator";
import { UserDTO } from '../user/user.dto';
import { Item } from '../model/item.entity';

export class ItemDTO implements Readonly<ItemDTO> {

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  public static from(dto: Partial<ItemDTO>) {
    const it = new ItemDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: Item) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description
    });
  }

  public toEntity(user: UserDTO = null) {
    console.log(user);
    const it = new Item();
    it.id = this.id;
    it.name = this.name;
    it.description = this.description;
    it.createdOn = new Date();
    it.createdBy = user?.id;
    it.updatedOn = new Date();
    it.updatedBy = user?.id;
    return it;
  }

}