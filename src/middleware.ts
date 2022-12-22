import {Middleware, HttpErrors} from '@loopback/rest';
// import {logger} from './utils/logger';
import * as dotenv from 'dotenv';
// import jwt_decode from 'jwt-decode';
dotenv.config();

export const log: Middleware = async (middlewareCtx, next) => {
  const {request} = middlewareCtx;
  try {
    let data = { ...request.headers, body: request.body, query: request.query, url: request.url }
    console.log(data);
    

    // Process response
    return await next();
  } catch (err: any) {
    // Catch errors from downstream middleware
    if (err.__proto__.status && err.__proto__.status === 401) {
      throw new HttpErrors[401](err);
    } else {
      return {
        error: err.message,
        detail: JSON.stringify(err),
      };
    }
  }
};
