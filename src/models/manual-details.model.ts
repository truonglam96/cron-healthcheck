import {Entity, model, property} from '@loopback/repository';

@model()
export class ManualDetails extends Entity {
  @property({ type: "string", id: true })
  _id: string;

  constructor(data?: Partial<ManualDetails>) {
    super(data);
  }
}

export interface ManualDetailsRelations {
  // describe navigational properties here
}

export type ManualDetailsWithRelations = ManualDetails & ManualDetailsRelations;
