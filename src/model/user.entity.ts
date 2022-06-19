import { Entity, Column, BeforeInsert } from 'typeorm';
import { BaseEntity } from './base.entity';
import * as argon2 from 'argon2';

@Entity({ name: 'user' })
export class User extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const prevPassword = this.password;
    this.password = (await argon2.hash(this.password)).toString();
    console.log(`1 => password: ${prevPassword}, hashPassword: ${this.password}`);
  }

}