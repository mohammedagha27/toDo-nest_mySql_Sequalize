import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  database: {
    dialect: 'mysql',
    host: 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PRODUCTION,
  },
});
