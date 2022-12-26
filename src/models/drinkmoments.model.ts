import {Entity, model, property} from '@loopback/repository';

@model()
export class DrinkMoments extends Entity {

  @property({type: 'string', id: true, generated: true})
  _id: string;

  @property({
    type: 'string',
  })
  firmware?: string;

  @property({
    type: 'string',
  })
  boxId?: string;

  @property({
    type: 'string',
  })
  deviceSerial?: string;

  @property({
    type: 'string',
  })
  battery?: string;

  @property({
    type: 'string',
  })
  count?: string;

  @property({
    type: 'string',
  })
  deviceTime?: string;

  @property({
    type: 'string',
  })
  totalAwakeTime?: string;

  @property({
    type: 'string',
  })
  restartCount?: string;

  @property({
    type: 'any',
  })
  connection?: any;

  @property({
    type: 'string',
  })
  wifiConnectStart?: string;

  @property({
    type: 'string',
  })
  wifiConnectDone?: string;

  @property({
    type: 'string',
  })
  rssi?: string;

  @property({
    type: 'string',
  })
  cameraWakeupCount?: string;

  @property({
    type: 'string',
  })
  imgType?: string;

  @property({
    type: 'string',
  })
  imageCaptureTime?: string;

  @property({
    type: 'string',
  })
  captureTimeRel?: string;

  @property({
    type: 'string',
  })
  successfulImageUploadCount?: string;

  @property({
    type: 'string',
  })
  serialNr?: string;

  @property({
    type: 'string',
  })
  uniqueID?: string;

  @property({
    type: 'any',
  })
  imagesRemaining?: any;

  @property({
    type: 'string',
  })
  imagesUploadedInCycle?: string;

  @property({
    type: 'string',
  })
  HPI?: string;

  @property({
    type: 'string',
  })
  temperature?: string;

  @property({
    type: 'string',
  })
  humidity?: string;

  @property({
    type: 'string',
  })
  remainingImgInfo?: string;

  @property({
    type: 'string',
  })
  imageB64?: string;

  @property({
    type: 'string',
  })
  imu?: string;

  @property({
    type: 'string',
  })
  force?: string;
  
  @property({
    type: 'date',
  })
  createdDate?: Date = new Date();

  constructor(data?: Partial<DrinkMoments>) {
    super(data);
  }
}

export interface DrinkMomentsRelations {
  // describe navigational properties here
}

export type DrinkMomentsWithRelations = DrinkMoments & DrinkMomentsRelations;
