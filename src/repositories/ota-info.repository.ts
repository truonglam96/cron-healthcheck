import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DrinkMomentsDataSource} from '../datasources';
import {OtaInfo, OtaInfoRelations} from '../models';

export class OtaInfoRepository extends DefaultCrudRepository<
  OtaInfo,
  typeof OtaInfo.prototype._id,
  OtaInfoRelations
> {
  constructor(
    @inject('datasources.DrinkMoments') dataSource: DrinkMomentsDataSource,
  ) {
    super(OtaInfo, dataSource);
  }
}
