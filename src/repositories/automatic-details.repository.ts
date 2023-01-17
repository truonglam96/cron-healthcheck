import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {AutomaticDetails, AutomaticDetailsRelations} from '../models';

export class AutomaticDetailsRepository extends DefaultCrudRepository<
  AutomaticDetails,
  typeof AutomaticDetails.prototype._id,
  AutomaticDetailsRelations
> {
  constructor(
    @inject('datasources.QcSbo25') dataSource: QcDataDataSource,
  ) {
    super(AutomaticDetails, dataSource);
  }
}
