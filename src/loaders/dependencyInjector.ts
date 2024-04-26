import Container from 'typedi';
import { User } from '../applications/infra/models';

// Repositories
import '@app/infra/repositories/UserRepository';

const models = [User];

export default () => {
  models.forEach((Model) => {
    Container.set(Model.name, Model);
  });
};
