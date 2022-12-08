import devConfig from './config.development';
import prodConfig from './config.production';
import testConfig from './config.testing';

const NODE_ENV = process.env.NODE_ENV;

let dbConfig;
switch (NODE_ENV) {
  case 'production': {
    dbConfig = prodConfig;
    break;
  }
  case 'testing': {
    dbConfig = testConfig;
    break;
  }
  case 'development': {
    dbConfig = devConfig;
    break;
  }
  default: {
    dbConfig = devConfig;
  }
}
export default dbConfig;
