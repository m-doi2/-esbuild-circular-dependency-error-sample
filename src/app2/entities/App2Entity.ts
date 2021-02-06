import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { App1Entity } from '../../app1/entities';

@Entity()
export class App2Entity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => App1Entity, (entity) => entity.app2, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  app1?: App1Entity;
}

export default App2Entity;
