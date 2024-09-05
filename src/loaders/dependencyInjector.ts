import Container from 'typedi';
import logger from './logger';
import InjectionTokens from '../InjectionTokens';

// Repositories
import 'src/infra/repositories/UserRepository';

export default () => {
  Container.set(InjectionTokens.Logger, logger);
};
