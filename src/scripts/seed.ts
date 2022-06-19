import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from "typeorm";
import { configService } from '../config/typeorm.config';
import { Item } from "../model/item.entity";
import { ItemDTO } from 'src/item/item.dto';
import { ItemService } from 'src/item/item.service';
import { UserDTO } from 'src/user/user.dto';

async function run() {

  const seedUser: UserDTO = UserDTO.from({
    id: 'seed_user'
  });

  const opt = {
   ...configService.getTypeOrmConfig(),
   debug: true
  } as ConnectionOptions;

  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => { console.log(s, it, x); return x > 3 ? s : (s += it)}, '');

  const connection = await createConnection(opt);

  const itemService = new ItemService(connection.getRepository(Item));

  const work = _.range(1, 10)
    .map(n => 
      ItemDTO.from({
        name: `seed${seedId}-${n}`,
        description: 'created from seed'
      })
    )
    .map(item => 
      itemService.create(item, seedUser)
      .then(r => 
        (console.log('done ->', r.name), r)
      )
    )

  return await Promise.all(work);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));