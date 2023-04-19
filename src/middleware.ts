import {
  Middleware,
  HttpErrors,
  MiddlewareSequence,
  RequestContext,
  requestBody,
} from "@loopback/rest";
import * as dotenv from "dotenv";
import { appendFile } from "fs";
dotenv.config();

export const log: Middleware = async (middlewareCtx, next) => {
  const X_REST_API_KEY = process.env.X_REST_API_KEY;
  const X_APLICATION_ID = process.env.X_APLICATION_ID;

  const { request } = middlewareCtx;
  try {
    let data = {
      ...request.headers,
      body: request.body,
      query: request.query,
      url: request.url,
    };
    console.log(data);

    const x_rest_api_key = request.headers["x-rest-api-key"];
    const x_application_id = request.headers["x-application-id"];

    if (request.url === "/box_comming" && x_rest_api_key !== X_REST_API_KEY) {
      return {
        result: "UnauthorizedError",
        brand: "test",
        doReset: false,
        doUpdate: false,
        fwUrl: "",
        image: "",
        timeUTC: parseInt((new Date().getTime() / 1000).toFixed()),
      };
    }

    //Check request from QC-Tool
    if (
      request.url.includes("/qctool-request") &&
      x_rest_api_key !== X_REST_API_KEY
    ) {
      throw new HttpErrors[401]();
    }

    // Process response
    return await next();
  } catch (err: any) {
    if (request.url === "/box_comming") {
      // return {
      //   result: "false",
      //   brand: "test",
      //   doReset: false,
      //   doUpdate: false,
      //   fwUrl: "",
      //   image: "",
      //   timeUTC: parseInt((new Date().getTime() / 1000).toFixed()),
      // };
      const sleep = (waitTimeInMs: any) =>
        new Promise((resolve) => setTimeout(resolve, waitTimeInMs));
      await sleep(15000);
      return {
        result: "success",
        brand: "test",
        doReset: false,
        doUpdate: false,
        fwUrl: "",
        image: "",
        timeUTC: parseInt((new Date().getTime() / 1000).toFixed()),
      };
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
