import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {SettingValues, SettingValuesRelations} from '../models';

export class SettingValuesRepository extends DefaultCrudRepository<
  SettingValues,
  typeof SettingValues.prototype._id,
  SettingValuesRelations
> {
  constructor(
    @inject('datasources.QcSbo25') dataSource: QcDataDataSource,
  ) {
    super(SettingValues, dataSource);
  }
}
