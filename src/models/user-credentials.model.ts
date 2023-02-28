import {Entity, model, property} from '@loopback/repository';

@model()
export class UserCredentials extends Entity {
  @property({ type: "string", id: true })
  _id: string;
  
  @property({ type: "string"})
  password: string;

  @property({ type: "string"})
  userId: any;

  [prop: string]: any;
  
  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials & UserCredentialsRelations;
