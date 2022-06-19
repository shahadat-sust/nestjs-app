import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemController } from "./item.controller";
import { ItemService } from "./item.service";
import { Item } from "../model/item.entity";
import { AuthMiddleware } from "../auth/auth.middleware";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Item
    ]),
    UserModule
  ],
  controllers: [ 
    ItemController
  ],
  providers: [
    ItemService
  ]
})
export class ItemModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(
      { path: 'items', method: RequestMethod.GET },
      { path: 'items', method: RequestMethod.POST }
    )

  }


}