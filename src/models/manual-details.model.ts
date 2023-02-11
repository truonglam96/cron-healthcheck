import {Entity, model, property} from '@loopback/repository';

@model()
export class ManualDetails extends Entity {
  @property({ type: "string", id: true })
  _id: string;

  @property({ type: "number"})
  testNumber: number;

  @property({ type: "boolean"})
  isPass: boolean;

  @property({ type: "string"})
  macAddress: string;

  @property({ type: "string"})
  logResult: string;

  @property({ type: "string"})
  type: string;

  @property({ type: "string"})
  resultData: string;

  @property({ type: "string"})
  imageB64: string;

  @property({ type: "string"})
  testingTime: string;

  @property({ type: "string"})
  firmwareOTA: string;

  @property({ type: "date"})
  createdDate: Date;

  constructor(data?: Partial<ManualDetails>) {
    super(data);
  }
}

export interface ManualDetailsRelations {
  // describe navigational properties here
}

export type ManualDetailsWithRelations = ManualDetails & ManualDetailsRelations;
