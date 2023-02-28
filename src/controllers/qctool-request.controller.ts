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
import { AutomaticDetails, AutomaticResults, Certificates, Configurations, ManualDetails, ManualResults } from "../models";
import {
  AutomaticDetailsRepository,
  AutomaticResultsRepository,
  CertificatesRepository,
  ConfigurationsRepository,
  ManualDetailsRepository,
  ManualResultsRepository,
} from "../repositories";

const PATH = "/qctool-request";

export class QCtoolRequestController {
  constructor(
    @repository(AutomaticDetailsRepository)
    public automaticDetailsRepository: AutomaticDetailsRepository,
    @repository(AutomaticResultsRepository)
    public automaticResultsRepository: AutomaticResultsRepository,
    @repository(ManualDetailsRepository)
    public manualDetailsRepository: ManualDetailsRepository,
    @repository(ManualResultsRepository)
    public manualResultsRepository: ManualResultsRepository,
    @repository(ConfigurationsRepository)
    public configurationsRepository: ConfigurationsRepository,
    @repository(CertificatesRepository)
    public certificatesRepository: CertificatesRepository
  ) {}

  //#region AutomaticDetails
  @post(PATH + "/automatic-details")
  @response(200, {
    description: "AutomaticDetails model instance",
    content: {
      "application/json": { schema: getModelSchemaRef(AutomaticDetails) },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(AutomaticDetails, {
            title: "NewAutomaticDetails",
            exclude: ["_id"],
          }),
        },
      },
    })
    automaticDetails: Omit<AutomaticDetails, "id">
  ): Promise<AutomaticDetails> {
    return this.automaticDetailsRepository.create(automaticDetails);
  }

  @get(PATH + "/automatic-details/count")
  @response(200, {
    description: "AutomaticDetails model count",
    content: { "application/json": { schema: CountSchema } },
  })
  async count(
    @param.where(AutomaticDetails) where?: Where<AutomaticDetails>
  ): Promise<Count> {
    return this.automaticDetailsRepository.count(where);
  }

  @get(PATH + "/automatic-details")
  @response(200, {
    description: "Array of AutomaticDetails model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(AutomaticDetails, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(AutomaticDetails) filter?: Filter<AutomaticDetails>
  ): Promise<any> {
    return await this.automaticDetailsRepository.find(filter);
  }

  @patch(PATH + "/automatic-details")
  @response(200, {
    description: "AutomaticDetails PATCH success count",
    content: { "application/json": { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(AutomaticDetails, { partial: true }),
        },
      },
    })
    automaticDetails: AutomaticDetails,
    @param.where(AutomaticDetails) where?: Where<AutomaticDetails>
  ): Promise<Count> {
    return this.automaticDetailsRepository.updateAll(automaticDetails, where);
  }

  @get(PATH + "/automatic-details/{id}")
  @response(200, {
    description: "AutomaticDetails model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(AutomaticDetails, { includeRelations: true }),
        include: ["_id"],
      },
    },
  })
  async findById(
    @param.path.string("id") _id: string,
    @param.filter(AutomaticDetails, { exclude: "where" })
    filter?: FilterExcludingWhere<AutomaticDetails>
  ): Promise<AutomaticDetails> {
    return this.automaticDetailsRepository.findById(_id, filter);
  }

  @patch(PATH + "/automatic-details/{id}")
  @response(204, {
    description: "AutomaticDetails PATCH success",
  })
  async updateById(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(AutomaticDetails, { partial: true }),
        },
      },
    })
    automaticDetails: AutomaticDetails
  ): Promise<void> {
    await this.automaticDetailsRepository.updateById(id, automaticDetails);
  }

  @put(PATH + "/automatic-details/{id}")
  @response(204, {
    description: "AutomaticDetails PUT success",
  })
  async replaceById(
    @param.path.string("id") id: string,
    @requestBody() automaticDetails: AutomaticDetails
  ): Promise<void> {
    await this.automaticDetailsRepository.replaceById(id, automaticDetails);
  }

  @del(PATH + "/automatic-details/{id}")
  @response(204, {
    description: "AutomaticDetails DELETE success",
  })
  async deleteById(@param.path.string("id") id: string): Promise<void> {
    await this.automaticDetailsRepository.deleteById(id);
  }
  //#endregion AutomaticDetails

  //#region AutomaticResults
  @post(PATH + "/automatic-results")
  @response(200, {
    description: "AutomaticResults model instance",
    content: {
      "application/json": { schema: getModelSchemaRef(AutomaticResults) },
    },
  })
  async create_automatic_result(
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

  @get(PATH + "/automatic-results/count")
  @response(200, {
    description: "AutomaticResults model count",
    content: { "application/json": { schema: CountSchema } },
  })
  async count_automatic_result(
    @param.where(AutomaticResults) where?: Where<AutomaticResults>
  ): Promise<Count> {
    return this.automaticResultsRepository.count(where);
  }

  @get(PATH + "/automatic-results")
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
  async find_automatic_result(
    @param.filter(AutomaticResults) filter?: Filter<AutomaticResults>
  ): Promise<any> {
   return await this.automaticResultsRepository.find(filter);
  }

  @patch(PATH + "/automatic-results")
  @response(200, {
    description: "AutomaticResults PATCH success count",
    content: { "application/json": { schema: CountSchema } },
  })
  async updateAll_automatic_result(
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

  @get(PATH + "/automatic-results/{id}")
  @response(200, {
    description: "AutomaticResults model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(AutomaticResults, { includeRelations: true }),
      },
    },
  })
  async findById_automatic_result(
    @param.path.string("id") id: string,
    @param.filter(AutomaticResults, { exclude: "where" })
    filter?: FilterExcludingWhere<AutomaticResults>
  ): Promise<AutomaticResults> {
    return this.automaticResultsRepository.findById(id, filter);
  }

  @patch(PATH + "/automatic-results/{id}")
  @response(204, {
    description: "AutomaticResults PATCH success",
  })
  async updateById_automatic_result(
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

  @put(PATH + "/automatic-results/{id}")
  @response(204, {
    description: "AutomaticResults PUT success",
  })
  async replaceById_automatic_result(
    @param.path.string("id") id: string,
    @requestBody() automaticResults: AutomaticResults
  ): Promise<void> {
    await this.automaticResultsRepository.replaceById(id, automaticResults);
  }

  @del(PATH + "/automatic-results/{id}")
  @response(204, {
    description: "AutomaticResults DELETE success",
  })
  async deleteById_automatic_result(
    @param.path.string("id") id: string
  ): Promise<void> {
    await this.automaticResultsRepository.deleteById(id);
  }
  //#endregion AutomaticResults

  //#region ManualResults
  @post(PATH + "/manual-results")
  @response(200, {
    description: "ManualResults model instance",
    content: {
      "application/json": { schema: getModelSchemaRef(ManualResults) },
    },
  })
  async create_manual_result(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(ManualResults, {
            title: "NewManualResults",
            exclude: ["_id"],
          }),
        },
      },
    })
    manualResults: Omit<ManualResults, "id">
  ): Promise<ManualResults> {
    return this.manualResultsRepository.create(manualResults);
  }

  @get(PATH + "/manual-results/count")
  @response(200, {
    description: "ManualResults model count",
    content: { "application/json": { schema: CountSchema } },
  })
  async count_manual_result(
    @param.where(ManualResults) where?: Where<ManualResults>
  ): Promise<Count> {
    return this.manualResultsRepository.count(where);
  }

  @get(PATH + "/manual-results")
  @response(200, {
    description: "Array of ManualResults model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(ManualResults, { includeRelations: true }),
        },
      },
    },
  })
  async find_manual_result(
    @param.filter(ManualResults) filter?: Filter<ManualResults>
  ): Promise<any> {
    return await this.manualResultsRepository.find(filter);
  }

  @patch(PATH + "/manual-results")
  @response(200, {
    description: "ManualResults PATCH success count",
    content: { "application/json": { schema: CountSchema } },
  })
  async updateAll_manual_result(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(ManualResults, { partial: true }),
        },
      },
    })
    manualResults: ManualResults,
    @param.where(ManualResults) where?: Where<ManualResults>
  ): Promise<Count> {
    return this.manualResultsRepository.updateAll(manualResults, where);
  }

  @get(PATH + "/manual-results/{id}")
  @response(200, {
    description: "ManualResults model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(ManualResults, { includeRelations: true }),
      },
    },
  })
  async findById_manual_result(
    @param.path.string("id") id: string,
    @param.filter(ManualResults, { exclude: "where" })
    filter?: FilterExcludingWhere<ManualResults>
  ): Promise<ManualResults> {
    return this.manualResultsRepository.findById(id, filter);
  }

  @patch(PATH + "/manual-results/{id}")
  @response(204, {
    description: "ManualResults PATCH success",
  })
  async updateById_manual_result(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(ManualResults, { partial: true }),
        },
      },
    })
    manualResults: ManualResults
  ): Promise<void> {
    await this.manualResultsRepository.updateById(id, manualResults);
  }

  @put(PATH + "/manual-results/{id}")
  @response(204, {
    description: "ManualResults PUT success",
  })
  async replaceById_manual_result(
    @param.path.string("id") id: string,
    @requestBody() manualResults: ManualResults
  ): Promise<void> {
    await this.manualResultsRepository.replaceById(id, manualResults);
  }

  @del(PATH + "/manual-results/{id}")
  @response(204, {
    description: "ManualResults DELETE success",
  })
  async deleteById_manual_result(
    @param.path.string("id") id: string
  ): Promise<void> {
    await this.manualResultsRepository.deleteById(id);
  }
  //#endregion ManualResults

  //#region ManualDetails
  @post(PATH + "/manual-details")
  @response(200, {
    description: "ManualDetails model instance",
    content: {
      "application/json": { schema: getModelSchemaRef(ManualDetails) },
    },
  })
  async create_manual_detail(
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

  @get(PATH + "/manual-details/count")
  @response(200, {
    description: "ManualDetails model count",
    content: { "application/json": { schema: CountSchema } },
  })
  async count_manual_detail(
    @param.where(ManualDetails) where?: Where<ManualDetails>
  ): Promise<Count> {
    return this.manualDetailsRepository.count(where);
  }

  @get(PATH + "/manual-details")
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
  async find_manual_detail(
    @param.filter(ManualDetails) filter?: Filter<ManualDetails>
  ): Promise<any> {
    return await this.manualDetailsRepository.find(filter);
  }

  @patch(PATH + "/manual-details")
  @response(200, {
    description: "ManualDetails PATCH success count",
    content: { "application/json": { schema: CountSchema } },
  })
  async updateAll_manual_detail(
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

  @get(PATH + "/manual-details/{id}")
  @response(200, {
    description: "ManualDetails model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(ManualDetails, { includeRelations: true }),
      },
    },
  })
  async findById_manual_detail(
    @param.path.string("id") id: string,
    @param.filter(ManualDetails, { exclude: "where" })
    filter?: FilterExcludingWhere<ManualDetails>
  ): Promise<ManualDetails> {
    return this.manualDetailsRepository.findById(id, filter);
  }

  @patch(PATH + "/manual-details/{id}")
  @response(204, {
    description: "ManualDetails PATCH success",
  })
  async updateById_manual_detail(
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

  @put(PATH + "/manual-details/{id}")
  @response(204, {
    description: "ManualDetails PUT success",
  })
  async replaceById_manual_detail(
    @param.path.string("id") id: string,
    @requestBody() manualDetails: ManualDetails
  ): Promise<void> {
    await this.manualDetailsRepository.replaceById(id, manualDetails);
  }

  @del(PATH + "/manual-details/{id}")
  @response(204, {
    description: "ManualDetails DELETE success",
  })
  async deleteById_manual_detail(@param.path.string("id") id: string): Promise<void> {
    await this.manualDetailsRepository.deleteById(id);
  }
  //#endregion ManualDetails

  //#region Configurations
  @get(PATH + '/configuration')
  @response(200, {
    description: 'Array of ManualDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Configurations, {includeRelations: true}),
        },
      },
    },
  })
  async find_comfiguration(
    @param.filter(Configurations) filter?: Filter<Configurations>
  ): Promise<any> {
    return await this.configurationsRepository.find(filter);
  }
  //#endregion Configurations

  //#region Certificates
  @post(PATH + '/certificates')
  @response(200, {
    description: 'ManualDetails model instance',
    content: {'application/json': {schema: getModelSchemaRef(Certificates)}},
  })
  async create_certificate(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Certificates, {
            title: '',
            exclude: ['_id'],
          }),
        },
      },
    })
    Certificates: Omit<Certificates, 'id'>,
  ): Promise<Certificates> {
    return this.certificatesRepository.create(Certificates);
  }

  @get(PATH + '/certificates')
  @response(200, {
    description: 'Array of ManualDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Certificates, {includeRelations: true}),
        },
      },
    },
  })
  async find_certificate(
    @param.filter(Certificates) filter?: Filter<Certificates>
  ): Promise<any> {
    return await this.certificatesRepository.find(filter);
  }
  //#endregion Certificates
}
