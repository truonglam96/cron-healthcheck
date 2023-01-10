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
import { DrinkMoments } from "../models";
import { DrinkMomentsRepository } from "../repositories";

export class DrinkMomentsController {
  constructor(
    @repository(DrinkMomentsRepository)
    public DrinkMomentsRepository: DrinkMomentsRepository
  ) {}

  @post("/DrinkMoments")
  @response(200, {
    description: "DrinkMoments model instance",
    content: {
      "application/json": { schema: getModelSchemaRef(DrinkMoments) },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(DrinkMoments, {
            title: "NewDrinkMoments",
            exclude: ["_id"],
          }),
        },
      },
    })
    DrinkMoments: Omit<DrinkMoments, "string">
  ): Promise<DrinkMoments> {
    return this.DrinkMomentsRepository.create(DrinkMoments);
  }

  @get("/DrinkMoments/count")
  @response(200, {
    description: "DrinkMoments model count",
    content: { "application/json": { schema: CountSchema } },
  })
  async count(
    @param.where(DrinkMoments) where?: Where<DrinkMoments>
  ): Promise<Count> {
    return this.DrinkMomentsRepository.count(where);
  }

  @get("/DrinkMoments")
  @response(200, {
    description: "Array of DrinkMoments model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(DrinkMoments, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(DrinkMoments) filter?: Filter<DrinkMoments>
  ): Promise<DrinkMoments[]> {
    return this.DrinkMomentsRepository.find(filter);
  }

  @patch("/DrinkMoments")
  @response(200, {
    description: "DrinkMoments PATCH success count",
    content: { "application/json": { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(DrinkMoments, { partial: true }),
        },
      },
    })
    DrinkMoments: DrinkMoments,
    @param.where(DrinkMoments) where?: Where<DrinkMoments>
  ): Promise<Count> {
    return this.DrinkMomentsRepository.updateAll(DrinkMoments, where);
  }

  @get("/DrinkMoments/{id}")
  @response(200, {
    description: "DrinkMoments model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(DrinkMoments, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string("id") id: string,
    @param.filter(DrinkMoments, { exclude: "where" })
    filter?: FilterExcludingWhere<DrinkMoments>
  ): Promise<DrinkMoments> {
    return this.DrinkMomentsRepository.findById(id, filter);
  }

  @patch("/DrinkMoments/{id}")
  @response(204, {
    description: "DrinkMoments PATCH success",
  })
  async updateById(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(DrinkMoments, { partial: true }),
        },
      },
    })
    DrinkMoments: DrinkMoments
  ): Promise<void> {
    await this.DrinkMomentsRepository.updateById(id, DrinkMoments);
  }

  @put("/DrinkMoments/{id}")
  @response(204, {
    description: "DrinkMoments PUT success",
  })
  async replaceById(
    @param.path.string("id") id: string,
    @requestBody() DrinkMoments: DrinkMoments
  ): Promise<void> {
    await this.DrinkMomentsRepository.replaceById(id, DrinkMoments);
  }

  @del("/DrinkMoments/{id}")
  @response(204, {
    description: "DrinkMoments DELETE success",
  })
  async deleteById(@param.path.string("id") id: string): Promise<void> {
    await this.DrinkMomentsRepository.deleteById(id);
  }
}
