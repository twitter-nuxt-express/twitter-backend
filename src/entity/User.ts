import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  avatar!: string;

  @Column("text", { array: true, nullable: true })
  roles?: string[];
}
