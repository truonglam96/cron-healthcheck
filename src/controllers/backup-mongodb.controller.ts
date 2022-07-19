import { inject } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { testingresults as Testingresults } from '../models';
import { AutomatictestingresultsRepository, BootsRepository, CertificateinfosRepository, ManualtestingresultsRepository, QctoolfactoryconfigurationsRepository, TestingresultsRepository } from '../repositories';
import { Convertdata2JsonService } from '../services';

export class BackupMongodbController {
  constructor(
    @inject('services.Convertdata2JsonService') private convertData2JsonService: Convertdata2JsonService,
  ) { }

  @get('/backup')
  @response(200, {
    description: 'Array of Testingresults model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Testingresults, { includeRelations: true }),
        },
      },
    },
  })
  async find(
  ): Promise<any> {

    var fs = require('fs');
    var path = require('path');
    // var data=fs.readFileSync('words.json', 'utf8');
    // let data: any = path.join(__dirname, 'data.json');
    // let input: any = path.join(__dirname, 'input.json');

    // let data: any = fs.readFileSync(path.join(__dirname, 'data.json'));
    // let input: any = fs.readFileSync(path.join(__dirname, 'input.json'));

    let data = [
      {
        "id": "1-new",
        "brand": "1-new",
        "insightsBrandLabel": "1-new",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "2-miss",
        "brand": "2-miss",
        "insightsBrandLabel": "2-miss",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "7up-2018-green",
        "brand": "7up",
        "insightsBrandLabel": "vn:7up",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AC:9A:2C-640-1565706605_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "2de504f3-97ed-49d0-b334-5b2e0698ca21"
      },
      {
        "id": "a-2020-blue",
        "brand": "A",
        "insightsBrandLabel": "vn:a",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D5:68-110-1582159095.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "a-2021-green-br",
        "brand": "A",
        "insightsBrandLabel": "br:other",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3A:D8-4656-1647477437.jpg",
        "threshold": 0.85,
        "bottleProductId": "8308f990-10d1-4ab9-b6a1-ef3b9510cd5b"
      },
      {
        "id": "aguila-cero-2018-golden",
        "brand": "Aguila Cero",
        "insightsBrandLabel": "co:aguila-cero-colombia",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D9:E0-687-1565464673_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "aguila-light-2018-yellow",
        "brand": "Aguila Light",
        "insightsBrandLabel": "co:aguila-light-colombia",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:68:98-628-1565633797_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "alhambra-res-roja-2018-brown",
        "brand": "Alhambra Res Roja",
        "insightsBrandLabel": "es:alhambra-res-roja-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "amstel-2021-red-br",
        "brand": "Amstel",
        "insightsBrandLabel": "br:amstel-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:41:6C-289-1627177349.jpg",
        "threshold": 0.5,
        "bottleProductId": "3be93aa0-189b-44c1-8374-72cf64ba9186"
      },
      {
        "id": "amstel-bier-2018-white",
        "brand": "Amstel Bier",
        "insightsBrandLabel": "vn:amstel-bier",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:92:38-684-1565698083_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "c1b401e3-7d39-4354-aee8-3f515261ec4b"
      },
      {
        "id": "amstel-light-2018-white",
        "brand": "Amstel Light",
        "insightsBrandLabel": "us:amstel-light-us",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-15-US-Training-set-v1-1/amstel-light-2018-white/CC_50_E3_82_D2_A8_1546834770_5c32d352cf454.png",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "amstel-radler-2018-yellow",
        "brand": "Amstel Radler",
        "insightsBrandLabel": "es:amstel-radler-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "amstel-ultra-2018-white",
        "brand": "Amstel Ultra",
        "insightsBrandLabel": "mx:amstel-ultra-2018-white-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:8F:1C-51-1565744944_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "5d667247-380a-4a86-a0c6-d84f2c7df2fb"
      },
      {
        "id": "antarctica-2021-blue",
        "brand": "Antarctica",
        "insightsBrandLabel": "br:antarctica-2021-blue-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:2D:24-32-1623958194.jpg",
        "threshold": 0.6,
        "bottleProductId": "82ad083e-4c44-4ca2-b3b5-1ec3d2746c2d"
      },
      {
        "id": "antarctica-2021-bluecover-br",
        "brand": "Antarctica",
        "insightsBrandLabel": "br:antarctica-2021-blue-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:C6:7C-34-1627169952.jpg",
        "threshold": 0.9,
        "bottleProductId": "82ad083e-4c44-4ca2-b3b5-1ec3d2746c2d"
      },
      {
        "id": "aqua-lemon-2018-blue",
        "brand": "Aqua Lemon",
        "insightsBrandLabel": "es:aqua-lemon-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "aqua-orange-2018-blue",
        "brand": "Aqua Orange",
        "insightsBrandLabel": "es:aqua-orange-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "baden-baden-2021-black-br",
        "brand": "Baden Baden",
        "insightsBrandLabel": "br:baden-baden-2021-black-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3C:20-41-1612124856.jpg",
        "threshold": 0.5,
        "bottleProductId": null
      },
      {
        "id": "ballast-point-amber-white",
        "brand": "Ballast Point Amber",
        "insightsBrandLabel": "us:ballast-point-amber-usa",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-15-US-Training-set-v1-1/ballast-point-amber-white/CC_50_E3_83_70_0C_1558639573_5ce6f3d54207c.png",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "ballast-point-sculpin-2018-yellow",
        "brand": "Ballast Point Sculpin",
        "insightsBrandLabel": "us:ballast-point-sculpin-usa",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-15-US-Training-set-v1-1/ballast-point-sculpin-2018-yellow/CC_50_E3_83_70_0C_1558580793_5ce60e39eac8f.png",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "barrilito-2020-black",
        "brand": "Barrilito",
        "insightsBrandLabel": "mx:barrilito-2020-black-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:56:68-2553-1591041254.jpg",
        "threshold": 0.4,
        "bottleProductId": "a54ddc1a-be57-4c65-9dab-5478804dd648"
      },
      {
        "id": "bbc-1-2018-yellow",
        "brand": "BBC",
        "insightsBrandLabel": "co:bbc-colombia",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6F:50-18656-1565299131_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "bbc-2018-yellow",
        "brand": "BBC",
        "insightsBrandLabel": "co:bbc-colombia",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6F:50-18745-1565737808_low.jpg",
        "threshold": 0.5,
        "bottleProductId": null
      },
      {
        "id": "bbc-2018-yellow-small",
        "brand": "BBC",
        "insightsBrandLabel": "co:bbc-colombia",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6F:50-18704-1565554092_low.jpg",
        "threshold": 0.5,
        "bottleProductId": null
      },
      {
        "id": "beck's-bier-2018-silver",
        "brand": "Beck's Bier",
        "insightsBrandLabel": "vn:beck's-bier",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:91:94-912-1565718098_low.jpg",
        "threshold": 0.5,
        "bottleProductId": "b99084ee-8847-46cd-96a2-e70b8d44e8f2"
      },
      {
        "id": "beck's-ice-2018-silver",
        "brand": "Beck's Ice",
        "insightsBrandLabel": "vn:beck's-ice;br:beck's-ice-2018-silver-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6B:9C-8-1565727137_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "d15a4315-6c40-4002-acda-1e90eb580b1e"
      },
      {
        "id": "beck's-ice-2019-silver",
        "brand": "Beck's Ice",
        "insightsBrandLabel": "vn:beck's-ice",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6D:8C-4316-1569850736.jpg",
        "threshold": 0.5,
        "bottleProductId": "d15a4315-6c40-4002-acda-1e90eb580b1e"
      },
      {
        "id": "becks-2021-black-br",
        "brand": "Becks",
        "insightsBrandLabel": "br:becks-2021-black-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:40:64-78-1627173221.jpg",
        "threshold": 0.99,
        "bottleProductId": "b972827f-8881-4b2e-9f4e-620e93b72e5a"
      },
      {
        "id": "bia-viet-2020-white",
        "brand": "Bia Viet",
        "insightsBrandLabel": "vn:bia-viet-2020-white",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:43:54-1844-1592243534.jpg",
        "threshold": 0.6,
        "bottleProductId": "53034984-dfab-4507-9e5c-35b272f9d169"
      },
      {
        "id": "bira91-2018-multicolor",
        "brand": "Bira 91",
        "insightsBrandLabel": "vn:bira91-2018-multicolor",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:C4:1C-277-1584541842.jpg",
        "threshold": 0.6,
        "bottleProductId": "f50d5fab-140f-4c72-90d8-46f4323386fd"
      },
      {
        "id": "black-princess-2021-black-br",
        "brand": "Black Princess",
        "insightsBrandLabel": "br:black-princess-2021-black-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:40:34-694-1627174398.jpg",
        "threshold": 0.5,
        "bottleProductId": "87df84f7-8c81-4700-bee0-a30c9563dac9"
      },
      {
        "id": "bohemia-2018-golden",
        "brand": "Bohemia",
        "insightsBrandLabel": "mx:bohemia-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:9A:C4-659-1565749299_low.jpg",
        "threshold": 0.3,
        "bottleProductId": "9b44466b-c628-44b3-ab3a-a1a48373903a"
      },
      {
        "id": "bohemia-2018-silver-uncovered",
        "brand": "Bohemia",
        "insightsBrandLabel": "mx:bohemia-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6F:58-2149-1574989248.jpg",
        "threshold": 0.5,
        "bottleProductId": "9b44466b-c628-44b3-ab3a-a1a48373903a"
      },
      {
        "id": "bohemia-2021-white-br",
        "brand": "Bohemia",
        "insightsBrandLabel": "br:bohemia-2021-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3D:68-181-1627104012.jpg",
        "threshold": 0.85,
        "bottleProductId": "9b44466b-c628-44b3-ab3a-a1a48373903a"
      },
      {
        "id": "bohemia-2021-whitecover-br",
        "brand": "Bohemia",
        "insightsBrandLabel": "br:bohemia-2021-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:24:B0-130-1626036245.jpg",
        "threshold": 0.5,
        "bottleProductId": "9b44466b-c628-44b3-ab3a-a1a48373903a"
      },
      {
        "id": "bohemia-2021-yellow-br",
        "brand": "Bohemia",
        "insightsBrandLabel": "br:bohemia-2021-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3C:20-33-1612124730.jpg",
        "threshold": 0.5,
        "bottleProductId": null
      },
      {
        "id": "boscoli-2018-black",
        "brand": "Boscoli",
        "insightsBrandLabel": "mx:boscoli-2018-black-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:9C:A0-1453-1573965146.jpg",
        "threshold": 0.85,
        "bottleProductId": "d8d5fa7e-ffce-4e02-90cf-5b4a0def6140"
      },
      {
        "id": "brahma-2021-red-br",
        "brand": "Brahma",
        "insightsBrandLabel": "br:brahma-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:45:44-77-1626922996.jpg",
        "threshold": 0.7,
        "bottleProductId": "4e91abcd-62c4-4d49-b190-f0af23cc5a06"
      },
      {
        "id": "brahma-2021-redcover-br",
        "brand": "Brahma",
        "insightsBrandLabel": "br:brahma-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3E:C0-61-1627226041.jpg",
        "threshold": 0.5,
        "bottleProductId": "4e91abcd-62c4-4d49-b190-f0af23cc5a06"
      },
      {
        "id": "brahma-duplo-malte-2021-red-br",
        "brand": "Brahma Duplo Malte",
        "insightsBrandLabel": "br:brahma-duplo-malte-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3E:0C-374-1626995859.jpg",
        "threshold": 0.5,
        "bottleProductId": "446fe364-f31f-4946-8665-4e8b82c6ee2f"
      },
      {
        "id": "brahma-duplo-malte-2021-redcover-br",
        "brand": "Brahma Duplo Malte",
        "insightsBrandLabel": "br:brahma-duplo-malte-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:4B:44-145-1613948402.jpg",
        "threshold": 0.3,
        "bottleProductId": "446fe364-f31f-4946-8665-4e8b82c6ee2f"
      },
      {
        "id": "brahma-extra-2021-orange-br",
        "brand": "Brahma Extra",
        "insightsBrandLabel": "br:brahma-extra-2021-orange-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3C:20-62-1612125203.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "brooklyn-lager-2018-black",
        "brand": "Brooklyn Lager",
        "insightsBrandLabel": "us:brooklyn-lager-usa",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-15-US-Training-set-v1-1/brooklyn-lager-2018-black/CC_50_E3_82_D2_A8_1547084658_5c36a372d6a0a.png",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "bud-light-2018-blue",
        "brand": "Bud Light",
        "insightsBrandLabel": "mx:bud-light-mx;us:bud-light-usa",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:A9:8C-4000-1565652324_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "e59c148e-4d1f-4670-996e-fed65fa44c86"
      },
      {
        "id": "budweiser-2018-red-bud",
        "brand": "Budweiser",
        "insightsBrandLabel": "mx:budweiser-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FE:E0:E0-289-1565401939_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "51032159-19cc-478e-9cfd-05c5571408a8"
      },
      {
        "id": "budweiser-2018-red-crown",
        "brand": "Budweiser",
        "insightsBrandLabel": "vn:budweiser;co:budweiser-colombia;us:budweiser-usa;ch:budweiser-2018-red-crown-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:72:6C-39-1564757938_low.jpg",
        "threshold": 0.8,
        "bottleProductId": "51032159-19cc-478e-9cfd-05c5571408a8"
      },
      {
        "id": "budweiser-2021-white-br",
        "brand": "Budweiser",
        "insightsBrandLabel": "br:budweiser-2021-white-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3D:68-329-1627188708.jpg",
        "threshold": 0.85,
        "bottleProductId": "51032159-19cc-478e-9cfd-05c5571408a8"
      },
      {
        "id": "budweiser-budvar-2018-golden",
        "brand": "Budweiser Budvar",
        "insightsBrandLabel": "vn:budweiser-budvar-2018-golden",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:5A:18_242_1566532843_low.jpg",
        "threshold": 0.95,
        "bottleProductId": "57dd1c30-1788-4863-aaff-c59688a0564e"
      },
      {
        "id": "calcides-2021-red-br",
        "brand": "Calcides",
        "insightsBrandLabel": "br:calcides-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:35:E8-380-1627000516.jpg",
        "threshold": 0.5,
        "bottleProductId": "e96e11e4-3d23-48c7-b524-58ad174fe91d"
      },
      {
        "id": "canada-dry-2018-blue",
        "brand": "Canada Dry",
        "insightsBrandLabel": "mx:canada-dry-2018-blue-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:B0:08-357-1575098823.jpg",
        "threshold": 0.85,
        "bottleProductId": "439e6dd9-f0b7-4f2f-ae7c-3d302ef5ccdc"
      },
      {
        "id": "carlsberg-2018-black",
        "brand": "Carlsberg",
        "insightsBrandLabel": "es:carlsberg-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "carlsberg-smooth-draught-2018-golden",
        "brand": "Carlsberg Smooth Draught",
        "insightsBrandLabel": "vn:carlsberg-smooth-draught",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D5:20-562-1565593587_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "carlsberg-smooth-draught-2019-green",
        "brand": "Carlsberg Smooth Draught",
        "insightsBrandLabel": "vn:carlsberg-smooth-draught",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:94:BC-826-1575374782.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "carlsberg-smooth-draught-2019-white",
        "brand": "Carlsberg Smooth Draught",
        "insightsBrandLabel": "vn:carlsberg-smooth-draught",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:5A:18_354_1566545420_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "ea152217-ab23-4b7f-b070-bbd186d985e8"
      },
      {
        "id": "carta-blanca-2018-white",
        "brand": "Carta Blanca",
        "insightsBrandLabel": "mx:carta-blanca-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:60:44-574-1565425164_low.jpg",
        "threshold": 0.3,
        "bottleProductId": "73990d1f-e2cd-4b9b-9035-bd4b6910ff5f"
      },
      {
        "id": "chang-2018-green",
        "brand": "Chang",
        "insightsBrandLabel": "vn:chang;th:chang-2018-green-th",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:8B:A8_1209_1565246477_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "c080f8ee-054a-4736-ad85-77ab625361cc"
      },
      {
        "id": "chimay-2018-multicolor",
        "brand": "Chimay",
        "insightsBrandLabel": "vn:chimay",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:95:68-7-1575037770.jpg",
        "threshold": 0.85,
        "bottleProductId": "08e831d8-0726-4c33-8b17-445f4e51ef87"
      },
      {
        "id": "ciel-2018-blue",
        "brand": "Ciel",
        "insightsBrandLabel": "mx:ciel-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FE:DF:B4-12-1565726617_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "8de45037-b7c3-43d3-8b59-8e443c48d190"
      },
      {
        "id": "club-dorada-2018-golden",
        "brand": "Club Colombia Dorada",
        "insightsBrandLabel": "co:club-colombia-dorada",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:58:00-549-1565749485_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "club-negra-2018-black",
        "brand": "Club Colombia Negra",
        "insightsBrandLabel": "co:club-colombia-negra",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:58:00-547-1565734665_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "club-roja-2018-red",
        "brand": "Club Colombia Roja",
        "insightsBrandLabel": "co:club-colombia-roja",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6F:50-18729-1565634809_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "coca-cola-2018-red",
        "brand": "Coca Cola",
        "insightsBrandLabel": "vn:coca-cola;br:coca-cola-2018-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:5A:A4-1027-1565698067_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "5814372d-001e-4ee2-a86d-e96e994f6746"
      },
      {
        "id": "coca-cola-2018-red-us",
        "brand": "Coca Cola",
        "insightsBrandLabel": "us:coca-cola-usa;mx:coca-cola-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-15-US-Training-set-v1-1/coca-cola-2018-red-us/CC_50_E3_82_D2_C0_1547500091_5c3cfa3bc4e2f.png",
        "threshold": 0.6,
        "bottleProductId": "5814372d-001e-4ee2-a86d-e96e994f6746"
      },
      {
        "id": "coca-cola-2018-yellow",
        "brand": "Coca Cola",
        "insightsBrandLabel": "mx:coca-cola-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:5F:A8-131-1565739512_low.jpg",
        "threshold": 0.3,
        "bottleProductId": "5814372d-001e-4ee2-a86d-e96e994f6746"
      },
      {
        "id": "coca-cola-2021-red-br",
        "brand": "Coca Cola",
        "insightsBrandLabel": "br:coca-cola-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:38:28-72-1614548114.jpg",
        "threshold": 0.85,
        "bottleProductId": "6d117764-3958-4001-b992-d0f665cd2893"
      },
      {
        "id": "coca-cola-2021-red-ch",
        "brand": "Coca Cola",
        "insightsBrandLabel": "ch:coca-cola-2021-red-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6D:08-159-1648712315.jpg",
        "threshold": 0.6,
        "bottleProductId": "5814372d-001e-4ee2-a86d-e96e994f6746"
      },
      {
        "id": "coca-cola-2022-red-cross-ch",
        "brand": "Coca Cola",
        "insightsBrandLabel": "ch:coca-cola-2021-red-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:56:D0:30-12-1649929987.jpg",
        "threshold": 0.4,
        "bottleProductId": "5814372d-001e-4ee2-a86d-e96e994f6746"
      },
      {
        "id": "coca-cola-2022-red-it",
        "brand": "Coca Cola",
        "insightsBrandLabel": "vn:coca-cola;it:coca-cola",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/8C:4B:14:39:15:B4-1914-1657793613.jpg",
        "threshold": 0.85,
        "bottleProductId": "5814372d-001e-4ee2-a86d-e96e994f6746"
      },
      {
        "id": "coca-cola-2022-silver-ch",
        "brand": "Coca Cola",
        "insightsBrandLabel": "ch:coca-cola-2021-red-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:56:D0:30-113-1650453414.jpg",
        "threshold": 0.5,
        "bottleProductId": "5814372d-001e-4ee2-a86d-e96e994f6746"
      },
      {
        "id": "coca-cola-light-2018-yellow",
        "brand": "Coca Cola Light",
        "insightsBrandLabel": "mx:coca-cola-light-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:75:E4-20-1565637755_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "375dd7e4-9078-4129-8185-2c14a8eb8813"
      },
      {
        "id": "coca-cola-light-2021-yellow-br",
        "brand": "Coca Cola Light",
        "insightsBrandLabel": "br:coca-cola-light-2021-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3C:48-119-1625440363.jpg",
        "threshold": 0.7,
        "bottleProductId": null
      },
      {
        "id": "coca-cola-zero-2018-black",
        "brand": "Coca Cola Zero",
        "insightsBrandLabel": "mx:coca-cola-zero-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D2:14-2-1565733635_low.jpg",
        "threshold": 0.9,
        "bottleProductId": "dde484c8-d1de-4929-a0af-d3a19c1cd847"
      },
      {
        "id": "coca-cola-zero-2021-black-br",
        "brand": "Coca Cola Zero",
        "insightsBrandLabel": "br:coca-cola-zero-2021-black-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:2D:70-2120-1624204844.jpg",
        "threshold": 0.99,
        "bottleProductId": "dde484c8-d1de-4929-a0af-d3a19c1cd847"
      },
      {
        "id": "coca-cola-zero-2022-black-bottle-ch",
        "brand": "Coca Cola Zero",
        "insightsBrandLabel": "ch:coca-cola-zero-2022-black-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6D:08-722-1648754379.jpg",
        "threshold": 0.6,
        "bottleProductId": "dde484c8-d1de-4929-a0af-d3a19c1cd847"
      },
      {
        "id": "coca-cola-zero-2022-black-cross-ch",
        "brand": "Coca Cola Zero",
        "insightsBrandLabel": "ch:coca-cola-zero-2022-black-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6D:08-409-1648728856.jpg",
        "threshold": 0.6,
        "bottleProductId": "dde484c8-d1de-4929-a0af-d3a19c1cd847"
      },
      {
        "id": "coca-cola-zero-2022-black-it",
        "brand": "Coca Cola Zero",
        "insightsBrandLabel": "vn:coca-cola-zero-2018-black;it:coca-cola-zero-2018-black",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/8C:4B:14:39:15:B4-1765-1657793223.jpg",
        "threshold": 0.85,
        "bottleProductId": "dde484c8-d1de-4929-a0af-d3a19c1cd847"
      },
      {
        "id": "coca-cola-zero-2022-red-cross-ch",
        "brand": "Coca Cola",
        "insightsBrandLabel": "ch:coca-cola-2021-red-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:56:D0:30-12-1649929987.jpg",
        "threshold": 0.5,
        "bottleProductId": "dde484c8-d1de-4929-a0af-d3a19c1cd847"
      },
      {
        "id": "coca-light-2018-silver",
        "brand": "Coca Light",
        "insightsBrandLabel": "es:coca-light-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "coca-origin-2018-red",
        "brand": "Coca Origin",
        "insightsBrandLabel": "es:coca-origin-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "coca-zero-2018-black",
        "brand": "Coca Zero",
        "insightsBrandLabel": "es:coca-zero-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "colimita-2018-blue",
        "brand": "Colimita",
        "insightsBrandLabel": "mx:colimita-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FE:DD:30-102-1563417037_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "colimita-2018-green",
        "brand": "Colimita",
        "insightsBrandLabel": "mx:colimita-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FE:CD:D0-174-1563673176_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "colimita-2018-multicolor",
        "brand": "Colimita",
        "insightsBrandLabel": "mx:colimita-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:9C:64-1713-1574905457.jpg",
        "threshold": 0.85,
        "bottleProductId": "bb3cc534-c0e2-43a5-a325-902e86a3aa08"
      },
      {
        "id": "colimita-2018-red",
        "brand": "Colimita",
        "insightsBrandLabel": "mx:colimita-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:8A:88-94-1563574952_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "colimita-2018-yellow",
        "brand": "Colimita",
        "insightsBrandLabel": "mx:colimita-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:AC:44-2225-1566268543_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "colorado-2021-yellow-br",
        "brand": "Colorado",
        "insightsBrandLabel": "br:colorado-2021-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:41:60-632-1627163646.jpg",
        "threshold": 0.8,
        "bottleProductId": "e1bfde6d-018c-44e9-93c8-a7b584e3cc04"
      },
      {
        "id": "corona-ambar-2019-gold",
        "brand": "Corona Ambar",
        "insightsBrandLabel": "mx:corona-ambar-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:59:54-1351-1565748167_low.jpg",
        "threshold": 0.45,
        "bottleProductId": "1a0fc850-4f33-41d5-8d96-b7d9840fe30f"
      },
      {
        "id": "corona-extra-2018-black",
        "brand": "Corona Extra",
        "insightsBrandLabel": "vn:corona-extra;co:corona-extra-colombia;us:corona-extra-us;ch:corona-extra-ch;at:corona-extra-2018-black-at;br:corona-extra-2018-black-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D5:C0-2923-1565714631_low.jpg",
        "threshold": 0.8,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2018-black-18",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx;vn:corona-extra",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:8F:78-220-1565749906_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2019-gold",
        "brand": "Corona Ambar",
        "insightsBrandLabel": "mx:corona-ambar-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:59:54-1351-1565748167_low.jpg",
        "threshold": 0.45,
        "bottleProductId": null
      },
      {
        "id": "corona-extra-2020-black-ball",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:59:54-862-1580451807.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-c",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:59:54-865-1580452733.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-handshake",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D2:48-939-1580449772.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-orange-footballer",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6D:7C-9515-1580514078.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-white-a",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:59:54-852-1580448214.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-white-ca",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:64:A8-5000-1580515151.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-white-dt",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:59:54-868-1580454678.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-white-leon",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:5E:80-172-1580443295.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-white-m",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:64:A8-4995-1580514748.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-white-pachuca",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D2:48-949-1580455173.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-white-queretaro",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6F:94-866-1580869940.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-white-santos",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6D:7C-9513-1580514075.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-black-white-smallball",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:64:A8-4994-1580514746.jpg",
        "threshold": 0.85,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-red-18",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FE:C6:FC-311-1580874117.jpg",
        "threshold": 0.5,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-red-yellow-18",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:64:A8-4885-1580452026.jpg",
        "threshold": 0.5,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-white-18",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:64:A8-5744-1580874841.jpg",
        "threshold": 0.5,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-extra-2020-yellow-18",
        "brand": "Corona Extra",
        "insightsBrandLabel": "mx:corona-extra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:B4:B0-10-1580454324.jpg",
        "threshold": 0.5,
        "bottleProductId": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb"
      },
      {
        "id": "corona-light-2018-orange",
        "brand": "Corona Light",
        "insightsBrandLabel": "us:corona-light-usa",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-15-US-Training-set-v1-1/corona-light-2018-orange/30_AE_A4_74_81_F8_1533914860_5b6dd74a10774.png",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "corona-light-2018-yellow",
        "brand": "Corona Light",
        "insightsBrandLabel": "mx:corona-light-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FE:E0:48-498-1565661328_low.jpg",
        "threshold": 0.4,
        "bottleProductId": "ffd1f221-40f2-44b1-97be-9ef74d7c1462"
      },
      {
        "id": "corona-premier-2018-white",
        "brand": "Corona Premier",
        "insightsBrandLabel": "us:corona-premier-usa",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-15-US-Training-set-v1-1/corona-premier-2018-white/CC_50_E3_83_70_0C_1558582409_5ce6148901718.png",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "cucapa-2018-red",
        "brand": "Cucapa",
        "insightsBrandLabel": "mx:cucapa-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:92:18-67-1565572597_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "a16de2db-fab9-4397-be4c-21e9c1e86d89"
      },
      {
        "id": "desperados-2019-golden",
        "brand": "Desperados",
        "insightsBrandLabel": "vn:desperados",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:63:28-1547-1565802869_low.jpg",
        "threshold": 0.5,
        "bottleProductId": null
      },
      {
        "id": "devassa-2021-red-br",
        "brand": "Devassa",
        "insightsBrandLabel": "br:devassa-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3E:1C-197-1626042646.jpg",
        "threshold": 0.6,
        "bottleProductId": "469bd946-2aac-4517-8b3d-05e95a961bd0"
      },
      {
        "id": "dos-equis-2018-golden",
        "brand": "Dos Equis",
        "insightsBrandLabel": "mx:dos-equis-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:62:5C-23-1565755863_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "c5a6c16c-d25b-46e3-88d3-d43aeeca70ae"
      },
      {
        "id": "east-west-2018-black",
        "brand": "East West",
        "insightsBrandLabel": "vn:east-west-2018-black",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:C5:58-3563-1584555316.jpg",
        "threshold": 0.6,
        "bottleProductId": "fe101edf-5664-4eab-bc8a-248992102ec7"
      },
      {
        "id": "eisenbahn-2021-black-br",
        "brand": "Eisenbahn",
        "insightsBrandLabel": "br:eisenbahn-2021-black-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:4C:38-1024-1627175908.jpg",
        "threshold": 0.5,
        "bottleProductId": "17b587cf-f944-4ec6-96a0-e516c25b46fc"
      },
      {
        "id": "erdinger-dunkel-2018-black",
        "brand": "Erdinger Dunkel",
        "insightsBrandLabel": "co:erdinger-dunkel-colombia",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:67:20-669-1565311419_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "erdinger-weibbrau-2018-golden",
        "brand": "Erdinger Weibbrau",
        "insightsBrandLabel": "co:erdinger-weissbrau-colombia;mx:erdinger-weibbrau-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:67:20-671-1565314681_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "5adbf8b9-3c92-4ce5-83e7-172f3d4d7f6a"
      },
      {
        "id": "estrella-2020-white",
        "brand": "Estrella",
        "insightsBrandLabel": "mx:estrella-2020-white-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:58:68-376-1584652990.jpg",
        "threshold": 0.85,
        "bottleProductId": "a1071e45-bec9-42f5-a7e4-63e98fca1fe5"
      },
      {
        "id": "estrella-galicia-2021-black-br",
        "brand": "Estrella Galicia",
        "insightsBrandLabel": "br:estrella-galicia-2021-black-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3B:70-812-1627223759.jpg",
        "threshold": 0.85,
        "bottleProductId": "647aa3e1-3298-4dcb-9965-0483d1179f85"
      },
      {
        "id": "fanta-2018-multicolor",
        "brand": "Fanta",
        "insightsBrandLabel": "es:fanta-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "fanta-2018-yellow",
        "brand": "Fanta",
        "insightsBrandLabel": "mx:fanta-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:56:4C-6441-1580506691.jpg",
        "threshold": 0.85,
        "bottleProductId": "17dd0e03-8887-46b1-b146-8843ffd15770"
      },
      {
        "id": "fanta-go-2019-black",
        "brand": "Fanta Go",
        "insightsBrandLabel": "es:fanta-go-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "fanta-orange-2022-orange",
        "brand": "Fanta Orange",
        "insightsBrandLabel": "ch:fanta-orange-2022-orange-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6D:08-557-1648734808.jpg",
        "threshold": 0.6,
        "bottleProductId": "c9f8c76a-88a1-4c1c-8041-b496e7049b7c"
      },
      {
        "id": "fanta-orange-2022-orange-it",
        "brand": "Fanta Orange",
        "insightsBrandLabel": "vn:fanta-orange-2022-orange-ch; it:fanta-orange-2022-orange-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/8C:4B:14:39:15:B4-660-1657785783.jpg",
        "threshold": 0.85,
        "bottleProductId": "c9f8c76a-88a1-4c1c-8041-b496e7049b7c"
      },
      {
        "id": "fresca-2018-yellow",
        "brand": "Fresca",
        "insightsBrandLabel": "mx:fresca-2018-yellow-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:A1:2C-2262-1575401791.jpg",
        "threshold": 0.85,
        "bottleProductId": "f7defcbe-e651-4043-b664-9f2c764d3df0"
      },
      {
        "id": "funky-buddha-2018-black",
        "brand": "Funky Buddha",
        "insightsBrandLabel": "us:funky-buddha-usa",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-15-US-Training-set-v1-1/funky-buddha-2018-black/CC_50_E3_83_6B_0C_1558998163_5cec6c93524bc.png",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "fusetea-lemon-2022-yellow-ch",
        "brand": "Fusetea Lemon",
        "insightsBrandLabel": "ch:fusetea-lemon-2022-yellow-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:52:34:74-911-1652809739.jpg",
        "threshold": 0.85,
        "bottleProductId": "799d03be-6c91-41f4-9c6a-aa786711687b"
      },
      {
        "id": "fusetea-peach-2022-orange",
        "brand": "Fusetea Peach",
        "insightsBrandLabel": "ch:fusetea-peach-2022-orange-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6D:08-434-1648730857.jpg",
        "threshold": 0.6,
        "bottleProductId": "72422905-571d-4ae5-8552-2970cf4d877a"
      },
      {
        "id": "fuze-tea-2022-silver-it",
        "brand": "Fuze Tea",
        "insightsBrandLabel": "vn:fuze-limone-it;it:fuze-limone-it",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/8C:4B:14:39:15:B4-2179-1657796839.jpg",
        "threshold": 0.85,
        "bottleProductId": "b768cd3c-c407-48a9-ac78-9b124e414809"
      },
      {
        "id": "gau-den-2018-black",
        "brand": "Gau Den",
        "insightsBrandLabel": "vn:gau-den",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:7D:78-38-1565709319_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "19fa6574-da1f-4708-8a7f-373322b18dd5"
      },
      {
        "id": "guinness-2018-white",
        "brand": "Guinness",
        "insightsBrandLabel": "vn:guinness-2018-white",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "halida-2018-yellow",
        "brand": "Halida",
        "insightsBrandLabel": "vn:halida",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:8A:54-379-1575424551.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "hanoi-2018-golden",
        "brand": "Hanoi",
        "insightsBrandLabel": "vn:hanoi-beer",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:72:7C-93-1565356569_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "hanoi-2020-golden",
        "brand": "Hanoi",
        "insightsBrandLabel": "vn:hanoi-beer",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:78:9C-6-1581563101.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "heart-of-darkness-2018-black",
        "brand": "Heart of Darkness",
        "insightsBrandLabel": "vn:heart-of-darkness",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:85:B0-82-1584536765.jpg",
        "threshold": 0.85,
        "bottleProductId": "a0cf458f-39a1-4480-ba7c-c00eb64acf05"
      },
      {
        "id": "heineken-0-2019-black",
        "brand": "Heineken 0.0",
        "insightsBrandLabel": "mx:heineken-0-mx;vn:heineken-0;br:heineken-2019-green-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:A9:8C-9619-1575434393.jpg",
        "threshold": 0.6,
        "bottleProductId": "4d5c54c9-6780-4d91-a4f2-fdba87eac8e9"
      },
      {
        "id": "heineken-2018-silver-embossed",
        "brand": "Heineken",
        "insightsBrandLabel": "vn:heineken",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:94:88-326-1565703932_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "heineken-2018-white",
        "brand": "Heineken",
        "insightsBrandLabel": "co:heineken-colombia;mx:heineken-mx;vn:heineken;us:heineken-usa;th:heineken-2018-white-th;ch:heineken-ch;at:heineken-2019-green-at; br:heineken-2019-green-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FE:CD:D0-352-1565752527_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "4855f9d3-e386-4803-9d59-6d853e6f66fe"
      },
      {
        "id": "heineken-2019-green",
        "brand": "Heineken",
        "insightsBrandLabel": "vn:heineken; br:heineken-2019-green-br;at:heineken-2019-green-at;mx:heineken-mx;us:heineken-usa;ch:heineken-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:7F:50-835-1565705968_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "4855f9d3-e386-4803-9d59-6d853e6f66fe"
      },
      {
        "id": "heineken-silver-2019-white",
        "brand": "Heineken Silver",
        "insightsBrandLabel": "vn:heineken-silver",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AC:9A:00-295-1565708853_low.jpg",
        "threshold": 0.3,
        "bottleProductId": "7bb85b61-cd26-4f1c-bedc-8f9713af2cb6"
      },
      {
        "id": "hoegaarden-2019-white",
        "brand": "Hoegaarden",
        "insightsBrandLabel": "vn:hoegaarden-2019-white",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "hoegaarden-rosee-2018-blue",
        "brand": "Hoegaarden Rosee",
        "insightsBrandLabel": "vn:hoegaarden-rosee",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6C:C8-963-1565697967_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "hoegaarden-rosee-2019-white",
        "brand": "Hoegaarden Rosee",
        "insightsBrandLabel": "vn:hoegaarden-rosee",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6A:64-1657-1565705561_low.jpg",
        "threshold": 0.45,
        "bottleProductId": null
      },
      {
        "id": "hoegaarden-simple-2018-white",
        "brand": "Hoegaarden Simple",
        "insightsBrandLabel": "vn:hoegaarden-simple",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:84:EC-169-1565714916_low.jpg",
        "threshold": 0.45,
        "bottleProductId": "7522f000-2a88-417a-a7d0-2300f3f09338"
      },
      {
        "id": "huda-2018-silver",
        "brand": "Huda",
        "insightsBrandLabel": "vn:huda",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AC:99:70-1090-1564065068_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "d0879449-2be8-49c7-9215-4f942e9bbc25"
      },
      {
        "id": "huda-ice-2018-silver",
        "brand": "Huda Ice",
        "insightsBrandLabel": "vn:huda-ice",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:53:84-660-1584534046.jpg",
        "threshold": 0.6,
        "bottleProductId": "d341ce09-2469-4d59-85ab-ac01cf3fd548"
      },
      {
        "id": "huda-promo-2020-silver",
        "brand": "Huda",
        "insightsBrandLabel": "vn:huda",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:24:0C-1550-1590081225.jpg",
        "threshold": 0.85,
        "bottleProductId": "d0879449-2be8-49c7-9215-4f942e9bbc25"
      },
      {
        "id": "imperio-2021-yellow-br",
        "brand": "Imperio",
        "insightsBrandLabel": "br:imperio-2021-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3B:94-1767-1627222126.jpg",
        "threshold": 0.85,
        "bottleProductId": "caa891d2-385c-479c-8b75-fb203bca6ce3"
      },
      {
        "id": "indio-2018-black",
        "brand": "Indio",
        "insightsBrandLabel": "mx:indio-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:9B:E8-161-1565755347_low.jpg",
        "threshold": 0.5,
        "bottleProductId": "5f311f3e-ead9-4614-bcc6-b7a27f949c90"
      },
      {
        "id": "indio-2020-green",
        "brand": "Indio",
        "insightsBrandLabel": "mx:indio-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D3:F0-1750-1579237338.jpg",
        "threshold": 0.5,
        "bottleProductId": "5f311f3e-ead9-4614-bcc6-b7a27f949c90"
      },
      {
        "id": "itaipava-2021-red-br",
        "brand": "Itaipava",
        "insightsBrandLabel": "br:itaipava-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:35:E8-378-1626996346.jpg",
        "threshold": 0.3,
        "bottleProductId": "8d3512a2-73da-41da-9245-98f442fe2c7f"
      },
      {
        "id": "itaipava-premium-2021-red-br",
        "brand": "Itaipava Premium",
        "insightsBrandLabel": "br:itaipava-premium-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:43:48-324-1627173248.jpg",
        "threshold": 0.3,
        "bottleProductId": "f8f07698-889d-4121-af28-d93d7b4d85a7"
      },
      {
        "id": "jabali-2018-black",
        "brand": "Jabali",
        "insightsBrandLabel": "mx:jabali-2018-black-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": "0c1bebd1-e379-4a55-ab23-535eae7b68f8"
      },
      {
        "id": "jarritos-2018-silver",
        "brand": "Jarritos",
        "insightsBrandLabel": "mx:jarritos-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:AA:34-331-1565480085_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "bd63fadf-8e22-4f0b-96ff-cd95cba58739"
      },
      {
        "id": "kinik-2022-red-ch",
        "brand": "Kinik",
        "insightsBrandLabel": "ch:kinik-2022-red-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:52:34:74-299-1651318074.jpg",
        "threshold": 0.85,
        "bottleProductId": "92e5a79e-8c4b-4b36-8dee-ec1dcf3b6cc1"
      },
      {
        "id": "kinley-tonic-2022-silver",
        "brand": "Kinley Tonic",
        "insightsBrandLabel": "ch:kinley-tonic-2022-silver-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6D:08-73-1648283981.jpg",
        "threshold": 0.6,
        "bottleProductId": "5deac5b7-499f-41cd-be93-6ef4ae25a627"
      },
      {
        "id": "kronenbourg-1664-2020-white",
        "brand": "Kronenbourg-1664",
        "insightsBrandLabel": "vn:kronenbourg-1664-2020-white",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:2E:9C-217-1584547484.jpg",
        "threshold": 0.6,
        "bottleProductId": "4f956c00-ff12-464e-8a42-3b881ae320d0"
      },
      {
        "id": "ladron-de-manzanas-2018-black",
        "brand": "Ladron de Manzanas",
        "insightsBrandLabel": "mx:ladron-de-manzanas-2018-black-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": "bab7eced-540e-4219-a54a-c884177d66bf"
      },
      {
        "id": "lagunitas-2018-golden",
        "brand": "Lagunitas",
        "insightsBrandLabel": "mx:lagunitas-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:AD:6C-54-1565721663_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "e9b03096-6d40-418c-9cc8-d3710d792832"
      },
      {
        "id": "larue-2018-golden",
        "brand": "Larue",
        "insightsBrandLabel": "vn:larue",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:92:38-768-1565783698_low.jpg",
        "threshold": 0.7,
        "bottleProductId": "ea9fd5e3-5b82-438c-8bcf-6a810eb0ea04"
      },
      {
        "id": "larue-export-2018-golden",
        "brand": "Larue Export",
        "insightsBrandLabel": "vn:larue-export",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:93:30-101-1565621879_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "leffe-blonde-2018-golden",
        "brand": "Leffe Blonde",
        "insightsBrandLabel": "vn:leffe-blonde;at:leffe-blonde-2018-golden-at",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:94:88-307-1565701720_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "a097a3fe-3510-4baa-b93f-cdeb39f8ad02"
      },
      {
        "id": "leffe-brown-2018-black",
        "brand": "Leffe Brown",
        "insightsBrandLabel": "vn:leffe-brown;at:leffe-brown-2018-black-at",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:B9:08-264-1565526601_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "ad1fb579-dfba-48cf-8159-dcc19ce7afd5"
      },
      {
        "id": "leon-2018-red",
        "brand": "Leon",
        "insightsBrandLabel": "mx:leon-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D2:50-299-1565741721_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "dd6dab59-9003-4687-b3ee-471dc86e6499"
      },
      {
        "id": "lurisia-aperitif-2022-silver-it",
        "brand": "Lurisia aperitif",
        "insightsBrandLabel": "vn:lurisia-aperitivo-con-assenzio-it;it:lurisia-aperitivo-con-assenzio-it",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/34:86:5D:B5:4B:C0-1489-1657788382.jpg",
        "threshold": 0.85,
        "bottleProductId": "55cc7296-3fca-4c1f-a252-f3dad97b1b2e"
      },
      {
        "id": "lurisia-mixer-2022-black-it",
        "brand": "Lurisia Mixer",
        "insightsBrandLabel": "vn:lurisia-mixer-bitter-lemon-it;it:lurisia-mixer-bitter-lemon-it",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/34:86:5D:B5:4B:C0-1570-1657789292.jpg",
        "threshold": 0.85,
        "bottleProductId": "3d56c034-be0f-4ffd-83ad-5b327fa46d64"
      },
      {
        "id": "manzanita-sol-2018-silver",
        "brand": "Manzanita Sol",
        "insightsBrandLabel": "mx:manzanita-sol-2018-silver-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.7,
        "bottleProductId": "df035eaa-c1b0-4af5-8ec6-9779bfacb5ef"
      },
      {
        "id": "miller-high-life-2020-red",
        "brand": "Miller High Life",
        "insightsBrandLabel": "mx:miller-high-life-2020-red-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:61:6C-748-1591498440.jpg",
        "threshold": 0.85,
        "bottleProductId": "6eb3e2e1-8b84-4055-a20a-20da53b0eb61"
      },
      {
        "id": "minerva-2018-white",
        "brand": "Minerva",
        "insightsBrandLabel": "mx:minerva-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D2:50-203-1565478795_low.jpg",
        "threshold": 0.7,
        "bottleProductId": "13a56319-dadc-4467-a03d-29e9f252b89a"
      },
      {
        "id": "mini-coca-cola-2020-yellow",
        "brand": "Coca Cola",
        "insightsBrandLabel": "mx:coca-cola-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:57:20-3202-1601758879.jpg",
        "threshold": 0.85,
        "bottleProductId": "5814372d-001e-4ee2-a86d-e96e994f6746"
      },
      {
        "id": "minute-maid-2018-black",
        "brand": "Minute Maid",
        "insightsBrandLabel": "es:minute-maid-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "modelo-2021-gold-br",
        "brand": "Modelo",
        "insightsBrandLabel": "br:modelo-2021-gold-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:4E:A8-113-1627082056.jpg",
        "threshold": 0.8,
        "bottleProductId": "a4ea5252-a70f-4683-8965-cfc9909fb8cd"
      },
      {
        "id": "modelo-2021-orange-br",
        "brand": "Modelo",
        "insightsBrandLabel": "br:modelo-2021-gold-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:45:B4-382-1625443074.jpg",
        "threshold": 0.7,
        "bottleProductId": "a4ea5252-a70f-4683-8965-cfc9909fb8cd"
      },
      {
        "id": "modelo-2021-whitecover-br",
        "brand": "Model",
        "insightsBrandLabel": "br:modelo-2021-gold-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:51:6C-214-1625455360.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "modelo-gold-2018-golden",
        "brand": "Modelo Gold",
        "insightsBrandLabel": "us:modelo-gold-us;mx:modelo-gold-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-15-US-Training-set-v1-1/modelo-gold-2018-golden/1393482381.png",
        "threshold": 0.4,
        "bottleProductId": "09dc9a72-86f9-4fc4-bd87-a96851bd6ffa"
      },
      {
        "id": "modelo-gold-2018-golden-uncovered",
        "brand": "Modelo Gold",
        "insightsBrandLabel": "mx:modelo-gold-mx;us:modelo-gold-us",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.5,
        "bottleProductId": "09dc9a72-86f9-4fc4-bd87-a96851bd6ffa"
      },
      {
        "id": "modelo-negra-2018-black",
        "brand": "Modelo Negra",
        "insightsBrandLabel": "mx:modelo-negra-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:63:94-506-1565560937_low.jpg",
        "threshold": 0.5,
        "bottleProductId": "18c05ffd-d449-47be-8ce0-441cca0cda37"
      },
      {
        "id": "nestea-lemon-2018-black",
        "brand": "Nestea Lemon",
        "insightsBrandLabel": "es:nestea-lemon-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "nordic-mist-tonic-2019-orange",
        "brand": "Nordic Mist Tonic",
        "insightsBrandLabel": "es:nordic-mist-tonic-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "not-a-cap",
        "brand": "Not A Cap",
        "insightsBrandLabel": "vn:other;mx:other",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "not-a-cap-black",
        "brand": "Not A Cap",
        "insightsBrandLabel": "vn:other;mx:other",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/30:AE:A4:6A:8E:B4-103-1565874372.jpg",
        "threshold": 0.4,
        "bottleProductId": "8308f990-10d1-4ab9-b6a1-ef3b9510cd5b"
      },
      {
        "id": "not-a-cap-crashed",
        "brand": "Not A Cap",
        "insightsBrandLabel": "vn:other",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.5,
        "bottleProductId": "8308f990-10d1-4ab9-b6a1-ef3b9510cd5b"
      },
      {
        "id": "not-a-cap-white",
        "brand": "Not A Cap",
        "insightsBrandLabel": "vn:other;mx:other",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:80:B4-2100-1565975264.jpg",
        "threshold": 0.4,
        "bottleProductId": "8308f990-10d1-4ab9-b6a1-ef3b9510cd5b"
      },
      {
        "id": "number-1-2020-orange",
        "brand": "Number 1",
        "insightsBrandLabel": "vn:number-1-2020-orange",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:C4:98-1196-1592896439.jpg",
        "threshold": 0.85,
        "bottleProductId": "cb768956-0c91-4ec6-87e9-3080a96c98fb"
      },
      {
        "id": "original-2021-yellow-br",
        "brand": "Original",
        "insightsBrandLabel": "br:original-2021-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:45:44-98-1627227167.jpg",
        "threshold": 0.7,
        "bottleProductId": "7131034d-0c39-434a-9e53-036d3ee1cd75"
      },
      {
        "id": "other",
        "brand": "other",
        "insightsBrandLabel": "cn:other",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": "8308f990-10d1-4ab9-b6a1-ef3b9510cd5b"
      },
      {
        "id": "other-blurry",
        "brand": "Other Blurry",
        "insightsBrandLabel": "vn:other-blurry;mx:other;br:other;ch:other",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": "8308f990-10d1-4ab9-b6a1-ef3b9510cd5b"
      },
      {
        "id": "other-newbrand",
        "brand": "New Brand",
        "insightsBrandLabel": "vn:other;mx:other;br:other;ch:other",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": "8308f990-10d1-4ab9-b6a1-ef3b9510cd5b"
      },
      {
        "id": "pacifico-clara-2018-yellow",
        "brand": "Pacifico Clara",
        "insightsBrandLabel": "mx:pacifico-clara-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:62:5C-311-1565752165_low.jpg",
        "threshold": 0.3,
        "bottleProductId": "cfb04dd4-8fa4-4e27-9cd4-a8eaec1f2326"
      },
      {
        "id": "pacifico-clara-2018-yellow-underlined",
        "brand": "Pacifico Clara",
        "insightsBrandLabel": "us:pacifico-clara-usa",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-15-US-Training-set-v1-1/pacifico-clara-2018-yellow-underlined/CC_50_E3_83_6B_0C_1558991344_5cec51f0510d8.png",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "pacifico-clara-2020-golden",
        "brand": "Pacifico Clara",
        "insightsBrandLabel": "mx:pacifico-clara-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:DA:10-4916-1583101936.jpg",
        "threshold": 0.3,
        "bottleProductId": "cfb04dd4-8fa4-4e27-9cd4-a8eaec1f2326"
      },
      {
        "id": "pascual-boing-2018-multicolor",
        "brand": "Pascual Boing",
        "insightsBrandLabel": "mx:pascual-boing-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.4,
        "bottleProductId": "25ca8f2f-0d0a-4b2a-94bd-36254c03419a"
      },
      {
        "id": "pascual-boing-2018-red",
        "brand": "Pascual Boing",
        "insightsBrandLabel": "mx:pascual-boing-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:57:00-282-1565569269_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "pascual-boing-2018-yellow",
        "brand": "Pascual Boing",
        "insightsBrandLabel": "mx:pascual-boing-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:AC:7C-2838-1565664728_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "patagonia-2021-black-br",
        "brand": "Patagonia",
        "insightsBrandLabel": "br:patagonia-2021-black-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3C:20-36-1612124781.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "penafiel-2018-silver",
        "brand": "Penafiel",
        "insightsBrandLabel": "mx:penafiel-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:62:A8-849-1565744362_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "d8f2b226-63a2-41f7-a737-394068c64a75"
      },
      {
        "id": "penafiel-2019-blue",
        "brand": "Penafiel",
        "insightsBrandLabel": "mx:penafiel-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:58:9C-1885-1579219553.jpg",
        "threshold": 0.6,
        "bottleProductId": "d8f2b226-63a2-41f7-a737-394068c64a75"
      },
      {
        "id": "pepsi-2018-blue",
        "brand": "Pepsi",
        "insightsBrandLabel": "vn:pepsi",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AC:9B:68-1012-1565699695_low.jpg",
        "threshold": 0.7,
        "bottleProductId": "fd463b7e-8465-45f5-a6f2-e4547372ab15"
      },
      {
        "id": "pepsi-2022-blue-it",
        "brand": "Pepsi",
        "insightsBrandLabel": "vn:pepsi;it:pepsi",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/8C:4B:14:39:15:B4-1538-1657791743.jpg",
        "threshold": 0.85,
        "bottleProductId": "fd463b7e-8465-45f5-a6f2-e4547372ab15"
      },
      {
        "id": "pepsi-max-2022-black-it",
        "brand": "Pepsi Max",
        "insightsBrandLabel": "vn:pepsi-max-2022-black-it;it:pepsi-max-2022-black-it",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/34:86:5D:B5:4B:C0-1280-1657785566.jpg",
        "threshold": 0.85,
        "bottleProductId": "58f0d807-f701-478a-a488-8ebccb150956"
      },
      {
        "id": "petra-2021-red-br",
        "brand": "Petra",
        "insightsBrandLabel": "br:petra-2021-red-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:37:68-48-1627169327.jpg",
        "threshold": 0.5,
        "bottleProductId": "f3710388-d76c-4065-acf9-dba15442b594"
      },
      {
        "id": "pilsner-2018-red",
        "brand": "Pilsner",
        "insightsBrandLabel": "vn:pilsner-2018-red-vn",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:7C:58-164-1564486109.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "ramseier-2022-red-ch",
        "brand": "Ramseier",
        "insightsBrandLabel": "ch:ramseier-2022-red-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:56:D1:68-196-1650966671.jpg",
        "threshold": 0.85,
        "bottleProductId": "a52ce481-32b8-453a-bad6-efece95b7730"
      },
      {
        "id": "red-bull-bitter-lemon-2022-green-ch",
        "brand": "Red Bull Bitter Lemon",
        "insightsBrandLabel": "ch:red-bull-bitter-lemon-2022-green-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:53:6C:4C-483-1651076052.jpg",
        "threshold": 0.85,
        "bottleProductId": "ca185fc7-2e8a-4a89-98e2-ccec561505a9"
      },
      {
        "id": "red-bull-ginger-ale-2022-red-ch",
        "brand": "Red Bull Ginger Ale",
        "insightsBrandLabel": "ch:red-bull-ginger-ale-2022-red-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:53:6C:4C-496-1651247677.jpg",
        "threshold": 0.85,
        "bottleProductId": "b8e63a1e-c482-4bf0-9c6c-8f5d62d07daf"
      },
      {
        "id": "red-bull-tonic-2022-blue-ch",
        "brand": "Red Bull Tonic",
        "insightsBrandLabel": "ch:red-bull-tonic-2022-blue-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:53:6C:4C-543-1651266931.jpg",
        "threshold": 0.85,
        "bottleProductId": "f7ec4395-4334-4e5c-b4ac-161112d0839c"
      },
      {
        "id": "red-cola-2020-red",
        "brand": "Red Cola",
        "insightsBrandLabel": "mx:red-cola-2020-red-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D5:68-850-1583215153.jpg",
        "threshold": 0.4,
        "bottleProductId": "ec1f7c9e-3f08-4723-a8db-635012ef984b"
      },
      {
        "id": "redtext-2021-red-br",
        "brand": "New Brand",
        "insightsBrandLabel": "br:other",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:2D:D0-552-1628611058.jpg",
        "threshold": 0.85,
        "bottleProductId": "8308f990-10d1-4ab9-b6a1-ef3b9510cd5b"
      },
      {
        "id": "rivella-blau-2022-white-ch",
        "brand": "Rivella Blau",
        "insightsBrandLabel": "ch:rivella-blau-2022-white-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:56:D1:68-156-1650732573.jpg",
        "threshold": 0.85,
        "bottleProductId": "14ee6f73-eeb6-4489-9d36-959b4784600c"
      },
      {
        "id": "rivella-rot-2022-white-ch",
        "brand": "Rivella Rot",
        "insightsBrandLabel": "ch:rivella-rot-2022-white-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:56:D1:68-231-1651086867.jpg",
        "threshold": 0.85,
        "bottleProductId": "b752e309-0171-484f-aeec-a45ac9fbdbb3"
      },
      {
        "id": "royal-bliss-2018-multicolor",
        "brand": "Royal-Bliss",
        "insightsBrandLabel": "es:royal-bliss-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "sagota-lager-2019-blue",
        "brand": "Sogota Lager",
        "insightsBrandLabel": "vn:sagota-larger",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:C7:C4-2301-1584595323.jpg",
        "threshold": 0.85,
        "bottleProductId": "46705176-5036-4c2f-86bd-f09a1c0d9d40"
      },
      {
        "id": "sagota-pure-2019-silver",
        "brand": "Sagota Pure",
        "insightsBrandLabel": "vn:sagota-pure-2019-silver ",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:53:DC-5403-1584545684.jpg",
        "threshold": 0.3,
        "bottleProductId": "2c9db248-7079-4a11-bb9d-bca31453bd31"
      },
      {
        "id": "saigon-export-2018-red",
        "brand": "Saigon Export",
        "insightsBrandLabel": "vn:saigon-export",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:72:B8-881-1565706184_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "0b8472a8-904f-49c3-b933-5fa1c547fed0"
      },
      {
        "id": "saigon-export-2019-red",
        "brand": "Saigon Export",
        "insightsBrandLabel": "vn:saigon-export",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:91:64-659-1565717080_low.jpg",
        "threshold": 0.5,
        "bottleProductId": "0b8472a8-904f-49c3-b933-5fa1c547fed0"
      },
      {
        "id": "saigon-export-2020-red",
        "brand": "Saigon Export",
        "insightsBrandLabel": "vn:saigon-export",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:39:9C-2493-1589723077.jpg",
        "threshold": 0.85,
        "bottleProductId": "0b8472a8-904f-49c3-b933-5fa1c547fed0"
      },
      {
        "id": "saigon-lager-2018-green",
        "brand": "Saigon Lager",
        "insightsBrandLabel": "vn:saigon-lager",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:8D:B4-462-1564304254_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "saigon-lager-2019-white",
        "brand": "Saigon Lager",
        "insightsBrandLabel": "vn:saigon-lager",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:8D:50-1026-1565700874_low.jpg",
        "threshold": 0.5,
        "bottleProductId": "46705176-5036-4c2f-86bd-f09a1c0d9d40"
      },
      {
        "id": "saigon-special-2018-green",
        "brand": "Saigon Special",
        "insightsBrandLabel": "vn:saigon-special",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/30:AE:A4:74:72:B8-194-1565611231_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "saigon-special-2019-green",
        "brand": "Saigon Special",
        "insightsBrandLabel": "vn:saigon-special",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:93:30-144-1565748124_low.jpg",
        "threshold": 0.4,
        "bottleProductId": "490a6565-f69a-494a-8618-1f6911821b18"
      },
      {
        "id": "saigon-special-2019-green-promo",
        "brand": "Saigon Special",
        "insightsBrandLabel": "vn:saigon-special",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:81:F0-170-1565698241_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "samuel-adams-2018-white",
        "brand": "Samuel Adams",
        "insightsBrandLabel": "mx:samuel-adams-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:8C:A8-487-1565639763_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "4c55297f-2b47-4eb5-a80d-69ef0d5eafa0"
      },
      {
        "id": "san-miguel-2018-golden",
        "brand": "San Miguel",
        "insightsBrandLabel": "vn:san-miguel",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.6,
        "bottleProductId": "7931ec08-be67-403e-b7bc-271f91619d66"
      },
      {
        "id": "san-miguel-2020-golden-promo",
        "brand": "San Miguel",
        "insightsBrandLabel": "vn:san-miguel",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:44:8C-2009-1597751324.jpg",
        "threshold": 0.85,
        "bottleProductId": "7931ec08-be67-403e-b7bc-271f91619d66"
      },
      {
        "id": "san-miguel-light-2018-golden",
        "brand": "San Miguel Light",
        "insightsBrandLabel": "vn:san-miguel-light",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:9E:40-120-1565791879_low.jpg",
        "threshold": 0.5,
        "bottleProductId": "8e2ed3fa-190a-47be-8ebf-6362a6ea5edc"
      },
      {
        "id": "sangria-senorial-2018-purple",
        "brand": "Sangria Senorial",
        "insightsBrandLabel": "mx:sangria-senorial-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:98:64-457-1565724984_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "1db328e1-137b-42f4-95d5-5f8cebad67c4"
      },
      {
        "id": "sapporo-2018-black",
        "brand": "Sapporo",
        "insightsBrandLabel": "mx:sapporo-mx;vn:sapporo",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-ic-training/TrainingSets/2019-08-08-MX-Training-set-v1-2/sapporo-2018-black/80_7D_3A_FA_88_48_1541483198_5be12abea555e%20(1).png",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "sapporo-2018-yellow",
        "brand": "Sapporo",
        "insightsBrandLabel": "vn:sapporo",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:66:F8-160-1565704862_low.jpg",
        "threshold": 0.7,
        "bottleProductId": "3505daa8-2575-46bc-bc72-32eb41057901"
      },
      {
        "id": "schutzgarten-alkoholfrei-white-ch",
        "brand": "Schützgarten Alkoholfrei",
        "insightsBrandLabel": "ch:schutzgarten-alkoholfrei-white-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:56:D0:14-153-1651776361.jpg",
        "threshold": 0.85,
        "bottleProductId": "002b7b34-e86d-418a-841d-33177d5be1e5"
      },
      {
        "id": "schutzgarten-panache-2022-black-ch",
        "brand": "Schützgarten Panaché",
        "insightsBrandLabel": "ch:schutzgarten-panache-2022-black-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:52:34:74-470-1651777623.jpg",
        "threshold": 0.85,
        "bottleProductId": "18f7876e-508b-45b4-8bb1-4c9c0354937e"
      },
      {
        "id": "schutzgarten-weissbier-2022-blue-ch",
        "brand": "Schützgarten Weissbier",
        "insightsBrandLabel": "ch:schutzgarten-weissbier-2022-blue-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/40:F5:20:53:6C:4C-478-1651075397.jpg",
        "threshold": 0.85,
        "bottleProductId": "cf3a6c10-1ffa-419a-933b-04506aaf33e3"
      },
      {
        "id": "serra-malte-2021-gold-br",
        "brand": "Serra Malte",
        "insightsBrandLabel": "br:serra-malte-2021-gold-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:4F:FC-414-1627167572.jpg",
        "threshold": 0.5,
        "bottleProductId": "3f103b64-3f8d-447a-8cdf-60e578422424"
      },
      {
        "id": "shingha-2018-red",
        "brand": "Singha",
        "insightsBrandLabel": "vn:singha;th:singha-2018-red-th",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:5D:40-22-5887_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "74e623b4-0469-4f2f-993d-8d5048426445"
      },
      {
        "id": "sidral-aga-2020-red",
        "brand": "Sidral Aga",
        "insightsBrandLabel": "mx:sidral-aga-2020-red-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D5:68-319-1582775113.jpg",
        "threshold": 0.85,
        "bottleProductId": "10f2ea90-8113-4f3e-a6be-39103cd1e66b"
      },
      {
        "id": "sidral-mundet-2018-yellow",
        "brand": "Sidral Mundet",
        "insightsBrandLabel": "mx:sidral-mundet-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:8F:F0-155-1565734183_low.jpg",
        "threshold": 0.7,
        "bottleProductId": "f960f117-18fa-41a9-87d3-57b6ad780cc5"
      },
      {
        "id": "skarch-2020-blue",
        "brand": "Skarch",
        "insightsBrandLabel": "mx:skarch-2020-blue-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D5:68-87-1582147943.jpg",
        "threshold": 0.85,
        "bottleProductId": "7af38bfc-2141-472a-aa28-877108a63bad"
      },
      {
        "id": "skol-beat-2021-black-triangle-br",
        "brand": "Skol Beats",
        "insightsBrandLabel": "br:skol-beats-2021-gold-arrow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3C:3C-160-1628386571.jpg",
        "threshold": 0.85,
        "bottleProductId": "54d251f7-8a6a-4cf5-921b-6a71541e6051"
      },
      {
        "id": "skol-beat-2021-white-triangle-br",
        "brand": "Skol Beats",
        "insightsBrandLabel": "br:skol-beats-2021-gold-arrow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3C:D8-527-1628384365.jpg",
        "threshold": 0.85,
        "bottleProductId": "54d251f7-8a6a-4cf5-921b-6a71541e6051"
      },
      {
        "id": "skol-beats-2021-gold-arrow-br",
        "brand": "Skol Beats",
        "insightsBrandLabel": "br:skol-beats-2021-gold-arrow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:4E:64-2002-1628391537.jpg",
        "threshold": 0.85,
        "bottleProductId": "54d251f7-8a6a-4cf5-921b-6a71541e6051"
      },
      {
        "id": "skol-pilsen-2021-yellow-br",
        "brand": "Skol Pilsen",
        "insightsBrandLabel": "br:skol-pilsen-2021-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:37:30-127-1627179998.jpg",
        "threshold": 0.9,
        "bottleProductId": "00cd08a9-5b3a-4b1d-9a84-457ebb1dc31d"
      },
      {
        "id": "skol-pilsen-2021-yellowcover-br",
        "brand": "Skol Pilsen",
        "insightsBrandLabel": "br:skol-pilsen-2021-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:38:28-219-1615592787.jpg",
        "threshold": 0.6,
        "bottleProductId": "00cd08a9-5b3a-4b1d-9a84-457ebb1dc31d"
      },
      {
        "id": "skol-puro-malte-2021-yellow-br",
        "brand": "Skol Puro Malte",
        "insightsBrandLabel": "br:skol-puro-malte-2021-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3C:20-965-1612208483.jpg",
        "threshold": 0.8,
        "bottleProductId": null
      },
      {
        "id": "sol-2018-yellow",
        "brand": "Sol",
        "insightsBrandLabel": "co:sol-colombia;mx:sol-mx;vn:sol;br:sol-2018-yellow-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:62:A0-183-1565561064_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "c8bb295b-5714-4bf4-bb82-06a7a96d621b"
      },
      {
        "id": "solid-2020-black",
        "brand": "Craft Beer",
        "insightsBrandLabel": "vn:craft-beer",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:39:C0-91-1583851141.jpg",
        "threshold": 0.85,
        "bottleProductId": "6b24e2d0-2f0c-4ff7-b2d0-72915218b540"
      },
      {
        "id": "solid-2020-yellow",
        "brand": "Craft Beer",
        "insightsBrandLabel": "vn:craft-beer",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:C4:1C-263-1583764297.jpg",
        "threshold": 0.7,
        "bottleProductId": "6b24e2d0-2f0c-4ff7-b2d0-72915218b540"
      },
      {
        "id": "spaten-2021-gold-br",
        "brand": "Spaten",
        "insightsBrandLabel": "br:spaten-2021-gold-br",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:49:B4-1223-1627169722.jpg",
        "threshold": 0.7,
        "bottleProductId": "be8e18f7-b54e-491b-905c-1424dcfec009"
      },
      {
        "id": "sprite-2018-green",
        "brand": "Sprite",
        "insightsBrandLabel": "vn:sprite-2018-green",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:5A:A4-987-1565441451_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "8e19a6f4-9421-4e15-97f6-a719a114ae95"
      },
      {
        "id": "sprite-2018-yellow",
        "brand": "Sprite",
        "insightsBrandLabel": "mx:sprite-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:AC:7C-2837-1565664706_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "8e19a6f4-9421-4e15-97f6-a719a114ae95"
      },
      {
        "id": "sprite-2022-blue",
        "brand": "Sprite",
        "insightsBrandLabel": "ch:sprite-2022-blue-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6D:08-266-1648713450.jpg",
        "threshold": 0.6,
        "bottleProductId": "8e19a6f4-9421-4e15-97f6-a719a114ae95"
      },
      {
        "id": "sprite-2022-green-it",
        "brand": "Sprite",
        "insightsBrandLabel": "vn:sprite-2018-green;it:sprite-2018-green",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/34:86:5D:B5:4B:C0-1724-1657791774_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "8e19a6f4-9421-4e15-97f6-a719a114ae95"
      },
      {
        "id": "sprite-origin-2018-green",
        "brand": "Sprite Origin",
        "insightsBrandLabel": "es:sprite-origin-es",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "squirt-2018-yellow",
        "brand": "Squirt",
        "insightsBrandLabel": "mx:squirt-2018-yellow-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:58:70-8-1583263308.jpg",
        "threshold": 0.85,
        "bottleProductId": "00a074d9-51dc-4ada-89d4-9ebdf60b0d63"
      },
      {
        "id": "squirt-group-penafiel-2018-yellow",
        "brand": "Squirt Group Penafiel",
        "insightsBrandLabel": "mx:squirt-2018-yellow-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "staropramen-premium-2018-white",
        "brand": "Staropramen Premium",
        "insightsBrandLabel": "vn:staropramen-premium",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:92:4C-308-1565357512_low.jpg",
        "threshold": 0.7,
        "bottleProductId": "56369655-b374-4895-8d56-feea901b2bbc"
      },
      {
        "id": "stella-artois-2019-golden",
        "brand": "Stella Artois",
        "insightsBrandLabel": "vn:stella-artois;co:stella-artois-colombia;mx:stella-artois-mx;us:stella-artois-usa;at:stella-artois-2019-golden-at",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:91:B4-73-1565751724_low.jpg",
        "threshold": 0.7,
        "bottleProductId": "d19de92a-488d-4446-b99a-55491ddc0626"
      },
      {
        "id": "stella-artois-2019-white",
        "brand": "Stella Artois",
        "insightsBrandLabel": "vn:stella-artois;co:stella-artois-colombia;mx:stella-artois-mx;us:stella-artois-usa;br:stella-artois-2019-white-br;ch:stella-artois-2019-white-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3D:68-335-1627189250.jpg",
        "threshold": 0.4,
        "bottleProductId": "d19de92a-488d-4446-b99a-55491ddc0626"
      },
      {
        "id": "sting-2018-red",
        "brand": "Sting",
        "insightsBrandLabel": "vn:sting-red",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:91:8C-149-1565697825_low.jpg",
        "threshold": 0.6,
        "bottleProductId": "079662dc-0527-4b9e-b96f-36480bd0a2bf"
      },
      {
        "id": "strongbow-2018-multicolor",
        "brand": "Strongbow",
        "insightsBrandLabel": "mx:strongbow-2018-multicolor-mx;vn:strongbow-2018-multicolor",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.75,
        "bottleProductId": "017f08e1-d863-4805-82c2-77000d63c626"
      },
      {
        "id": "strongbow-darkfruit-2018-purple",
        "brand": "Strongbow Darkfruit",
        "insightsBrandLabel": "vn:strongbow-darkfruit",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:7F:B0-248-1565702084_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "strongbow-elderflower-2018-green",
        "brand": "Strongbow Elderflower",
        "insightsBrandLabel": "vn:strongbow-elderflower",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6E:7C-1770-1565453411_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "strongbow-goldapple-2018-golden",
        "brand": "Strongbow Goldapple",
        "insightsBrandLabel": "vn:strongbow-goldapple",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D9:60-2664-1565795860_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "strongbow-honey-2018-orange",
        "brand": "Strongbow Honey",
        "insightsBrandLabel": "vn:strongbow-honey",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:6E:7C-8-1565792737_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "strongbow-redberries-2018-red",
        "brand": "Strongbow Redberries",
        "insightsBrandLabel": "vn:strongbow-redberries",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D8:D4-3607-1565794591_low.jpg",
        "threshold": 0.6,
        "bottleProductId": null
      },
      {
        "id": "superior-2018-golden",
        "brand": "Superior",
        "insightsBrandLabel": "mx:superior-2018-golden-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": "d3120ebd-a74b-4d44-93e5-bdd4d7371c8e"
      },
      {
        "id": "tecate-2018-black",
        "brand": "Tecate",
        "insightsBrandLabel": "mx:tecate-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:97:48-208-1565755162_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "3424f0d1-5f96-48a2-b0a6-49a24f3faaf6"
      },
      {
        "id": "tempus-2018-black",
        "brand": "Tempus",
        "insightsBrandLabel": "mx:tempus-black-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:98:30-6-1565488517_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "tempus-2018-multicolor",
        "brand": "Tempus",
        "insightsBrandLabel": "mx:tempus-2018-multicolor-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": "ef12e4d4-8bfd-4339-999a-c5a0d171d88a"
      },
      {
        "id": "tempus-2018-red",
        "brand": "Tempus",
        "insightsBrandLabel": "mx:tempus-red-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:98:E8-154-1565659291_low.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "test-other",
        "brand": "test-other",
        "insightsBrandLabel": "test-other",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "test1",
        "brand": "test1",
        "insightsBrandLabel": "vn:test1",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "tete-2018-multicolor",
        "brand": "TeTe",
        "insightsBrandLabel": "vn:tete-2018-multicolor",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:C5:00-56-1583924534.jpg",
        "threshold": 0.85,
        "bottleProductId": "0d3e83a5-451c-4264-8ded-0c1ca7e7826d"
      },
      {
        "id": "thomas-henry-2020-multicolor",
        "brand": "Thomas Henry",
        "insightsBrandLabel": "vn:thomas-henry-2020-multicolor",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:C5:20-83-1592997550.jpg",
        "threshold": 0.85,
        "bottleProductId": "d2ad59dc-fc82-49fc-ad07-9d4dc45a5aaf"
      },
      {
        "id": "tiger-2018-orange",
        "brand": "Tiger",
        "insightsBrandLabel": "vn:tiger",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/30:AE:A4:6A:8A:F8-490-1565723353_low.jpg",
        "threshold": 0.5,
        "bottleProductId": "3f05c617-7e0d-49ad-91df-b89e4810372e"
      },
      {
        "id": "topo-chico-2020-yellow",
        "brand": "Topo Chico",
        "insightsBrandLabel": "mx:topo-chico-2020-yellow-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D7:38-500-1590447613.jpg",
        "threshold": 0.85,
        "bottleProductId": "359f9f5b-725e-46ad-8b98-696e1dcb9f1a"
      },
      {
        "id": "truc-bach-2018-green",
        "brand": "Truc Bach",
        "insightsBrandLabel": "vn:truc-bach-beer",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:68:10-98-1565621561_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "0c0f52d2-1b4c-4659-96d5-c29a77fe687c"
      },
      {
        "id": "tsingtao-2018-silver",
        "brand": "Tsingtao",
        "insightsBrandLabel": "vn:tsingtao-2018-silver",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:54:C0-899-1584279497.jpg",
        "threshold": 0.85,
        "bottleProductId": "e063351f-39de-4b60-9977-804e6c3b8cae"
      },
      {
        "id": "u-2018-black",
        "brand": "U",
        "insightsBrandLabel": "vn:u-beer;th:u-2018-black-th",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6A:F4-3588-1565697944_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "b5013ec5-9132-494b-9258-37a481871ec8"
      },
      {
        "id": "ultra-michelob-2018-white",
        "brand": "Ultra Michelob",
        "insightsBrandLabel": "mx:ultra-michelob-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/80:7D:3A:FA:9B:F0-144-1565739209_low.jpg",
        "threshold": 0.85,
        "bottleProductId": "fde686ad-7ab2-43bd-b7d7-39f1a4509a25"
      },
      {
        "id": "valle-frut-2018-black",
        "brand": "Valle Frut",
        "insightsBrandLabel": "mx:valle-frut-2018-black-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://www.ontariobeerkegs.com/v/vspfiles/photos/bottlecaps-2.jpg",
        "threshold": 0.85,
        "bottleProductId": "fc83973e-8a6e-4311-9a0d-cc0d58d2d435"
      },
      {
        "id": "valser-prickelnd-2022-green",
        "brand": "Valser Prickelnd",
        "insightsBrandLabel": "ch:valser-prickelnd-2022-green-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6D:08-312-1648713684.jpg",
        "threshold": 0.6,
        "bottleProductId": "589dafa4-1a8d-475b-8895-bf60affe4fc5"
      },
      {
        "id": "valser-still-2022-silver",
        "brand": "Valser Still",
        "insightsBrandLabel": "ch:valser-still-2022-silver-ch",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AD:6D:08-53-1648282569.jpg",
        "threshold": 0.6,
        "bottleProductId": "11c31f5a-6d95-43e7-9a4a-6ee49a11761d"
      },
      {
        "id": "victoria-2018-white",
        "brand": "Victoria",
        "insightsBrandLabel": "mx:victoria-mx;us:victoria-usa",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:5E:6C-77-1565755446_low.jpg",
        "threshold": 0.7,
        "bottleProductId": "32580e25-65b6-432f-b02c-8f1e12b07d82"
      },
      {
        "id": "victoria-chingones-2020-black",
        "brand": "Victoria Chingones",
        "insightsBrandLabel": "victoria-chingones-2020-black-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:83:62:8C-2320-1590537677.jpg",
        "threshold": 0.85,
        "bottleProductId": null
      },
      {
        "id": "vodka-cruiser-2020-golden",
        "brand": "Vodka Cruiser",
        "insightsBrandLabel": "vn:vodka-cruiser-2020-golden",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:9A:3A:84-439-1584548463.jpg",
        "threshold": 0.85,
        "bottleProductId": "05a9e4f7-7e89-494d-bc35-44c44ea3fbb9"
      },
      {
        "id": "wecheer-io",
        "brand": "wecheer-io",
        "insightsBrandLabel": "vn:wecheer-io",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/3C:71:BF:AC:9B:64-17-270_low.jpg",
        "threshold": 0.4,
        "bottleProductId": null
      },
      {
        "id": "zubba-2020-purple",
        "brand": "Zubba",
        "insightsBrandLabel": "mx:zubba-2020-purple-mx",
        "description": null,
        "manufacturer": null,
        "country": null,
        "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/prod-oe-opener-images/CC:50:E3:82:D5:68-749-1582778619.jpg",
        "threshold": 0.85,
        "bottleProductId": "4e68cc10-e0d3-4b6d-bb2a-15f6008108d2"
      }
    ]

    let input: any = [
      {
        "Bottle cap ID": "amstel-ultra-2018-white",
        "Bottle product": "Amstel Ultra"
      },
      {
        "Bottle cap ID": "bohemia-2018-golden",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "bohemia-2018-silver-uncovered",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "boscoli-2018-black",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "bud-light-2018-blue",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "budweiser-2018-red-bud",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "canada-dry-2018-blue",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "carta-blanca-2018-white",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "ciel-2018-blue",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "coca-cola-2018-red-us",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "coca-cola-2018-yellow",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "coca-cola-light-2018-yellow",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "coca-cola-zero-2018-black",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "colimita-2018-multicolor",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-ambar-2019-gold",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2018-black-18",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-ball",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-c",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-handshake",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-orange-footballer",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-white-a",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-white-ca",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-white-dt",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-white-leon",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-white-m",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-white-pachuca",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-white-queretaro",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-white-santos",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-black-white-smallball",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-red-18",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-red-yellow-18",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-white-18",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-extra-2020-yellow-18",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "corona-light-2018-yellow",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "cucapa-2018-red",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "dos-equis-2018-golden",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "erdinger-weibbrau-2018-golden",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "estrella-2020-white",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "fanta-2018-yellow",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "fresca-2018-yellow",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "heineken-0-2019-black",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "heineken-2018-white",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "heineken-2019-green",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "indio-2018-black",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "indio-2020-green",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "jabali-2018-black",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "jarritos-2018-silver",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "ladron-de-manzanas-2018-black",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "lagunitas-2018-golden",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "leon-2018-red",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "manzanita-sol-2018-silver",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "minerva-2018-white",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "modelo-gold-2018-golden",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "modelo-gold-2018-golden-uncovered",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "modelo-negra-2018-black",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "not-a-cap-black",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "not-a-cap-white",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "pacifico-clara-2018-yellow",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "pacifico-clara-2020-golden",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "pascual-boing-2018-multicolor",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "penafiel-2018-silver",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "penafiel-2019-blue",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "red-cola-2020-red",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "samuel-adams-2018-white",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "sangria-senorial-2018-purple",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "sidral-aga-2020-red",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "sidral-mundet-2018-yellow",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "skarch-2020-blue",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "sol-2018-yellow",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "sprite-2018-yellow",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "squirt-2018-yellow",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "stella-artois-2019-golden",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "strongbow-2018-multicolor",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "superior-2018-golden",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "tecate-2018-black",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "tempus-2018-multicolor",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "ultra-michelob-2018-white",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "valle-frut-2018-black",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "victoria-2018-white",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "wecheer-io",
        "Bottle product": ""
      },
      {
        "Bottle cap ID": "zubba-2020-purple",
        "Bottle product": ""
      }
    ]

    let dataSecond = [
      {
        "id": "4e91abcd-62c4-4d49-b190-f0af23cc5a06",
        "name": "Brahma",
        "imageUrl": "https://insights.wecheer.io/uploads/images/acac5ff7a34e14204175b94007e56b84.png",
        "description": null,
        "bottleCapIds": [
          "brahma-2021-red-br",
          "brahma-duplo-malte-2021-red-br",
          "brahma-duplo-malte-2021-redcover-br",
          "brahma-2021-redcover-br"
        ]
      },
      {
        "id": "05a9e4f7-7e89-494d-bc35-44c44ea3fbb9",
        "name": "Vodka Cruiser",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Vodka-Cruiser-Very-Blueberry-600x602.png",
        "description": null,
        "bottleCapIds": [
          "vodka-cruiser-2020-golden"
        ]
      },
      {
        "id": "3f103b64-3f8d-447a-8cdf-60e578422424",
        "name": "Serra Malte",
        "imageUrl": "https://insights.wecheer.io/uploads/images/18ccff2da6ca9387f6b66d5b07dac418.png",
        "description": null,
        "bottleCapIds": [
          "serra-malte-2021-gold-br"
        ]
      },
      {
        "id": "82ad083e-4c44-4ca2-b3b5-1ec3d2746c2d",
        "name": "Antarctica",
        "imageUrl": "https://insights.wecheer.io/uploads/images/67c4c9e9-b657-4d02-a4b8-29d1490d166d.jpg",
        "description": null,
        "bottleCapIds": [
          "antarctica-2021-blue",
          "antarctica-2021-bluecover-br"
        ]
      },
      {
        "id": "72422905-571d-4ae5-8552-2970cf4d877a",
        "name": "Fusetea Peach",
        "imageUrl": "https://insights.wecheer.io/uploads/images/877d8e81cdec197c7230534e96c12eb0.png",
        "description": null,
        "bottleCapIds": [
          "fusetea-peach-2022-orange"
        ]
      },
      {
        "id": "cb768956-0c91-4ec6-87e9-3080a96c98fb",
        "name": "Number 1",
        "imageUrl": "https://insights.wecheer.io/uploads/images/4d51abb4-52d7-417a-baca-f870f67e2f12.jpeg",
        "description": null,
        "bottleCapIds": [
          "number-1-2020-orange"
        ]
      },
      {
        "id": "e063351f-39de-4b60-9977-804e6c3b8cae",
        "name": "Tsingtao",
        "imageUrl": "https://insights.wecheer.io/uploads/images/f9e2675d-dff8-49d2-bf73-8ae2de154c77.jpg",
        "description": null,
        "bottleCapIds": [
          "tsingtao-2018-silver"
        ]
      },
      {
        "id": "4c55297f-2b47-4eb5-a80d-69ef0d5eafa0",
        "name": "Samuel Adams",
        "imageUrl": "https://insights.wecheer.io/uploads/images/samuel-adams.png",
        "description": null,
        "bottleCapIds": [
          "samuel-adams-2018-white"
        ]
      },
      {
        "id": "002b7b34-e86d-418a-841d-33177d5be1e5",
        "name": "Schützgarten Alkoholfrei",
        "imageUrl": "https://insights.wecheer.io/uploads/images/b96089da70f22da7f409a06bb5037240.PNG",
        "description": null,
        "bottleCapIds": [
          "schutzgarten-alkoholfrei-white-ch"
        ]
      },
      {
        "id": "dde484c8-d1de-4929-a0af-d3a19c1cd847",
        "name": "Coca Cola Zero",
        "imageUrl": "https://insights.wecheer.io/uploads/images/200e9fe95364c514969fc72a1321af34.png",
        "description": null,
        "bottleCapIds": [
          "coca-cola-zero-2021-black-br",
          "coca-cola-zero-2022-black-bottle-ch",
          "coca-cola-zero-2022-black-cross-ch",
          "coca-cola-zero-2022-red-cross-ch",
          "coca-cola-zero-2018-black",
          "coca-cola-zero-2022-black-it"
        ]
      },
      {
        "id": "fd463b7e-8465-45f5-a6f2-e4547372ab15",
        "name": "Pepsi",
        "imageUrl": "https://insights.wecheer.io/uploads/images/60330a61-b776-4b62-b994-a7aa81d9b3f0.jpeg",
        "description": null,
        "bottleCapIds": [
          "pepsi-2018-blue",
          "pepsi-2022-blue-it"
        ]
      },
      {
        "id": "140bb8c7-62ef-40ad-b931-919d56c8be44",
        "name": "Patagonia",
        "imageUrl": "https://insights.wecheer.io/uploads/images/61e8d48da05ddab488399c9bb1fb3920.png",
        "description": null,
        "bottleCapIds": [
          "patagonia-2021-black-br"
        ]
      },
      {
        "id": "10f2ea90-8113-4f3e-a6be-39103cd1e66b",
        "name": "Sidral Aga",
        "imageUrl": "https://insights.wecheer.io/uploads/images/I66gtX.jpg",
        "description": null,
        "bottleCapIds": [
          "sidral-aga-2020-red"
        ]
      },
      {
        "id": "25ca8f2f-0d0a-4b2a-94bd-36254c03419a",
        "name": "Pascual Boing",
        "imageUrl": "https://insights.wecheer.io/uploads/images/pascualboing.jpg",
        "description": null,
        "bottleCapIds": [
          "pascual-boing-2018-multicolor"
        ]
      },
      {
        "id": "18c05ffd-d449-47be-8ce0-441cca0cda37",
        "name": "Modelo Negra",
        "imageUrl": "https://insights.wecheer.io/uploads/images/ci-negra-modelo-5e9fde4dff726bf8.jpeg",
        "description": null,
        "bottleCapIds": [
          "modelo-negra-2018-black"
        ]
      },
      {
        "id": "cce6233d-64b1-4de8-8789-7fa98397109e",
        "name": "Fuze Pesca",
        "imageUrl": "https://insights.wecheer.io/uploads/images/fddbec0d3367101448848722e2a03d92.jpg",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "61f10265-fb67-4ed4-b9d7-9bd333090c41",
        "name": "Kinley Gamma",
        "imageUrl": "https://insights.wecheer.io/uploads/images/c51996d7c39772ba76c6b1aef490a7de.jpg",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "647aa3e1-3298-4dcb-9965-0483d1179f85",
        "name": "Estrella Galicia",
        "imageUrl": "https://insights.wecheer.io/uploads/images/af37d6969a9b25aa57b62e67f7b2555d.png",
        "description": null,
        "bottleCapIds": [
          "estrella-galicia-2021-black-br"
        ]
      },
      {
        "id": "c080f8ee-054a-4736-ad85-77ab625361cc",
        "name": "Chang",
        "imageUrl": "https://insights.wecheer.io/uploads/images/chang.png",
        "description": null,
        "bottleCapIds": [
          "chang-2018-green"
        ]
      },
      {
        "id": "375dd7e4-9078-4129-8185-2c14a8eb8813",
        "name": "Coca Cola Light",
        "imageUrl": "https://insights.wecheer.io/uploads/images/2adc0c4a6dcea54f5aaf862da38f153c.png",
        "description": null,
        "bottleCapIds": [
          "coca-cola-light-2021-yellow-br",
          "coca-cola-light-2021-yellow-br",
          "coca-cola-light-2018-yellow"
        ]
      },
      {
        "id": "1db328e1-137b-42f4-95d5-5f8cebad67c4",
        "name": "Sangria Senorial",
        "imageUrl": "https://insights.wecheer.io/uploads/images/sangria-senorial.jpg",
        "description": null,
        "bottleCapIds": [
          "sangria-senorial-2018-purple"
        ]
      },
      {
        "id": "f960f117-18fa-41a9-87d3-57b6ad780cc5",
        "name": "Sidral Mundet",
        "imageUrl": "https://insights.wecheer.io/uploads/images/sidral_mundet.jpg",
        "description": null,
        "bottleCapIds": [
          "sidral-mundet-2018-yellow"
        ]
      },
      {
        "id": "5adbf8b9-3c92-4ce5-83e7-172f3d4d7f6a",
        "name": "Erdinger Weißbräu",
        "imageUrl": "https://insights.wecheer.io/uploads/images/erdinger_weibbrau.png",
        "description": null,
        "bottleCapIds": [
          "erdinger-weibbrau-2018-golden"
        ]
      },
      {
        "id": "8a815ac8-56f2-4506-b794-c000c4c46fd8",
        "name": "Kinley Acqua Tonica",
        "imageUrl": "https://insights.wecheer.io/uploads/images/b52d5a1c09804f354c2281d7f38fded3.jpg",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "14ee6f73-eeb6-4489-9d36-959b4784600c",
        "name": "Rivella Blau",
        "imageUrl": "https://insights.wecheer.io/uploads/images/0d18598cd58975acbb3aa300f59dc1d4.PNG",
        "description": null,
        "bottleCapIds": [
          "rivella-blau-2022-white-ch"
        ]
      },
      {
        "id": "490a6565-f69a-494a-8618-1f6911821b18",
        "name": "Saigon Special",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Special.png",
        "description": null,
        "bottleCapIds": [
          "saigon-special-2019-green"
        ]
      },
      {
        "id": "e59c148e-4d1f-4670-996e-fed65fa44c86",
        "name": "Bud Light",
        "imageUrl": "https://insights.wecheer.io/uploads/images/c8e3d6f15942a857b156656c0077f48c.png",
        "description": null,
        "bottleCapIds": [
          "bud-light-2018-blue"
        ]
      },
      {
        "id": "17dd0e03-8887-46b1-b146-8843ffd15770",
        "name": "Fanta",
        "imageUrl": "https://insights.wecheer.io/uploads/images/86e6ecdcc3fd307e9853c6458efec468.png",
        "description": null,
        "bottleCapIds": [
          "fanta-2018-yellow"
        ]
      },
      {
        "id": "c5a6c16c-d25b-46e3-88d3-d43aeeca70ae",
        "name": "Dos Equis",
        "imageUrl": "https://insights.wecheer.io/uploads/images/283f4890d4418f25f15768e1f9093936.png",
        "description": null,
        "bottleCapIds": [
          "dos-equis-2018-golden"
        ]
      },
      {
        "id": "446fe364-f31f-4946-8665-4e8b82c6ee2f",
        "name": "Brahma Duplo Malte",
        "imageUrl": "https://insights.wecheer.io/uploads/images/dc817b9ab1e243ed250898f241204383.png",
        "description": null,
        "bottleCapIds": [
          "brahma-duplo-malte-2021-red-br",
          "brahma-duplo-malte-2021-redcover-br"
        ]
      },
      {
        "id": "2ea1f655-1903-4e5a-a5fe-dac47317b291",
        "name": "Kinley Bitter Lemon",
        "imageUrl": "https://insights.wecheer.io/uploads/images/5e8ae39a23f7898f28242f613f0e9802.jpg",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "2c9db248-7079-4a11-bb9d-bca31453bd31",
        "name": "Sagota Pure",
        "imageUrl": "https://insights.wecheer.io/uploads/images/93249861995e8c9b8814a144c893e7f2.jpg",
        "description": null,
        "bottleCapIds": [
          "sagota-pure-2019-silver"
        ]
      },
      {
        "id": "7131034d-0c39-434a-9e53-036d3ee1cd75",
        "name": "Original",
        "imageUrl": "https://insights.wecheer.io/uploads/images/3d658e90f2b701b48869072eae2f79e6.png",
        "description": null,
        "bottleCapIds": [
          "original-2021-yellow-br"
        ]
      },
      {
        "id": "13a56319-dadc-4467-a03d-29e9f252b89a",
        "name": "Minerva",
        "imageUrl": "https://insights.wecheer.io/uploads/images/minerva.png",
        "description": null,
        "bottleCapIds": [
          "minerva-2018-white"
        ]
      },
      {
        "id": "55cc7296-3fca-4c1f-a252-f3dad97b1b2e",
        "name": "Lurisia Aperitif",
        "imageUrl": "https://insights.wecheer.io/uploads/images/2b8f7712640fa6cfe55c85dd13453744.jpg",
        "description": null,
        "bottleCapIds": [
          "lurisia-aperitif-2022-silver-it"
        ]
      },
      {
        "id": "00a074d9-51dc-4ada-89d4-9ebdf60b0d63",
        "name": "Squirt",
        "imageUrl": "https://insights.wecheer.io/uploads/images/6451562f-af42-4b28-8a2b-48c39d5127fb.jpeg",
        "description": null,
        "bottleCapIds": [
          "squirt-2018-yellow"
        ]
      },
      {
        "id": "df035eaa-c1b0-4af5-8ec6-9779bfacb5ef",
        "name": "Manzanita Sol",
        "imageUrl": "https://insights.wecheer.io/uploads/images/0_BCdVcRj.JPG.750x750_q85ss0_progressive.jpg",
        "description": null,
        "bottleCapIds": [
          "manzanita-sol-2018-silver"
        ]
      },
      {
        "id": "3d56c034-be0f-4ffd-83ad-5b327fa46d64",
        "name": "Lurisia Mixer",
        "imageUrl": "https://insights.wecheer.io/uploads/images/631fcb57a534a8cf0e74ea49e2b5d47b.png",
        "description": null,
        "bottleCapIds": [
          "lurisia-mixer-2022-black-it"
        ]
      },
      {
        "id": "0f710bd8-ca2f-4b16-9d6d-f3a014c6c760",
        "name": "Lurisia Mixer Bitter Lemon",
        "imageUrl": "https://insights.wecheer.io/uploads/images/631fcb57a534a8cf0e74ea49e2b5d47b.png",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "7b8d3a0c-f9c8-4c06-b357-c5bf816a76cd",
        "name": "Lurisia Mixer Gazzosa Amara",
        "imageUrl": "https://insights.wecheer.io/uploads/images/546b440f6ef753bf786e914cb9599fcf.png",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "8d3512a2-73da-41da-9245-98f442fe2c7f",
        "name": "Itaipava",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Itaipava.png",
        "description": null,
        "bottleCapIds": [
          "itaipava-2021-red-br"
        ]
      },
      {
        "id": "19fa6574-da1f-4708-8a7f-373322b18dd5",
        "name": "Gau Den",
        "imageUrl": "https://insights.wecheer.io/uploads/images/gauden.jpg",
        "description": null,
        "bottleCapIds": [
          "gau-den-2018-black"
        ]
      },
      {
        "id": "359f9f5b-725e-46ad-8b98-696e1dcb9f1a",
        "name": "Topo Chico",
        "imageUrl": "https://insights.wecheer.io/uploads/images/e783a6f7-1f4c-485c-8b0e-0751fd86a86f.jpeg",
        "description": null,
        "bottleCapIds": [
          "topo-chico-2020-yellow"
        ]
      },
      {
        "id": "4f956c00-ff12-464e-8a42-3b881ae320d0",
        "name": "Kronenbourg-1664",
        "imageUrl": "https://insights.wecheer.io/uploads/images/f83159a290b4084bd7afbe58b1be0e9d.png",
        "description": null,
        "bottleCapIds": [
          "kronenbourg-1664-2020-white"
        ]
      },
      {
        "id": "3f05c617-7e0d-49ad-91df-b89e4810372e",
        "name": "Tiger",
        "imageUrl": "https://insights.wecheer.io/uploads/images/7f08e2badbd10414407f8432c28957a1.png",
        "description": null,
        "bottleCapIds": [
          "tiger-2018-orange"
        ]
      },
      {
        "id": "46705176-5036-4c2f-86bd-f09a1c0d9d40",
        "name": "Sogota Lager",
        "imageUrl": "https://insights.wecheer.io/uploads/images/e500d2f181a04d23c4dcb29eda5f0985.PNG",
        "description": null,
        "bottleCapIds": [
          "sagota-lager-2019-blue",
          "saigon-lager-2019-white"
        ]
      },
      {
        "id": "8e19a6f4-9421-4e15-97f6-a719a114ae95",
        "name": "Sprite",
        "imageUrl": "https://insights.wecheer.io/uploads/images/789948d4-3a60-4709-9823-b85aea207864.jpeg",
        "description": null,
        "bottleCapIds": [
          "sprite-2018-green",
          "sprite-2022-blue",
          "sprite-2018-yellow",
          "sprite-2022-green-it"
        ]
      },
      {
        "id": "56369655-b374-4895-8d56-feea901b2bbc",
        "name": "Staropramen Premium",
        "imageUrl": "https://insights.wecheer.io/uploads/images/9da30ef1b92947fac889eaad1c707f15.png",
        "description": null,
        "bottleCapIds": [
          "staropramen-premium-2018-white"
        ]
      },
      {
        "id": "f3710388-d76c-4065-acf9-dba15442b594",
        "name": "Petra",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Petra.png",
        "description": null,
        "bottleCapIds": [
          "petra-2021-red-br"
        ]
      },
      {
        "id": "5deac5b7-499f-41cd-be93-6ef4ae25a627",
        "name": "Kinley Tonic",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Kinley.png",
        "description": null,
        "bottleCapIds": [
          "kinley-tonic-2022-silver"
        ]
      },
      {
        "id": "f7defcbe-e651-4043-b664-9f2c764d3df0",
        "name": "Fresca",
        "imageUrl": "https://insights.wecheer.io/uploads/images/ebfaa35238b15f2f3f5a148dba834142.jpg",
        "description": null,
        "bottleCapIds": [
          "fresca-2018-yellow"
        ]
      },
      {
        "id": "a4ea5252-a70f-4683-8965-cfc9909fb8cd",
        "name": "Modelo",
        "imageUrl": "https://insights.wecheer.io/uploads/images/f47d267d-0c5d-4dd8-8506-8973ecd0192a.jpg",
        "description": null,
        "bottleCapIds": [
          "modelo-2021-gold-br",
          "modelo-2021-orange-br"
        ]
      },
      {
        "id": "54d251f7-8a6a-4cf5-921b-6a71541e6051",
        "name": "Skol Beats",
        "imageUrl": "https://insights.wecheer.io/uploads/images/2483b48a336de9e5f01c0492b8b5236c.jpg",
        "description": null,
        "bottleCapIds": [
          "skol-beat-2021-black-triangle-br",
          "skol-beat-2021-white-triangle-br",
          "skol-beats-2021-gold-arrow-br"
        ]
      },
      {
        "id": "b972827f-8881-4b2e-9f4e-620e93b72e5a",
        "name": "Becks",
        "imageUrl": "https://insights.wecheer.io/uploads/images/943c37d527345e030ef9c5fe0e87d712.png",
        "description": null,
        "bottleCapIds": [
          "becks-2021-black-br"
        ]
      },
      {
        "id": "be8e18f7-b54e-491b-905c-1424dcfec009",
        "name": "Spaten",
        "imageUrl": "https://insights.wecheer.io/uploads/images/bf30fa00a8cf3b550747406a98baef8f.png",
        "description": null,
        "bottleCapIds": [
          "spaten-2021-gold-br"
        ]
      },
      {
        "id": "a16de2db-fab9-4397-be4c-21e9c1e86d89",
        "name": "Cucapa",
        "imageUrl": "https://insights.wecheer.io/uploads/images/cucapa.jpg",
        "description": null,
        "bottleCapIds": [
          "cucapa-2018-red"
        ]
      },
      {
        "id": "3be93aa0-189b-44c1-8374-72cf64ba9186",
        "name": "Amstel",
        "imageUrl": "https://insights.wecheer.io/uploads/images/AMSTEL.png",
        "description": null,
        "bottleCapIds": [
          "amstel-2021-red-br"
        ]
      },
      {
        "id": "017f08e1-d863-4805-82c2-77000d63c626",
        "name": "Strongbow",
        "imageUrl": "https://insights.wecheer.io/uploads/images/c0dc0f943861d51a2c0fdb43e86f1b67.png",
        "description": null,
        "bottleCapIds": [
          "strongbow-2018-multicolor"
        ]
      },
      {
        "id": "ee20f017-17c0-4fa0-beba-db05728e40b4",
        "name": "Lurisia Aperitivo Con Assenzio",
        "imageUrl": "https://insights.wecheer.io/uploads/images/2b8f7712640fa6cfe55c85dd13453744.jpg",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "7bb85b61-cd26-4f1c-bedc-8f9713af2cb6",
        "name": "Heineken Silver",
        "imageUrl": "https://insights.wecheer.io/uploads/images/3cb2854f2e504fb5a0775140da727d0a.png",
        "description": null,
        "bottleCapIds": [
          "heineken-silver-2019-white"
        ]
      },
      {
        "id": "5814372d-001e-4ee2-a86d-e96e994f6746",
        "name": "Coca Cola",
        "imageUrl": "https://insights.wecheer.io/uploads/images/8b5f7578ad97a23b874aa12d01122bac.jpg",
        "description": null,
        "bottleCapIds": [
          "coca-cola-2018-red",
          "coca-cola-2021-red-br",
          "coca-cola-2021-red-ch",
          "coca-cola-2022-red-cross-ch",
          "coca-cola-2022-silver-ch",
          "coca-cola-2018-red-us",
          "coca-cola-2018-yellow",
          "mini-coca-cola-2020-yellow",
          "coca-cola-2022-red-it",
          "coca-cola-2022-red-it"
        ]
      },
      {
        "id": "799d03be-6c91-41f4-9c6a-aa786711687b",
        "name": "Fusetea Lemon",
        "imageUrl": "https://insights.wecheer.io/uploads/images/9fe81f628c78a29685afacd19c75e8a4.png",
        "description": null,
        "bottleCapIds": [
          "fusetea-lemon-2022-yellow-ch"
        ]
      },
      {
        "id": "07244a45-d1ce-4bf5-a2f7-931b4cde43cb",
        "name": "Corona Extra",
        "imageUrl": "https://insights.wecheer.io/uploads/images/2041e629a9b7bf21efa617bff4f7ddff.png",
        "description": null,
        "bottleCapIds": [
          "corona-extra-2018-black",
          "corona-extra-2018-black-18",
          "corona-extra-2020-black-ball",
          "corona-extra-2020-black-c",
          "corona-extra-2020-black-handshake",
          "corona-extra-2020-black-orange-footballer",
          "corona-extra-2020-black-white-a",
          "corona-extra-2020-black-white-ca",
          "corona-extra-2020-black-white-dt",
          "corona-extra-2020-black-white-leon",
          "corona-extra-2020-black-white-m",
          "corona-extra-2020-black-white-pachuca",
          "corona-extra-2020-black-white-queretaro",
          "corona-extra-2020-black-white-santos",
          "corona-extra-2020-black-white-smallball",
          "corona-extra-2020-red-18",
          "corona-extra-2020-red-yellow-18",
          "corona-extra-2020-white-18",
          "corona-extra-2020-yellow-18"
        ]
      },
      {
        "id": "cf3a6c10-1ffa-419a-933b-04506aaf33e3",
        "name": "Schützgarten Weissbier",
        "imageUrl": "https://insights.wecheer.io/uploads/images/2afb3669e45a064b0bb90105867dc41a.PNG",
        "description": null,
        "bottleCapIds": [
          "schutzgarten-weissbier-2022-blue-ch"
        ]
      },
      {
        "id": "d341ce09-2469-4d59-85ab-ac01cf3fd548",
        "name": "Huda Ice",
        "imageUrl": "https://insights.wecheer.io/uploads/images/hudice_bottle.png",
        "description": null,
        "bottleCapIds": [
          "huda-ice-2018-silver"
        ]
      },
      {
        "id": "d8d5fa7e-ffce-4e02-90cf-5b4a0def6140",
        "name": "Boscoli",
        "imageUrl": "https://insights.wecheer.io/uploads/images/66db21c1a1c71b89b208a57c4456b9df.jpg",
        "description": null,
        "bottleCapIds": [
          "boscoli-2018-black"
        ]
      },
      {
        "id": "4b07bf4b-4c49-4f39-923e-ef0d40cb1a5e",
        "name": "Saigon Lager",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Lager.png",
        "description": null,
        "bottleCapIds": [
          "saigon-lager-2019-white"
        ]
      },
      {
        "id": "a097a3fe-3510-4baa-b93f-cdeb39f8ad02",
        "name": "Leffe Blonde",
        "imageUrl": "https://insights.wecheer.io/uploads/images/b50a4a5c2371f9fe8dc3ece55e8a0952.png",
        "description": null,
        "bottleCapIds": [
          "leffe-blonde-2018-golden"
        ]
      },
      {
        "id": "ea152217-ab23-4b7f-b070-bbd186d985e8",
        "name": "Carlsberg Smooth Draught",
        "imageUrl": "https://insights.wecheer.io/uploads/images/1320c7b890bfe438589ebca35c963efa.jpeg",
        "description": null,
        "bottleCapIds": [
          "carlsberg-smooth-draught-2019-white"
        ]
      },
      {
        "id": "ab5e4472-1988-430b-9873-8ff3f2e9fa30",
        "name": "Lurisia Mixer Con Ireos",
        "imageUrl": "https://insights.wecheer.io/uploads/images/79f067450389f216b4489d4f55f05a55.png",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "73990d1f-e2cd-4b9b-9035-bd4b6910ff5f",
        "name": "Carta Blanca",
        "imageUrl": "https://insights.wecheer.io/uploads/images/2b0a3267e5e97ad5b57e5789c393e106.png",
        "description": null,
        "bottleCapIds": [
          "carta-blanca-2018-white"
        ]
      },
      {
        "id": "a54ddc1a-be57-4c65-9dab-5478804dd648",
        "name": "Barrilito",
        "imageUrl": "https://insights.wecheer.io/uploads/images/a7946cbd-664b-4622-8684-e4c932cffe93.jpeg",
        "description": null,
        "bottleCapIds": [
          "barrilito-2020-black"
        ]
      },
      {
        "id": "4f96e600-8428-47dc-b01b-17a9f2215a75",
        "name": "Lurisia Mixer Ginger Beer",
        "imageUrl": "https://insights.wecheer.io/uploads/images/da28a30bf835d01284b3e9e47ae2fad6.png",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "0b8472a8-904f-49c3-b933-5fa1c547fed0",
        "name": "Saigon Export",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Export.png",
        "description": null,
        "bottleCapIds": [
          "saigon-export-2019-red",
          "saigon-export-2020-red",
          "saigon-export-2018-red"
        ]
      },
      {
        "id": "87df84f7-8c81-4700-bee0-a30c9563dac9",
        "name": "Black Princess",
        "imageUrl": "https://insights.wecheer.io/uploads/images/1fe9cce7d9914b94d83d10929e7384f4.png",
        "description": null,
        "bottleCapIds": [
          "black-princess-2021-black-br"
        ]
      },
      {
        "id": "3424f0d1-5f96-48a2-b0a6-49a24f3faaf6",
        "name": "Tecate",
        "imageUrl": "https://insights.wecheer.io/uploads/images/0b4ec8627c7b39f18df8be2d200170c6.png",
        "description": null,
        "bottleCapIds": [
          "tecate-2018-black"
        ]
      },
      {
        "id": "d15a4315-6c40-4002-acda-1e90eb580b1e",
        "name": "Beck's Ice",
        "imageUrl": "https://insights.wecheer.io/uploads/images/582a5016b44aee0748fe40b40a77abef.png",
        "description": null,
        "bottleCapIds": [
          "beck's-ice-2018-silver",
          "beck's-ice-2019-silver"
        ]
      },
      {
        "id": "002f95dc-290b-4e49-beed-6ad60dc4d3aa",
        "name": "BADEN BADEN",
        "imageUrl": "https://insights.wecheer.io/uploads/images/c8d092cb8aa4f1dc14fc21917ce625d4.png",
        "description": null,
        "bottleCapIds": [
          "baden-baden-2021-black-br"
        ]
      },
      {
        "id": "c8bb295b-5714-4bf4-bb82-06a7a96d621b",
        "name": "Sol",
        "imageUrl": "https://insights.wecheer.io/uploads/images/c1256871356e1cf05fd00125b6cf1ddd.png",
        "description": null,
        "bottleCapIds": [
          "sol-2018-yellow"
        ]
      },
      {
        "id": "cfb04dd4-8fa4-4e27-9cd4-a8eaec1f2326",
        "name": "Pacifico Clara",
        "imageUrl": "https://insights.wecheer.io/uploads/images/pacifico-clara.png",
        "description": null,
        "bottleCapIds": [
          "pacifico-clara-2018-yellow",
          "pacifico-clara-2020-golden"
        ]
      },
      {
        "id": "00cd08a9-5b3a-4b1d-9a84-457ebb1dc31d",
        "name": "Skol Pilsen",
        "imageUrl": "https://insights.wecheer.io/uploads/images/cae5fb4274e7719c8329f27aa16dc816.png",
        "description": null,
        "bottleCapIds": [
          "skol-pilsen-2021-yellow-br",
          "skol-pilsen-2021-yellowcover-br"
        ]
      },
      {
        "id": "f50d5fab-140f-4c72-90d8-46f4323386fd",
        "name": "Bira 91",
        "imageUrl": "https://insights.wecheer.io/uploads/images/bira91.jpeg",
        "description": null,
        "bottleCapIds": [
          "bira91-2018-multicolor"
        ]
      },
      {
        "id": "1a0fc850-4f33-41d5-8d96-b7d9840fe30f",
        "name": "Corona Ambar",
        "imageUrl": "https://insights.wecheer.io/uploads/images/b9a76b080db095ed129a67b3c03caa4a.jpg",
        "description": null,
        "bottleCapIds": [
          "corona-ambar-2019-gold"
        ]
      },
      {
        "id": "caa891d2-385c-479c-8b75-fb203bca6ce3",
        "name": "Imperio",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Imperio.png",
        "description": null,
        "bottleCapIds": [
          "imperio-2021-yellow-br"
        ]
      },
      {
        "id": "111ccaf7-455e-4c83-9b2e-bd06d5b6f44e",
        "name": "BRAHMA EXTRA",
        "imageUrl": "https://insights.wecheer.io/uploads/images/32572c6ad2e66da9cc9ab5ec21f20305.png",
        "description": null,
        "bottleCapIds": [
          "brahma-extra-2021-orange-br"
        ]
      },
      {
        "id": "7522f000-2a88-417a-a7d0-2300f3f09338",
        "name": "Hoegaarden Simple",
        "imageUrl": "https://insights.wecheer.io/uploads/images/7c5e576bb239e70dd7f2203161959af6.png",
        "description": null,
        "bottleCapIds": [
          "hoegaarden-simple-2018-white"
        ]
      },
      {
        "id": "8e2ed3fa-190a-47be-8ebf-6362a6ea5edc",
        "name": "San Miguel Light",
        "imageUrl": "https://insights.wecheer.io/uploads/images/e584190afcc96679de01e26f8ee45f4c.png",
        "description": null,
        "bottleCapIds": [
          "san-miguel-light-2018-golden"
        ]
      },
      {
        "id": "589dafa4-1a8d-475b-8895-bf60affe4fc5",
        "name": "Valser Prickelnd",
        "imageUrl": "https://insights.wecheer.io/uploads/images/53d59c30d85e97191217687b07e93e67.png",
        "description": null,
        "bottleCapIds": [
          "valser-prickelnd-2022-green"
        ]
      },
      {
        "id": "7931ec08-be67-403e-b7bc-271f91619d66",
        "name": "San Miguel",
        "imageUrl": "https://insights.wecheer.io/uploads/images/ece7c88b-ab35-4ff0-b21c-38a35a27b1ea.jpeg",
        "description": null,
        "bottleCapIds": [
          "san-miguel-2020-golden-promo",
          "san-miguel-2018-golden"
        ]
      },
      {
        "id": "d19de92a-488d-4446-b99a-55491ddc0626",
        "name": "Stella Artois",
        "imageUrl": "https://insights.wecheer.io/uploads/images/dc51e93cba32aac3fd0cd523e03c01b6.png",
        "description": null,
        "bottleCapIds": [
          "stella-artois-2019-golden",
          "stella-artois-2019-white"
        ]
      },
      {
        "id": "ca185fc7-2e8a-4a89-98e2-ccec561505a9",
        "name": "Red Bull Bitter Lemon",
        "imageUrl": "https://insights.wecheer.io/uploads/images/5372f45d0f83d1a533cb276447c9be99.PNG",
        "description": null,
        "bottleCapIds": [
          "red-bull-bitter-lemon-2022-green-ch"
        ]
      },
      {
        "id": "74e623b4-0469-4f2f-993d-8d5048426445",
        "name": "Singha",
        "imageUrl": "https://insights.wecheer.io/uploads/images/shingha.jpg",
        "description": null,
        "bottleCapIds": [
          "shingha-2018-red"
        ]
      },
      {
        "id": "57dd1c30-1788-4863-aaff-c59688a0564e",
        "name": "Budweiser Budvar",
        "imageUrl": "https://insights.wecheer.io/uploads/images/12aed005971876ae8c8ee9584bc11318.jpg",
        "description": null,
        "bottleCapIds": [
          "budweiser-budvar-2018-golden",
          "budweiser-2018-red-crown"
        ]
      },
      {
        "id": "ea9fd5e3-5b82-438c-8bcf-6a810eb0ea04",
        "name": "Larue",
        "imageUrl": "https://insights.wecheer.io/uploads/images/0f10cb5734a7e500b424f657542d16f5.jpg",
        "description": null,
        "bottleCapIds": [
          "larue-2018-golden"
        ]
      },
      {
        "id": "0d3e83a5-451c-4264-8ded-0c1ca7e7826d",
        "name": "TeTe",
        "imageUrl": "https://insights.wecheer.io/uploads/images/15632e6f832502dfb8ac0c78658caadb.jpg",
        "description": null,
        "bottleCapIds": [
          "tete-2018-multicolor"
        ]
      },
      {
        "id": "6eb3e2e1-8b84-4055-a20a-20da53b0eb61",
        "name": "Miller High Life",
        "imageUrl": "https://insights.wecheer.io/uploads/images/aa9102f4-51ca-47a7-be2d-410c3a4c6fff.jpeg",
        "description": null,
        "bottleCapIds": [
          "miller-high-life-2020-red"
        ]
      },
      {
        "id": "f8f07698-889d-4121-af28-d93d7b4d85a7",
        "name": "Itaipava Premium",
        "imageUrl": "https://insights.wecheer.io/uploads/images/97cccb2ebe4376d272a1aa246dff04d4.png",
        "description": null,
        "bottleCapIds": [
          "itaipava-premium-2021-red-br"
        ]
      },
      {
        "id": "363ba348-3186-4e74-b12a-d5b01b862019",
        "name": "Kinley Ginger Ale",
        "imageUrl": "https://insights.wecheer.io/uploads/images/2a5f0fbde8c6a1fe873c64b9921941f4.jpg",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "fde686ad-7ab2-43bd-b7d7-39f1a4509a25",
        "name": "Ultra Michelob",
        "imageUrl": "https://insights.wecheer.io/uploads/images/59888c362ca274eae1a7b577619ae671.png",
        "description": null,
        "bottleCapIds": [
          "ultra-michelob-2018-white"
        ]
      },
      {
        "id": "b8e63a1e-c482-4bf0-9c6c-8f5d62d07daf",
        "name": "Red Bull Ginger Ale",
        "imageUrl": "https://insights.wecheer.io/uploads/images/d019f1bea8d958d1371e6f588fe35ed3.PNG",
        "description": null,
        "bottleCapIds": [
          "red-bull-ginger-ale-2022-red-ch"
        ]
      },
      {
        "id": "c9f8c76a-88a1-4c1c-8041-b496e7049b7c",
        "name": "Fanta Orange",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Fanta.png",
        "description": null,
        "bottleCapIds": [
          "fanta-orange-2022-orange",
          "fanta-orange-2022-orange-it"
        ]
      },
      {
        "id": "7af38bfc-2141-472a-aa28-877108a63bad",
        "name": "Skarch",
        "imageUrl": "https://insights.wecheer.io/uploads/images/1lbEER.jpg",
        "description": null,
        "bottleCapIds": [
          "skarch-2020-blue"
        ]
      },
      {
        "id": "11c31f5a-6d95-43e7-9a4a-6ee49a11761d",
        "name": "Valser Still",
        "imageUrl": "https://insights.wecheer.io/uploads/images/519965e076faae917540d6a9f4934062.png",
        "description": null,
        "bottleCapIds": [
          "valser-still-2022-silver"
        ]
      },
      {
        "id": "d3120ebd-a74b-4d44-93e5-bdd4d7371c8e",
        "name": "Superior",
        "imageUrl": "https://insights.wecheer.io/uploads/images/771cc963941d0837b306cecc759ced22.png",
        "description": null,
        "bottleCapIds": [
          "superior-2018-golden"
        ]
      },
      {
        "id": "a1071e45-bec9-42f5-a7e4-63e98fca1fe5",
        "name": "Estrella",
        "imageUrl": "https://insights.wecheer.io/uploads/images/9c9b8cad551c09503f4a2d8b678acad5.png",
        "description": null,
        "bottleCapIds": [
          "estrella-2020-white"
        ]
      },
      {
        "id": "2de504f3-97ed-49d0-b334-5b2e0698ca21",
        "name": "7up",
        "imageUrl": "https://insights.wecheer.io/uploads/images/31U1310ddPL.jpg",
        "description": null,
        "bottleCapIds": [
          "7up-2018-green"
        ]
      },
      {
        "id": "4d5c54c9-6780-4d91-a4f2-fdba87eac8e9",
        "name": "Heineken 0.0",
        "imageUrl": "https://insights.wecheer.io/uploads/images/10f7c568a8c49e3c93e549e2f4b14d4d.jpeg",
        "description": null,
        "bottleCapIds": [
          "heineken-0-2019-black"
        ]
      },
      {
        "id": "a0cf458f-39a1-4480-ba7c-c00eb64acf05",
        "name": "Heart of Darkness",
        "imageUrl": "https://insights.wecheer.io/uploads/images/heart_of_darkness.png",
        "description": null,
        "bottleCapIds": [
          "heart-of-darkness-2018-black"
        ]
      },
      {
        "id": "ef12e4d4-8bfd-4339-999a-c5a0d171d88a",
        "name": "Tempus",
        "imageUrl": "https://insights.wecheer.io/uploads/images/9413eea6fdd66ebfcb22fb82cf20f7b9.jpg",
        "description": null,
        "bottleCapIds": [
          "tempus-2018-multicolor"
        ]
      },
      {
        "id": "a52ce481-32b8-453a-bad6-efece95b7730",
        "name": "Ramseier",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Ramseier.PNG",
        "description": null,
        "bottleCapIds": [
          "ramseier-2022-red-ch"
        ]
      },
      {
        "id": "5f311f3e-ead9-4614-bcc6-b7a27f949c90",
        "name": "Indio",
        "imageUrl": "https://insights.wecheer.io/uploads/images/d6147332ab9b8f615a9c3109463fa952.png",
        "description": null,
        "bottleCapIds": [
          "indio-2018-black",
          "indio-2020-green"
        ]
      },
      {
        "id": "6b24e2d0-2f0c-4ff7-b2d0-72915218b540",
        "name": "Craft Beer",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Bia-thu-cong.png",
        "description": null,
        "bottleCapIds": [
          "solid-2020-black",
          "solid-2020-yellow"
        ]
      },
      {
        "id": "c1b401e3-7d39-4354-aee8-3f515261ec4b",
        "name": "Amstel Bier",
        "imageUrl": "https://insights.wecheer.io/uploads/images/amstel.jpeg",
        "description": null,
        "bottleCapIds": [
          "amstel-bier-2018-white"
        ]
      },
      {
        "id": "fc83973e-8a6e-4311-9a0d-cc0d58d2d435",
        "name": "Valle Frut",
        "imageUrl": "https://insights.wecheer.io/uploads/images/5f5d608003886c5454dd1e2304ffddd8.png",
        "description": null,
        "bottleCapIds": [
          "valle-frut-2018-black"
        ]
      },
      {
        "id": "dd6dab59-9003-4687-b3ee-471dc86e6499",
        "name": "Leon",
        "imageUrl": "https://insights.wecheer.io/uploads/images/leon.jpg",
        "description": null,
        "bottleCapIds": [
          "leon-2018-red"
        ]
      },
      {
        "id": "0c1bebd1-e379-4a55-ab23-535eae7b68f8",
        "name": "Jabali",
        "imageUrl": "https://insights.wecheer.io/uploads/images/357e6673eae8be1bfba2d76fc2ca1892.jpeg",
        "description": null,
        "bottleCapIds": [
          "jabali-2018-black"
        ]
      },
      {
        "id": "08e831d8-0726-4c33-8b17-445f4e51ef87",
        "name": "Chimay",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Chimay_Red.jpg",
        "description": null,
        "bottleCapIds": [
          "chimay-2018-multicolor"
        ]
      },
      {
        "id": "bab7eced-540e-4219-a54a-c884177d66bf",
        "name": "Ladron de Manzanas",
        "imageUrl": "https://insights.wecheer.io/uploads/images/5aa0c2babeaf0b5aec75c18db4771c25.png",
        "description": null,
        "bottleCapIds": [
          "ladron-de-manzanas-2018-black"
        ]
      },
      {
        "id": "a1324162-639c-4f82-ba42-635a9c6be1a7",
        "name": "Lurisia Aperitivo Con Genziana",
        "imageUrl": "https://insights.wecheer.io/uploads/images/863434f5cb4b4ad07dcd6a8e7a681e1b.jpg",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "8de45037-b7c3-43d3-8b59-8e443c48d190",
        "name": "Ciel",
        "imageUrl": "https://insights.wecheer.io/uploads/images/image.png",
        "description": null,
        "bottleCapIds": [
          "ciel-2018-blue"
        ]
      },
      {
        "id": "9f143cb5-126a-4444-9833-99ae18cae496",
        "name": "Fuze Limone",
        "imageUrl": "https://insights.wecheer.io/uploads/images/18618772944caa9eac38dc0077196727.jpg",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "17b587cf-f944-4ec6-96a0-e516c25b46fc",
        "name": "Eisenbahn",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Eisenbahn.png",
        "description": null,
        "bottleCapIds": [
          "eisenbahn-2021-black-br"
        ]
      },
      {
        "id": "d8f2b226-63a2-41f7-a737-394068c64a75",
        "name": "Penafiel",
        "imageUrl": "https://insights.wecheer.io/uploads/images/a948cb8e6c24731db0b497fd54f19489.png",
        "description": null,
        "bottleCapIds": [
          "penafiel-2018-silver",
          "penafiel-2019-blue"
        ]
      },
      {
        "id": "e96e11e4-3d23-48c7-b524-58ad174fe91d",
        "name": "Calcides",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Cacildes.png",
        "description": null,
        "bottleCapIds": [
          "calcides-2021-red-br"
        ]
      },
      {
        "id": "53034984-dfab-4507-9e5c-35b272f9d169",
        "name": "Bia Viet",
        "imageUrl": "https://insights.wecheer.io/uploads/images/123.jpeg",
        "description": null,
        "bottleCapIds": [
          "bia-viet-2020-white"
        ]
      },
      {
        "id": "f7ec4395-4334-4e5c-b4ac-161112d0839c",
        "name": "Red Bull Tonic",
        "imageUrl": "https://insights.wecheer.io/uploads/images/f78e2f032632c3da513891ffbadc5eec.PNG",
        "description": null,
        "bottleCapIds": [
          "red-bull-tonic-2022-blue-ch"
        ]
      },
      {
        "id": "51032159-19cc-478e-9cfd-05c5571408a8",
        "name": "Budweiser",
        "imageUrl": "https://insights.wecheer.io/uploads/images/budweiser.png",
        "description": null,
        "bottleCapIds": [
          "budweiser-2018-red-crown",
          "budweiser-2021-white-br",
          "budweiser-2018-red-bud"
        ]
      },
      {
        "id": "92e5a79e-8c4b-4b36-8dee-ec1dcf3b6cc1",
        "name": "Kinik",
        "imageUrl": "https://insights.wecheer.io/uploads/images/Kinik.PNG",
        "description": null,
        "bottleCapIds": [
          "kinik-2022-red-ch"
        ]
      },
      {
        "id": "e9b03096-6d40-418c-9cc8-d3710d792832",
        "name": "Lagunitas",
        "imageUrl": "https://insights.wecheer.io/uploads/images/lahuntas.jpg",
        "description": null,
        "bottleCapIds": [
          "lagunitas-2018-golden"
        ]
      },
      {
        "id": "d0879449-2be8-49c7-9215-4f942e9bbc25",
        "name": "Huda",
        "imageUrl": "https://insights.wecheer.io/uploads/images/f2b6caa783a9da0c351d2add13a05776.jpg",
        "description": null,
        "bottleCapIds": [
          "huda-2018-silver",
          "huda-promo-2020-silver"
        ]
      },
      {
        "id": "4e68cc10-e0d3-4b6d-bb2a-15f6008108d2",
        "name": "Zubba",
        "imageUrl": "https://insights.wecheer.io/uploads/images/KZ7jgx.jpg",
        "description": null,
        "bottleCapIds": [
          "zubba-2020-purple"
        ]
      },
      {
        "id": "fce448f7-71c3-4976-9339-624cc23591e5",
        "name": "Kinley Ginger Beer",
        "imageUrl": "https://insights.wecheer.io/uploads/images/8ac9295d753c4c70e0b7e103a4a00d9c.jpg",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "ffd1f221-40f2-44b1-97be-9ef74d7c1462",
        "name": "Corona Light",
        "imageUrl": "https://insights.wecheer.io/uploads/images/corana-light.png",
        "description": null,
        "bottleCapIds": [
          "corona-light-2018-yellow"
        ]
      },
      {
        "id": "ad1fb579-dfba-48cf-8159-dcc19ce7afd5",
        "name": "Leffe Brown",
        "imageUrl": "https://insights.wecheer.io/uploads/images/41057729fa30c692bfc6a7ee08885a1c.png",
        "description": null,
        "bottleCapIds": [
          "leffe-brown-2018-black"
        ]
      },
      {
        "id": "fe101edf-5664-4eab-bc8a-248992102ec7",
        "name": "East West",
        "imageUrl": "https://insights.wecheer.io/uploads/images/eastwest.jpeg",
        "description": null,
        "bottleCapIds": [
          "east-west-2018-black"
        ]
      },
      {
        "id": "469bd946-2aac-4517-8b3d-05e95a961bd0",
        "name": "Devassa",
        "imageUrl": "https://insights.wecheer.io/uploads/images/1e90a010-4389-49a7-80c6-9faab2537531.jpg",
        "description": null,
        "bottleCapIds": [
          "devassa-2021-red-br"
        ]
      },
      {
        "id": "8308f990-10d1-4ab9-b6a1-ef3b9510cd5b",
        "name": "other",
        "imageUrl": "https://insights.wecheer.io/uploads/images/38e51bdba2fb1b738a50e515addc3089.jpg",
        "description": null,
        "bottleCapIds": [
          "not-a-cap-black",
          "not-a-cap-crashed",
          "not-a-cap-white",
          "other",
          "other-blurry",
          "other-newbrand",
          "a-2021-green-br",
          "redtext-2021-red-br"
        ]
      },
      {
        "id": "b768cd3c-c407-48a9-ac78-9b124e414809",
        "name": "Fuze Tea",
        "imageUrl": "https://insights.wecheer.io/uploads/images/18618772944caa9eac38dc0077196727.jpg",
        "description": null,
        "bottleCapIds": [
          "fuze-tea-2022-silver-it"
        ]
      },
      {
        "id": "3505daa8-2575-46bc-bc72-32eb41057901",
        "name": "Sapporo",
        "imageUrl": "https://insights.wecheer.io/uploads/images/3deec7f12899d92ee5f4e93072a191e0.png",
        "description": null,
        "bottleCapIds": [
          "sapporo-2018-yellow"
        ]
      },
      {
        "id": "b99084ee-8847-46cd-96a2-e70b8d44e8f2",
        "name": "Beck's Bier",
        "imageUrl": "https://insights.wecheer.io/uploads/images/219b1d6714a02fdc4182a4271171dc7c.png",
        "description": null,
        "bottleCapIds": [
          "beck's-bier-2018-silver"
        ]
      },
      {
        "id": "bd63fadf-8e22-4f0b-96ff-cd95cba58739",
        "name": "Jarritos",
        "imageUrl": "https://insights.wecheer.io/uploads/images/jarritos.jpg",
        "description": null,
        "bottleCapIds": [
          "jarritos-2018-silver"
        ]
      },
      {
        "id": "58f0d807-f701-478a-a488-8ebccb150956",
        "name": "Pepsi Max",
        "imageUrl": "https://insights.wecheer.io/uploads/images/31I9I1XgB4L._SR600,315_PIWhiteStrip,BottomLeft,0,35_PIStarRatingFOURANDHALF,BottomLeft,360,-6_SR600,315_ZA64,445,290,400,400,AmazonEmberBold,12,4,0,0,5_SCLZZZZZZZ_FMpng_BG255,255,255.png",
        "description": null,
        "bottleCapIds": [
          "pepsi-max-2022-black-it"
        ]
      },
      {
        "id": "56394d36-1bd2-452d-9e8d-006608878c58",
        "name": "Lurisia Mixer Con Vermouth",
        "imageUrl": "https://insights.wecheer.io/uploads/images/bd6c3aea1d58b92c6996dbfc74b25dac.png",
        "description": null,
        "bottleCapIds": []
      },
      {
        "id": "b5013ec5-9132-494b-9258-37a481871ec8",
        "name": "U",
        "imageUrl": "https://insights.wecheer.io/uploads/images/b70f497b-ed38-4588-ad32-100d1a2a57e9.jpeg",
        "description": null,
        "bottleCapIds": [
          "u-2018-black"
        ]
      },
      {
        "id": "09dc9a72-86f9-4fc4-bd87-a96851bd6ffa",
        "name": "Modelo Gold",
        "imageUrl": "https://insights.wecheer.io/uploads/images/modelo-gold.jpg",
        "description": null,
        "bottleCapIds": [
          "modelo-gold-2018-golden",
          "modelo-gold-2018-golden-uncovered"
        ]
      },
      {
        "id": "18f7876e-508b-45b4-8bb1-4c9c0354937e",
        "name": "Schützgarten Panaché",
        "imageUrl": "https://insights.wecheer.io/uploads/images/ea27288180e7dc1017dda270aec5f0b2.PNG",
        "description": null,
        "bottleCapIds": [
          "schutzgarten-panache-2022-black-ch"
        ]
      },
      {
        "id": "4855f9d3-e386-4803-9d59-6d853e6f66fe",
        "name": "Heineken",
        "imageUrl": "https://insights.wecheer.io/uploads/images/89531169921c2362ed44ad74c032b151.png",
        "description": null,
        "bottleCapIds": [
          "heineken-2018-white",
          "heineken-2019-green"
        ]
      },
      {
        "id": "0c0f52d2-1b4c-4659-96d5-c29a77fe687c",
        "name": "Truc Bach",
        "imageUrl": "https://insights.wecheer.io/uploads/images/trucbach.png",
        "description": null,
        "bottleCapIds": [
          "truc-bach-2018-green"
        ]
      },
      {
        "id": "d2ad59dc-fc82-49fc-ad07-9d4dc45a5aaf",
        "name": "Thomas Henry",
        "imageUrl": "https://insights.wecheer.io/uploads/images/8178396e-7053-4c75-afc9-4da1ce1562aa.jpeg",
        "description": null,
        "bottleCapIds": [
          "thomas-henry-2020-multicolor"
        ]
      },
      {
        "id": "9b44466b-c628-44b3-ab3a-a1a48373903a",
        "name": "Bohemia",
        "imageUrl": "https://insights.wecheer.io/uploads/images/ea1932e4f7752aa409642348daec6c39.png",
        "description": null,
        "bottleCapIds": [
          "bohemia-2021-white-br",
          "bohemia-2021-whitecover-br",
          "bohemia-2018-golden",
          "bohemia-2018-silver-uncovered"
        ]
      },
      {
        "id": "ec1f7c9e-3f08-4723-a8db-635012ef984b",
        "name": "Red Cola",
        "imageUrl": "https://insights.wecheer.io/uploads/images/W1Aw2V.jpg",
        "description": null,
        "bottleCapIds": [
          "red-cola-2020-red"
        ]
      },
      {
        "id": "b752e309-0171-484f-aeec-a45ac9fbdbb3",
        "name": "Rivella Rot",
        "imageUrl": "https://insights.wecheer.io/uploads/images/014dc74507dadd653732fb46af326fd3.PNG",
        "description": null,
        "bottleCapIds": [
          "rivella-rot-2022-white-ch"
        ]
      },
      {
        "id": "439e6dd9-f0b7-4f2f-ae7c-3d302ef5ccdc",
        "name": "Canada Dry",
        "imageUrl": "https://insights.wecheer.io/uploads/images/c0c43e48cb27c04a1ecb091baeb3764f.jpg",
        "description": null,
        "bottleCapIds": [
          "canada-dry-2018-blue"
        ]
      },
      {
        "id": "079662dc-0527-4b9e-b96f-36480bd0a2bf",
        "name": "Sting",
        "imageUrl": "https://insights.wecheer.io/uploads/images/a089f36f-b363-47f0-8a71-205ce9c93b90.jpeg",
        "description": null,
        "bottleCapIds": [
          "sting-2018-red"
        ]
      },
      {
        "id": "e1bfde6d-018c-44e9-93c8-a7b584e3cc04",
        "name": "Colorado",
        "imageUrl": "https://insights.wecheer.io/uploads/images/5ea820f66d7450b07bc78917d93fb346.png",
        "description": null,
        "bottleCapIds": [
          "colorado-2021-yellow-br"
        ]
      },
      {
        "id": "32580e25-65b6-432f-b02c-8f1e12b07d82",
        "name": "Victoria",
        "imageUrl": "https://insights.wecheer.io/uploads/images/victoria.png",
        "description": null,
        "bottleCapIds": [
          "victoria-2018-white"
        ]
      },
      {
        "id": "5d667247-380a-4a86-a0c6-d84f2c7df2fb",
        "name": "Amstel Ultra",
        "imageUrl": "https://insights.wecheer.io/uploads/images/01d6aa1d-25de-4206-b9be-3083ce6e1c7b.jpeg",
        "description": null,
        "bottleCapIds": [
          "amstel-ultra-2018-white"
        ]
      },
      {
        "id": "bb3cc534-c0e2-43a5-a325-902e86a3aa08",
        "name": "Colimita",
        "imageUrl": "https://insights.wecheer.io/uploads/images/27bfd6f722968d44fa2a83b98bc750fa.png",
        "description": null,
        "bottleCapIds": [
          "colimita-2018-multicolor"
        ]
      }
    ]

    let arr: any = [];
    for (const iterator of input) {
      let brandName: any = dataSecond.filter((fil: any) => {
          for (const iterator1 of fil.bottleCapIds) {
            if (iterator1 === iterator["Bottle cap ID"]) {
              return fil.name;
            };
          }
      })
      if (brandName.length > 0) {
        arr.push({
          "Bottle cap ID": iterator["Bottle cap ID"],
          "Bottle product": brandName[0].name
        })
      }
    }

    console.log('');

    // await this.convertData2JsonService.convertData2Json('2022-07-13T00:00:00.000+00:00');
    return true;
  }
}


