import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, user: Partial<User>): Promise<User>;
  remove(id: number): Promise<void>;
}
