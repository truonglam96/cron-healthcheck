import { Entity, model, property } from "@loopback/repository";

@model()
export class AutomaticDetails extends Entity {
  @property({ type: "string", id: true })
  _id: string;

  constructor(data?: Partial<AutomaticDetails>) {
    super(data);
  }
}

export interface AutomaticDetailsRelations {
  // describe navigational properties here
}

export type AutomaticDetailsWithRelations = AutomaticDetails &
  AutomaticDetailsRelations;
