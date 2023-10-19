// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;
}
