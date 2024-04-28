import { User } from '@domain/models';

type Model = User;

export default interface Repository<TModel extends Model = Model> {
  findAll(): Promise<TModel[]>;
  create(user: TModel): Promise<void>;
}
