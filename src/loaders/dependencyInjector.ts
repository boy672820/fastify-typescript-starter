import { User } from 'src/infra/models';
import Container from 'typedi';
import logger from './logger';
import InjectionTokens from '../InjectionTokens';

// Repositories
import 'src/infra/repositories/UserRepository';

const models = [User];

export default () => {
  models.forEach((Model) => {
    Container.set(Model.name, Model);
  });

  Container.set(InjectionTokens.Logger, logger);
};
