import {Entity, model, property} from '@loopback/repository';

@model()
export class Certificates extends Entity {
  @property({ type: "string", id: true })
  _id: string;

  constructor(data?: Partial<Certificates>) {
    super(data);
  }
}

export interface CertificatesRelations {
  // describe navigational properties here
}

export type CertificatesWithRelations = Certificates & CertificatesRelations;
