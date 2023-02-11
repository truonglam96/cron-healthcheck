import { Entity, model, property } from "@loopback/repository";

@model()
export class SettingValues extends Entity {
  @property({ type: "string", id: true })
  _id: string;
  
  @property({ type: "string"})
  settingName: string;

  @property({ type: "any"})
  data: any;

  @property({ type: "date"})
  createdDate?: Date = new Date();

  constructor(data?: Partial<SettingValues>) {
    super(data);
  }
}

export interface SettingValuesRelations {
  // describe navigational properties here
}

export type SettingValuesWithRelations = SettingValues &
SettingValuesRelations;
