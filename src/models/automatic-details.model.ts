import { Entity, model, property } from "@loopback/repository";

@model()
export class AutomaticDetails extends Entity {
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
  testingTime: string;

  @property({ type: "string"})
  type: string;

  @property({ type: "string"})
  resultData: string;

  @property({ type: "string"})
  firmwareTestName: string;

  @property({ type: "date"})
  createdDate: Date;

  constructor(data?: Partial<AutomaticDetails>) {
    super(data);
  }
}

export interface AutomaticDetailsRelations {
  // describe navigational properties here
}

export type AutomaticDetailsWithRelations = AutomaticDetails &
  AutomaticDetailsRelations;
