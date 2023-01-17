import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {ManualResults, ManualResultsRelations} from '../models';

export class ManualResultsRepository extends DefaultCrudRepository<
  ManualResults,
  typeof ManualResults.prototype._id,
  ManualResultsRelations
> {
  constructor(
    @inject('datasources.QcSbo25') dataSource: QcDataDataSource,
  ) {
    super(ManualResults, dataSource);
  }
}
