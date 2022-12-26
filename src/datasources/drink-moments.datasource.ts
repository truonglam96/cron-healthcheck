import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const URL = process.env.MONGODB_URL_DRINK_MOMENTS;

const config = {
  name: 'drinkmoments',
  connector: 'mongodb',
  url: URL,
  host: '',
  port: '',
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true,
  retryWrites: false,
  authSource: '',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DrinkMomentsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'DrinkMoments';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.DrinkMoments', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
    console.log(config);
  }
}
