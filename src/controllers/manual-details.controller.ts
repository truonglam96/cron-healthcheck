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
import { ManualDetails } from "../models";
import { ManualDetailsRepository } from "../repositories";

@authenticate("jwt")
export class ManualDetailsController {
  constructor(
    @repository(ManualDetailsRepository)
    public manualDetailsRepository: ManualDetailsRepository
  ) {}

  @post("/manual-details")
  @response(200, {
    description: "ManualDetails model instance",
    content: {
      "application/json": { schema: getModelSchemaRef(ManualDetails) },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(ManualDetails, {
            title: "NewManualDetails",
            exclude: ["_id"],
          }),
        },
      },
    })
    manualDetails: Omit<ManualDetails, "id">
  ): Promise<ManualDetails> {
    return this.manualDetailsRepository.create(manualDetails);
  }

  @get("/manual-details/count")
  @response(200, {
    description: "ManualDetails model count",
    content: { "application/json": { schema: CountSchema } },
  })
  async count(
    @param.where(ManualDetails) where?: Where<ManualDetails>
  ): Promise<Count> {
    return this.manualDetailsRepository.count(where);
  }

  @get("/manual-details")
  @response(200, {
    description: "Array of ManualDetails model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(ManualDetails, { includeRelations: true }),
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

    if (macAddress === "") {
      filter = {
        where: {
          macAddress: {nin: ["", null]},
          and: [
            { createdDate: { gte: new Date(fromDate) } },
            { createdDate: { lte: new Date(toDate) } },
          ],
        },
        order: ["createdDate DESC"],
      };
    } else {
      filter = {
        where: {
          macAddress: macAddress,
          and: [
            { createdDate: { gte: new Date(fromDate) } },
            { createdDate: { lte: new Date(toDate) } },
          ],
        },
        order: ["createdDate DESC"],
      };
    }

    return await this.manualDetailsRepository.find(filter);
  }

  @get("/list-manual-details")
  @response(200, {
    description: "Array of ManualDetails model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(ManualDetails, { includeRelations: true }),
        },
      },
    },
  })
  async getList(
    @param.filter(ManualDetails) filter?: Filter<ManualDetails>
  ): Promise<ManualDetails[]> {
    return this.manualDetailsRepository.find(filter);
  }

  @patch("/manual-details")
  @response(200, {
    description: "ManualDetails PATCH success count",
    content: { "application/json": { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(ManualDetails, { partial: true }),
        },
      },
    })
    manualDetails: ManualDetails,
    @param.where(ManualDetails) where?: Where<ManualDetails>
  ): Promise<Count> {
    return this.manualDetailsRepository.updateAll(manualDetails, where);
  }

  @get("/manual-details/{id}")
  @response(200, {
    description: "ManualDetails model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(ManualDetails, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string("id") id: string,
    @param.filter(ManualDetails, { exclude: "where" })
    filter?: FilterExcludingWhere<ManualDetails>
  ): Promise<ManualDetails> {
    return this.manualDetailsRepository.findById(id, filter);
  }

  @patch("/manual-details/{id}")
  @response(204, {
    description: "ManualDetails PATCH success",
  })
  async updateById(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(ManualDetails, { partial: true }),
        },
      },
    })
    manualDetails: ManualDetails
  ): Promise<void> {
    await this.manualDetailsRepository.updateById(id, manualDetails);
  }

  @put("/manual-details/{id}")
  @response(204, {
    description: "ManualDetails PUT success",
  })
  async replaceById(
    @param.path.string("id") id: string,
    @requestBody() manualDetails: ManualDetails
  ): Promise<void> {
    await this.manualDetailsRepository.replaceById(id, manualDetails);
  }

  @del("/manual-details/{id}")
  @response(204, {
    description: "ManualDetails DELETE success",
  })
  async deleteById(@param.path.string("id") id: string): Promise<void> {
    await this.manualDetailsRepository.deleteById(id);
  }
}
