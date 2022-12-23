import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, createBindingFromClass} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {CronService} from './services';
import {CronComponent} from "@loopback/cron";
import {log} from './middleware';
import * as dotenv from 'dotenv';


export {ApplicationConfig};

export class GetUrlApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up dotenv
    dotenv.config({ path: '.env' });

    // Set up the custom sequence
    this.sequence(MySequence);
    this.middleware(log);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
    // this.static('/', path.join(__dirname, './public/image'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // Set up Cron Jobs
    // this.component(CronComponent);
    // this.add(createBindingFromClass(CronService));
  }
}
if (process.env.BYPASS_EXITCODE !== '') {
  process.on('uncaughtException', function (err) {
    console.error(err);
    console.log('Node NOT Exiting...');
  });
}
