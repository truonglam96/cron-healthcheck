import {Entity, model, property} from '@loopback/repository';

@model()
export class FirmWares extends Entity {

  @property({type: 'string', id: true, generated: true})
  _id: string;

  @property({
    type: 'string',
  })
  fwName?: string;

  @property({
    type: 'string',
  })
  fwUrl?: string;

  @property({
    type: 'date',
  })
  createdDate?: Date = new Date();

  constructor(data?: Partial<FirmWares>) {
    super(data);
  }
}

export interface FirmWaresRelations {
  // describe navigational properties here
}

export type FirmWaresWithRelations = FirmWares & FirmWaresRelations;
