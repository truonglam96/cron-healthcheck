import {Entity, model, property} from '@loopback/repository';

@model()
export class AutomaticResults extends Entity {
  @property({ type: "string", id: true })
  _id: string;

  @property({ type: "string"})
  macAddress: string;

  @property({ type: "string"})
  HPI: string;

  @property({ type: "date"})
  lastDate: Date;

  @property({ type: "boolean"})
  isPass: boolean;

  @property({ type: "string"})
  lastTestId: string;

  @property({ type: "string"})
  type: string;

  @property({ type: "string"})
  resultData: string;

  constructor(data?: Partial<AutomaticResults>) {
    super(data);
  }
}

export interface AutomaticResultsRelations {
  // describe navigational properties here
}

export type AutomaticResultsWithRelations = AutomaticResults & AutomaticResultsRelations;
