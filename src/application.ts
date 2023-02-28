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
import {MetricsBindings, MetricsComponent} from '@loopback/metrics';
import multer from 'multer';
import {FILE_UPLOAD_SERVICE, STORAGE_DIRECTORY} from './keys';
import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  MyUserService,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {QcDataDataSource} from './datasources';


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
    this.component(CronComponent);
    this.add(createBindingFromClass(CronService));

    // Configure file upload with multer options
    this.configureFileUpload(options.fileStorageDirectory);

    // Configure metrics prometheus
    this.component(MetricsComponent);
    this.configure(MetricsBindings.COMPONENT).to({
      endpoint: {
        basePath: '/metrics',
      },
      defaultMetrics: {
        timeout: 5000,
      },
      defaultLabels: {
        service: 'api',
        version: '1.0.0',
      },
    });
    this.configure(MetricsBindings.COMPONENT).to({
      openApiSpec: true,
    });

    //
    // ------ ADD SNIPPET AT THE BOTTOM ---------
    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(QcDataDataSource, UserServiceBindings.DATASOURCE_NAME);
    // ------------- END OF SNIPPET -------------
    
    //new
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }

  protected configureFileUpload(destination?: string) {
    // Upload files to `dist/.sandbox` by default
    // destination = destination ?? path.join(__dirname, '../.sandbox');
    destination = destination ?? path.join(__dirname, '../.storage');
    this.bind(STORAGE_DIRECTORY).to(destination);
    const multerOptions: multer.Options = {
      storage: multer.diskStorage({
        destination,
        // Use the original file name as is
        filename: (req: any, file: any, cb: any) => {
          cb(null, file.originalname);
        },
      }),
    };
    // Configure the file upload service with multer options
    this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);
  }

}
if (process.env.BYPASS_EXITCODE !== '') {
  process.on('uncaughtException', function (err) {
    console.error(err);
    console.log('Node NOT Exiting...');
  });
}
