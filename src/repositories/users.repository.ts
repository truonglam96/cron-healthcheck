import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype._id,
  UsersRelations
> {
  constructor(
    @inject('datasources.QcSbo25') dataSource: QcDataDataSource,
  ) {
    super(Users, dataSource);
  }
}
