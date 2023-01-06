import { Middleware, HttpErrors, MiddlewareSequence, RequestContext, requestBody } from "@loopback/rest";
import * as dotenv from "dotenv";
import { appendFile } from "fs";
dotenv.config();

export const log: Middleware = async (middlewareCtx, next) => {
  
  const { request } = middlewareCtx;
  try {
    let data = {
      ...request.headers,
      body: request.body,
      query: request.query,
      url: request.url,
    };
    console.log(data);
    
    // Process response
    return await next();
  } catch (err: any) {

    if(request.url === "/box_comming"){
      return {
        result: "failed",
        brand: "test",
        doReset: false,
        doUpdate: false,
        fwUrl: "",
        image: "",
        timeUTC: parseInt((new Date().getTime()/1000).toFixed()),
      }
    }

    // Catch errors from downstream middleware
    if (err.__proto__.status && err.__proto__.status === 401) {
      throw new HttpErrors[401](err);
    } else {
      console.log({
        error: err.message,
        detail: JSON.stringify(err),
      });
      if (err.statusCode) {
        throw new HttpErrors[err.statusCode](err);
      } else {
        throw new HttpErrors[501](err);
      }
    }
  }
};
