import { User } from '@domain/models';

type Model = User;

export default interface Repository<TModel extends Model = Model> {
  create(user: TModel): Promise<void>;
}
