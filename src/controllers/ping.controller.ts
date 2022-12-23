import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
  param,
} from '@loopback/rest';
import { query } from 'express';
import { ElasticService } from '../services';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject('services.ElasticService') protected elastic: ElasticService,
    @inject(RestBindings.Http.REQUEST) private req: Request,
    
  ) {}

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  @get('/get_img')
  @response(200, {})
  async getLink(
  ): Promise<any> {
    var files = require('fs').readdirSync('./public/image/');
    let arr = [];
    for (const iterator of files) {
      // arr.push(__dirname.replace('dist\\controllers','') + 'public\\image\\' + iterator)
      // arr.push( 'image\\' + iterator)
      arr.unshift('image\\' + iterator)
    }
    return arr
  }

}
