import * as jwt from 'jsonwebtoken';

const verifyToken = (token, secret): any =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return false;
    }
    return decode;
  });
export { verifyToken };
