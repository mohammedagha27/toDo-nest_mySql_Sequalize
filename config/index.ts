import devConfig from './config.development';
import prodConfig from './config.production';

const NODE_ENV = process.env.NODE_ENV;

let dbConfig;
switch (NODE_ENV) {
  case 'production': {
    dbConfig = prodConfig;
    break;
  }
  case 'development': {
    dbConfig = devConfig;
  }
  default: {
    dbConfig = devConfig;
  }
}
export default dbConfig;
