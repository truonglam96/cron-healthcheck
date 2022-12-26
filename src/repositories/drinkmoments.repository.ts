import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { DrinkMomentsDataSource } from "../datasources";
import { DrinkMoments, DrinkMomentsRelations } from "../models";

export class DrinkMomentsRepository extends DefaultCrudRepository<
  DrinkMoments,
  typeof DrinkMoments.prototype._id,
  DrinkMomentsRelations
> {
  constructor(
    @inject("datasources.DrinkMoments") dataSource: DrinkMomentsDataSource
  ) {
    super(DrinkMoments, dataSource);
  }
}
