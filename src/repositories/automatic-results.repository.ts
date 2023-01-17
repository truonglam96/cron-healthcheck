import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {AutomaticResults, AutomaticResultsRelations} from '../models';

export class AutomaticResultsRepository extends DefaultCrudRepository<
  AutomaticResults,
  typeof AutomaticResults.prototype._id,
  AutomaticResultsRelations
> {
  constructor(
    @inject('datasources.QcSbo25') dataSource: QcDataDataSource,
  ) {
    super(AutomaticResults, dataSource);
  }
}
