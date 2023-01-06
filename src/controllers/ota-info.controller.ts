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
import {OtaInfo} from '../models';
import {OtaInfoRepository} from '../repositories';

export class OtaInfoController {
  constructor(
    @repository(OtaInfoRepository)
    public otaInfoRepository : OtaInfoRepository,
  ) {}

  @post('/ota-info/add-update')
  @response(200, {
    description: 'OtaInfo model instance',
    content: {'application/json': {schema: {}}},
  })
  async considerAddUpdate(
    @requestBody() body: any,
  ): Promise<any> {

    let otaModel = new OtaInfo();
    otaModel.boxId = body.boxId;
    otaModel.doReset = body.doReset;
    otaModel.doUpdate = body.doUpdate;
    otaModel.fwUrl = body.fwUrl;

    let getInfo = await this.otaInfoRepository.findOne({where: {
      boxId: otaModel.boxId
    }});

    let res
    if(getInfo?._id){
      res = await this.otaInfoRepository.updateById(getInfo?._id, otaModel);
    }else{
      res = await this.otaInfoRepository.create(otaModel);
    }
    return res;
  }

  @post('/ota-infos')
  @response(200, {
    description: 'OtaInfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(OtaInfo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtaInfo, {
            title: 'NewOtaInfo',
            exclude: ['_id'],
          }),
        },
      },
    })
    otaInfo: Omit<OtaInfo, 'string'>,
  ): Promise<OtaInfo> {
    return this.otaInfoRepository.create(otaInfo);
  }

  @get('/ota-infos/count')
  @response(200, {
    description: 'OtaInfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OtaInfo) where?: Where<OtaInfo>,
  ): Promise<Count> {
    return this.otaInfoRepository.count(where);
  }

  @get('/ota-infos')
  @response(200, {
    description: 'Array of OtaInfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OtaInfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OtaInfo) filter?: Filter<OtaInfo>,
  ): Promise<OtaInfo[]> {
    return this.otaInfoRepository.find(filter);
  }

  @patch('/ota-infos')
  @response(200, {
    description: 'OtaInfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtaInfo, {partial: true}),
        },
      },
    })
    otaInfo: OtaInfo,
    @param.where(OtaInfo) where?: Where<OtaInfo>,
  ): Promise<Count> {
    return this.otaInfoRepository.updateAll(otaInfo, where);
  }

  @get('/ota-infos/{id}')
  @response(200, {
    description: 'OtaInfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OtaInfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OtaInfo, {exclude: 'where'}) filter?: FilterExcludingWhere<OtaInfo>
  ): Promise<OtaInfo> {
    return this.otaInfoRepository.findById(id, filter);
  }

  @patch('/ota-infos/{id}')
  @response(204, {
    description: 'OtaInfo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtaInfo, {partial: true}),
        },
      },
    })
    otaInfo: OtaInfo,
  ): Promise<void> {
    await this.otaInfoRepository.updateById(id, otaInfo);
  }

  @put('/ota-infos/{id}')
  @response(204, {
    description: 'OtaInfo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() otaInfo: OtaInfo,
  ): Promise<void> {
    await this.otaInfoRepository.replaceById(id, otaInfo);
  }

  @del('/ota-infos/{id}')
  @response(204, {
    description: 'OtaInfo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.otaInfoRepository.deleteById(id);
  }
}
