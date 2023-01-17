import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {Configurations, ConfigurationsRelations} from '../models';

export class ConfigurationsRepository extends DefaultCrudRepository<
  Configurations,
  typeof Configurations.prototype._id,
  ConfigurationsRelations
> {
  constructor(
    @inject('datasources.QcSbo25') dataSource: QcDataDataSource,
  ) {
    super(Configurations, dataSource);
  }
}
