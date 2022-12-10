import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  database: {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEV,
  },
  environment: {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    secretKey: process.env.SECRET_KEY,
  },
});
