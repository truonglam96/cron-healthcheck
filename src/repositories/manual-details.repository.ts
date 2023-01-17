import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {ManualDetails, ManualDetailsRelations} from '../models';

export class ManualDetailsRepository extends DefaultCrudRepository<
  ManualDetails,
  typeof ManualDetails.prototype._id,
  ManualDetailsRelations
> {
  constructor(
    @inject('datasources.QcSbo25') dataSource: QcDataDataSource,
  ) {
    super(ManualDetails, dataSource);
  }
}
