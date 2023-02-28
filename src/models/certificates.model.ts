import { Entity, model, property } from "@loopback/repository";

@model()
export class Certificates extends Entity {
  @property({ type: "string", id: true })
  _id: string;

  @property({ type: "string" })
  macAddress: string;

  @property({ type: "string" })
  privateKey: string;

  @property({ type: "string" })
  publicKey: string;

  @property({ type: "string" })
  pem: string;

  @property({ type: "boolean" })
  isAllocated: boolean;

  @property({ type: "string" })
  createdBy: string;

  @property({ type: "date" })
  createdDate: Date = new Date();

  @property({ type: "string" })
  modifyBy: string;

  @property({ type: "date" })
  modifyDate: Date;

  constructor(data?: Partial<Certificates>) {
    super(data);
  }
}

export interface CertificatesRelations {
  // describe navigational properties here
}

export type CertificatesWithRelations = Certificates & CertificatesRelations;
