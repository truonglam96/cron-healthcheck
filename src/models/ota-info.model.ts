import {Entity, model, property} from '@loopback/repository';

@model()
export class OtaInfo extends Entity {

  @property({type: 'string', id: true, generated: true})
  _id: string;

  @property({
    type: 'string',
  })
  boxId?: string;

  @property({
    type: 'boolean',
  })
  doUpdate?: boolean;

  @property({
    type: 'boolean',
  })
  doReset?: boolean;

  @property({
    type: 'string',
  })
  fwUrl?: string;

  @property({
    type: 'date',
  })
  createdDate?: Date = new Date();

  constructor(data?: Partial<OtaInfo>) {
    super(data);
  }
}

export interface OtaInfoRelations {
  // describe navigational properties here
}

export type OtaInfoWithRelations = OtaInfo & OtaInfoRelations;
