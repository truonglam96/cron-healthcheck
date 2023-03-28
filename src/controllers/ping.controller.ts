import { inject } from "@loopback/core";
import { repository } from "@loopback/repository";
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
  param,
} from "@loopback/rest";
import { query } from "express";
import { DrinkMomentsRepository } from "../repositories";
import { ElasticService } from "../services";

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: "Ping Response",
  content: {
    "application/json": {
      schema: {
        type: "object",
        title: "PingResponse",
        properties: {
          greeting: { type: "string" },
          date: { type: "string" },
          url: { type: "string" },
          headers: {
            type: "object",
            properties: {
              "Content-Type": { type: "string" },
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @repository(DrinkMomentsRepository)
    public DrinkMomentsRepository: DrinkMomentsRepository,
    @inject("services.ElasticService") protected elastic: ElasticService,
    @inject(RestBindings.Http.REQUEST) private req: Request
  ) {}

  // Map to `GET /ping`
  @get("/ping")
  @response(200, PING_RESPONSE)
  async ping(): Promise<object> {
    // Reply with a greeting, the current time, the url, and request headers
    // const fs = require("fs");

    // let data: any = await this.DrinkMomentsRepository.find();

    // for (const iterator of data) {
    //   if(iterator.imageB64 != ""){
    //     try {
    //       var b64 = iterator.imageB64;
    //       const fs = require("fs");
    //       // var b64 = b64.replace(/^data:image\/png;base64,/, "");
    //       let pathFile = './public/image/' + iterator.boxId?.toString().replace(/:/gi, '_') + '_' + new Date().getTime() + '_' + iterator._id.toString() + '.jpg';
    //       fs.writeFile(
    //         pathFile,
    //         b64,
    //         "base64",
    //         function (err: any) {
    //           console.log(err);
    //         }
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }  
    // }

    return {
      greeting: "Hello from LoopBack",
      // date: new Date(),
      // url: this.req.url,
      // headers: Object.assign({}, this.req.headers),
    };
  }
}
