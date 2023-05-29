import { authenticate } from "@loopback/authentication";
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
} from "@loopback/rest";
import { AutomaticResults } from "../models";
import { AutomaticResultsRepository } from "../repositories";

@authenticate('jwt')
export class AutomaticResultsController {
  constructor(
    @repository(AutomaticResultsRepository)
    public automaticResultsRepository: AutomaticResultsRepository
  ) {}

  @post("/automatic-results")
  @response(200, {
    description: "AutomaticResults model instance",
    content: {
      "application/json": { schema: getModelSchemaRef(AutomaticResults) },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(AutomaticResults, {
            title: "NewAutomaticResults",
            exclude: ["_id"],
          }),
        },
      },
    })
    automaticResults: Omit<AutomaticResults, "id">
  ): Promise<AutomaticResults> {
    return this.automaticResultsRepository.create(automaticResults);
  }

  @get("/automatic-results/count")
  @response(200, {
    description: "AutomaticResults model count",
    content: { "application/json": { schema: CountSchema } },
  })
  async count(
    @param.where(AutomaticResults) where?: Where<AutomaticResults>
  ): Promise<Count> {
    return this.automaticResultsRepository.count(where);
  }

  @get("/automatic-results")
  @response(200, {
    description: "Array of AutomaticResults model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(AutomaticResults, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string,
    @param.query.string("macAddress") macAddress: string
  ): Promise<any> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filter: any;

    if (macAddress == '') {
      filter = {
        where: {
          macAddress: {nin: ["", null]},
          and: [
            { lastDate: { gte: new Date(fromDate) } },
            { lastDate: { lte: new Date(toDate) } },
          ],
        },
        order: ["lastDate DESC"],
        limit: 50
      };
    } else {
      filter = {
        where: {
          macAddress: macAddress,
          and: [
            { lastDate: { gte: new Date(fromDate) } },
            { lastDate: { lte: new Date(toDate) } },
          ],
        },
        order: ["lastDate DESC"],
        limit: 50
      };
    }

    return await this.automaticResultsRepository.find(filter);
  }

  @patch("/automatic-results")
  @response(200, {
    description: "AutomaticResults PATCH success count",
    content: { "application/json": { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(AutomaticResults, { partial: true }),
        },
      },
    })
    automaticResults: AutomaticResults,
    @param.where(AutomaticResults) where?: Where<AutomaticResults>
  ): Promise<Count> {
    return this.automaticResultsRepository.updateAll(automaticResults, where);
  }

  @get("/automatic-results/{id}")
  @response(200, {
    description: "AutomaticResults model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(AutomaticResults, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string("id") id: string,
    @param.filter(AutomaticResults, { exclude: "where" })
    filter?: FilterExcludingWhere<AutomaticResults>
  ): Promise<AutomaticResults> {
    return this.automaticResultsRepository.findById(id, filter);
  }

  @patch("/automatic-results/{id}")
  @response(204, {
    description: "AutomaticResults PATCH success",
  })
  async updateById(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(AutomaticResults, { partial: true }),
        },
      },
    })
    automaticResults: AutomaticResults
  ): Promise<void> {
    await this.automaticResultsRepository.updateById(id, automaticResults);
  }

  @put("/automatic-results/{id}")
  @response(204, {
    description: "AutomaticResults PUT success",
  })
  async replaceById(
    @param.path.string("id") id: string,
    @requestBody() automaticResults: AutomaticResults
  ): Promise<void> {
    await this.automaticResultsRepository.replaceById(id, automaticResults);
  }

  @del("/automatic-results/{id}")
  @response(204, {
    description: "AutomaticResults DELETE success",
  })
  async deleteById(@param.path.string("id") id: string): Promise<void> {
    await this.automaticResultsRepository.deleteById(id);
  }
}
