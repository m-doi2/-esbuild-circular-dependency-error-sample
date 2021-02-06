import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { App2Entity } from '../../app2/entities';

@Entity()
export class App1Entity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => App2Entity, (entity) => entity.app1, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  app2?: App2Entity;
}

export default App1Entity;
