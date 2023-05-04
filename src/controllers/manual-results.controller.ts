import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
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
} from '@loopback/rest';
import {ManualResults} from '../models';
import {ManualResultsRepository} from '../repositories';

@authenticate('jwt')
export class ManualResultsController {
  constructor(
    @repository(ManualResultsRepository)
    public manualResultsRepository : ManualResultsRepository,
  ) {}

  @post('/manual-results')
  @response(200, {
    description: 'ManualResults model instance',
    content: {'application/json': {schema: getModelSchemaRef(ManualResults)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ManualResults, {
            title: 'NewManualResults',
            exclude: ['_id'],
          }),
        },
      },
    })
    manualResults: Omit<ManualResults, 'id'>,
  ): Promise<ManualResults> {
    return this.manualResultsRepository.create(manualResults);
  }

  @get('/manual-results/count')
  @response(200, {
    description: 'ManualResults model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ManualResults) where?: Where<ManualResults>,
  ): Promise<Count> {
    return this.manualResultsRepository.count(where);
  }

  @get('/manual-results')
  @response(200, {
    description: 'Array of ManualResults model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ManualResults, {includeRelations: true}),
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
          macAddress: { neq: "" },
          and: [
            { lastDate: { gte: new Date(fromDate) } },
            { lastDate: { lte: new Date(toDate) } },
          ],
        },
        order: ["lastDate DESC"],
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

    return await this.manualResultsRepository.find(filter);
  }

  @patch('/manual-results')
  @response(200, {
    description: 'ManualResults PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ManualResults, {partial: true}),
        },
      },
    })
    manualResults: ManualResults,
    @param.where(ManualResults) where?: Where<ManualResults>,
  ): Promise<Count> {
    return this.manualResultsRepository.updateAll(manualResults, where);
  }

  @get('/manual-results/{id}')
  @response(200, {
    description: 'ManualResults model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ManualResults, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ManualResults, {exclude: 'where'}) filter?: FilterExcludingWhere<ManualResults>
  ): Promise<ManualResults> {
    return this.manualResultsRepository.findById(id, filter);
  }

  @patch('/manual-results/{id}')
  @response(204, {
    description: 'ManualResults PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ManualResults, {partial: true}),
        },
      },
    })
    manualResults: ManualResults,
  ): Promise<void> {
    await this.manualResultsRepository.updateById(id, manualResults);
  }

  @put('/manual-results/{id}')
  @response(204, {
    description: 'ManualResults PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() manualResults: ManualResults,
  ): Promise<void> {
    await this.manualResultsRepository.replaceById(id, manualResults);
  }

  @del('/manual-results/{id}')
  @response(204, {
    description: 'ManualResults DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.manualResultsRepository.deleteById(id);
  }
}
