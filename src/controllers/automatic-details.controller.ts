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
import {AutomaticDetails} from '../models';
import {AutomaticDetailsRepository} from '../repositories';

@authenticate('jwt')
export class AutomaticDetailsController {
  constructor(
    @repository(AutomaticDetailsRepository)
    public automaticDetailsRepository : AutomaticDetailsRepository,
  ) {}

  @post('/automatic-details')
  @response(200, {
    description: 'AutomaticDetails model instance',
    content: {'application/json': {schema: getModelSchemaRef(AutomaticDetails)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AutomaticDetails, {
            title: 'NewAutomaticDetails',
            exclude: ['_id'],
          }),
        },
      },
    })
    automaticDetails: Omit<AutomaticDetails, 'id'>,
  ): Promise<AutomaticDetails> {
    return this.automaticDetailsRepository.create(automaticDetails);
  }

  @get('/automatic-details/count')
  @response(200, {
    description: 'AutomaticDetails model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AutomaticDetails) where?: Where<AutomaticDetails>,
  ): Promise<Count> {
    return this.automaticDetailsRepository.count(where);
  }

  @get('/automatic-details')
  @response(200, {
    description: 'Array of AutomaticDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AutomaticDetails, {includeRelations: true}),
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

    return await this.automaticDetailsRepository.find(filter);
  }

  @patch('/automatic-details')
  @response(200, {
    description: 'AutomaticDetails PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AutomaticDetails, {partial: true}),
        },
      },
    })
    automaticDetails: AutomaticDetails,
    @param.where(AutomaticDetails) where?: Where<AutomaticDetails>,
  ): Promise<Count> {
    return this.automaticDetailsRepository.updateAll(automaticDetails, where);
  }

  @get('/automatic-details/{id}')
  @response(200, {
    description: 'AutomaticDetails model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AutomaticDetails, {includeRelations: true}),
        include: ['_id'],
      },
    },
  })
  async findById(
    @param.path.string('id') _id: string,
    @param.filter(AutomaticDetails, {exclude: 'where'}) filter?: FilterExcludingWhere<AutomaticDetails>
  ): Promise<AutomaticDetails> {
    return this.automaticDetailsRepository.findById(_id, filter);
  }

  @patch('/automatic-details/{id}')
  @response(204, {
    description: 'AutomaticDetails PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AutomaticDetails, {partial: true}),
        },
      },
    })
    automaticDetails: AutomaticDetails,
  ): Promise<void> {
    await this.automaticDetailsRepository.updateById(id, automaticDetails);
  }

  @put('/automatic-details/{id}')
  @response(204, {
    description: 'AutomaticDetails PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() automaticDetails: AutomaticDetails,
  ): Promise<void> {
    await this.automaticDetailsRepository.replaceById(id, automaticDetails);
  }

  @del('/automatic-details/{id}')
  @response(204, {
    description: 'AutomaticDetails DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.automaticDetailsRepository.deleteById(id);
  }
}
