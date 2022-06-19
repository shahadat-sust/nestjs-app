import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column({ name: "is_active", type: 'boolean', default: true })
  isActive: boolean

  @Column({ name: "is_archived", type: 'boolean', default: true })
  isArchived: boolean

  @CreateDateColumn({ name: "created_on", type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;

  @Column({ name: "created_by", type: 'varchar', length: 300, nullable: true })
  createdBy: string;

  @UpdateDateColumn({ name: "updated_on", type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn: Date;

  @Column({ name: "updated_by", type: 'varchar', length: 300, nullable: true })
  updatedBy: string;

  @Column({ name: "comment", type: 'varchar', length: 300, nullable: true })
  comment: string | null;

}