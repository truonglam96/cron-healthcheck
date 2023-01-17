import {Entity, model, property} from '@loopback/repository';

@model()
export class AutomaticResults extends Entity {
  @property({ type: "string", id: true })
  _id: string;

  constructor(data?: Partial<AutomaticResults>) {
    super(data);
  }
}

export interface AutomaticResultsRelations {
  // describe navigational properties here
}

export type AutomaticResultsWithRelations = AutomaticResults & AutomaticResultsRelations;
