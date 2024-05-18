import { models } from 'src/infra/models';
import Container from 'typedi';
import logger from './logger';
import InjectionTokens from '../InjectionTokens';

// Repositories
import 'src/infra/repositories/UserRepository';


export default () => {
  models.forEach((Model) => {
    Container.set(Model.modelName, Model);
  });

  Container.set(InjectionTokens.Logger, logger);
};
