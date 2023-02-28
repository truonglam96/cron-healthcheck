import {Entity, model, property} from '@loopback/repository';
import { UserCredentials } from './user-credentials.model';

@model()
export class Users extends Entity {
  @property({ type: "string", id: true, generated: true })
  _id: string;
  
  @property({ type: "string"})
  username: string;

  @property({ type: "string"})
  email: any;

  @property({ type: "string"})
  emailVerified: any;

  @property({ type: "string"})
  verificationToken: any;

  @property({ type: "any"})
  userCredentials: UserCredentials;

  @property({ type: "date"})
  createdDate?: Date = new Date();

  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
