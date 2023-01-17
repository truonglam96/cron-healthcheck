import {Entity, model, property} from '@loopback/repository';

@model()
export class Configurations extends Entity {
  @property({ type: "string", id: true })
  _id: string;

  constructor(data?: Partial<Configurations>) {
    super(data);
  }
}

export interface ConfigurationsRelations {
  // describe navigational properties here
}

export type ConfigurationsWithRelations = Configurations & ConfigurationsRelations;
