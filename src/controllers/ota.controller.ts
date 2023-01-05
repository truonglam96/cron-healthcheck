// Uncomment these imports to begin using these cool features!
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

import { DrinkMoments } from "../models";
import { DrinkMomentsRepository } from "../repositories";

export class OtaController {
  constructor(
    @repository(DrinkMomentsRepository)
    private drinkMomentsRepository: DrinkMomentsRepository
  ) {}

  //Convert data imu sensor b64 to chart
  @post("/convert-imu")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async convertIMU(): Promise<{}> {
    return {};
  }

  
}
