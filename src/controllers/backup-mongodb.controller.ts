import { inject } from "@loopback/core";
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from "@loopback/repository";
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  Request,
  RestBindings,
} from "@loopback/rest";
// import { testingresults as Testingresults } from "../models";
// import {
//   AutomatictestingresultsRepository,
//   BootsRepository,
//   CertificateinfosRepository,
//   ManualtestingresultsRepository,
//   QctoolfactoryconfigurationsRepository,
//   TestingresultsRepository,
// } from "../repositories";
// import { Convertdata2JsonService } from "../services";

export class BackupMongodbController {
  constructor(
    // @inject("services.Convertdata2JsonService")
    // private convertData2JsonService: Convertdata2JsonService,
    @inject(RestBindings.Http.REQUEST) private request: Request
  ) {}

  @post("/box_comming")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async create(@requestBody() body: any): Promise<{}> {
    console.log(body);
    
    try {
      var b64 = body.imageB64;
      const fs = require("fs");
      var b64 = b64.replace(/^data:image\/png;base64,/, "");
      fs.writeFile(
        "./public/image/'" + new Date().getTime() + "'.jpg",
        b64,
        "base64",
        function (err: any) {
          console.log(err);
        }
      );
    } catch (error) {
      // console.log(error);
    }

    return {
      "brand": "test",
      "doReset": false,
      "doUpdate": false,
      "fwUrl": "",
      "image": "",
      "result": "success",
      "timeUTC": new Date().getTime()
    }
  }

}
