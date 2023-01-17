import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {Certificates, CertificatesRelations} from '../models';

export class CertificatesRepository extends DefaultCrudRepository<
  Certificates,
  typeof Certificates.prototype._id,
  CertificatesRelations
> {
  constructor(
    @inject('datasources.QcSbo25') dataSource: QcDataDataSource,
  ) {
    super(Certificates, dataSource);
  }
}
