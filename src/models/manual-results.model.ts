import {Entity, model, property} from '@loopback/repository';

@model()
export class ManualResults extends Entity {
  @property({ type: "string", id: true })
  _id: string;

  constructor(data?: Partial<ManualResults>) {
    super(data);
  }
}

export interface ManualResultsRelations {
  // describe navigational properties here
}

export type ManualResultsWithRelations = ManualResults & ManualResultsRelations;
