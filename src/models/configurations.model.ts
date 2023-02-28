import { Entity, model, property } from "@loopback/repository";

@model()
export class Configurations extends Entity {
  @property({ type: "string", id: true })
  _id: string;

  @property({ type: "string" })
  model: string;

  @property({ type: "string" })
  mechanical: string;

  @property({ type: "string" })
  mechanical_additional: string;

  @property({ type: "string" })
  electrical: string;

  @property({ type: "string" })
  electrical_additional: string;

  @property({ type: "string" })
  line: string;

  @property({ type: "string" })
  weekNumber: string;

  @property({ type: "string" })
  year: string;

  @property({ type: "any" })
  scenarioUsing: any;

  @property({ type: "string" })
  createdBy: string;

  @property({ type: "date" })
  createdDate: Date = new Date();

  @property({ type: "string" })
  modifyBy: string;

  @property({ type: "date" })
  modifyDate: Date;

  constructor(data?: Partial<Configurations>) {
    super(data);
  }
}

export interface ConfigurationsRelations {
  // describe navigational properties here
}

export type ConfigurationsWithRelations = Configurations &
  ConfigurationsRelations;
