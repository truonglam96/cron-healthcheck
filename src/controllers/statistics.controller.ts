import { authenticate } from "@loopback/authentication";
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from "@loopback/repository";
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
} from "@loopback/rest";
import { DrinkMoments } from "../models";
import {
  DrinkMomentsRepository,
  AutomaticResultsRepository,
  AutomaticDetailsRepository,
  ManualResultsRepository,
  ManualDetailsRepository,
  SettingValuesRepository,
} from "../repositories";

@authenticate("jwt")
export class StatisticController {
  constructor(
    @repository(DrinkMomentsRepository)
    public DrinkMomentsRepository: DrinkMomentsRepository,
    @repository(AutomaticResultsRepository)
    public AutomaticResultsRepository: AutomaticResultsRepository,
    @repository(AutomaticDetailsRepository)
    public AutomaticDetailsRepository: AutomaticDetailsRepository,
    @repository(ManualResultsRepository)
    public ManualResultsRepository: ManualResultsRepository,
    @repository(ManualDetailsRepository)
    public ManualDetailsRepository: ManualDetailsRepository,
    @repository(SettingValuesRepository)
    public SettingValuesRepository: SettingValuesRepository
  ) {}

  //Get statistic of line chart automatic
  @get("/statistics/error-reason-automatic")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getErrorReasonAutomatic(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<any> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filter = {
      where: {
        macAddress: { neq: "" },
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
        isPass: false,
      },
      order: ["lastDate ASC"],
      fields: {
        macAddress: true,
      },
    };

    let data = await this.AutomaticResultsRepository.find(filter);
    let arrIds: any = [];
    for (const iterator of data) {
      arrIds.push(iterator.macAddress);
    }

    let filterLstErr = {
      where: {
        isPass: false,
        macAddress: {
          inq: arrIds,
        },
      },
    };
    let dataDetail = await this.AutomaticDetailsRepository.find(filterLstErr);

    let arrResult: any = [];
    for (const iterator of arrIds) {
      let item = dataDetail.filter((fil) => fil.macAddress === iterator);
      let sort = item.sort(
        (a: any, b: any) => b.createdDate.getTime() - a.createdDate.getTime()
      )[0];
      arrResult.push(sort);
    }

    let read_mac = 0,
      erase_flash = 0,
      flash_firmware = 0,
      check_gpio = 0,
      check_force = 0,
      check_ram = 0,
      check_camera = 0,
      check_rtc = 0,
      check_imu = 0,
      take_pic = 0;

    for (const iterator of arrResult) {
      let obj = JSON.parse(
        iterator.logResult.replace(/\T/gi, "t").replace(/\F/gi, "f")
      );
      switch (JSON.stringify(obj[obj.length - 1])) {
        case '{"check_imu":false}':
          check_imu++;
          break;
        case '{"read_mac":false}':
          read_mac++;
          break;
        case '{"erase_flash":false}':
          erase_flash++;
          break;
        case '{"flash_firmware":false}':
          flash_firmware++;
          break;
        case '{"check_gpio":false}':
          check_gpio++;
          break;
        case '{"check_force":false}':
          check_force++;
          break;
        case '{"check_ram":false}':
          check_ram++;
          break;
        case '{"check_camera":false}':
          check_camera++;
          break;
        case '{"check_rtc":false}':
          check_rtc++;
          break;
        case '{"take_pic":false}':
          take_pic++;
          break;
      }
    }

    return {
      read_mac: read_mac,
      erase_flash: erase_flash,
      flash_firmware: flash_firmware,
      check_gpio: check_gpio,
      check_force: check_force,
      check_ram: check_ram,
      check_camera: check_camera,
      check_rtc: check_rtc,
      take_pic: take_pic,
      check_imu: check_imu,
    };
  }

  //Get statistic of line chart automatic
  @get("/statistics/pie-automatic-type")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getPie2Data_Type(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<{}> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filterPassA = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        type: "A",
        isPass: true,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let filterPassB = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        type: "B",
        isPass: true,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let filterFailA = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        type: "A",
        isPass: false,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let filterFailB = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        type: "B",
        isPass: false,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let dataPassA = await this.AutomaticResultsRepository.find(filterPassA);
    let dataPassB = await this.AutomaticResultsRepository.find(filterPassB);
    let dataFailA = await this.AutomaticResultsRepository.find(filterFailA);
    let dataFailB = await this.AutomaticResultsRepository.find(filterFailB);

    return {
      pass: {
        total: dataPassA.length + dataPassB.length,
        typeA: dataPassA.length,
        typeB: dataPassB.length,
      },
      fail: {
        total: dataFailA.length + dataFailB.length,
        typeA: dataFailA.length,
        typeB: dataFailB.length,
      },
    };
  }

  //Get statistic of line chart manual
  @get("/statistics/pie-manual-type")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getPie2Data_TypeManual(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<{}> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filterPassExistENV = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        isPass: true,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let filterPassNotENV = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        HPI: {like: '%4c4e%'},
        isPass: true,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let filterFailExistENV = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        isPass: false,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let filterFailNotENV = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        HPI: {like: '%4c4e%'},
        isPass: false,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let dataPassENV = await this.ManualResultsRepository.find(filterPassExistENV);
    let dataPass = await this.ManualResultsRepository.find(filterPassNotENV);
    let dataFailENV = await this.ManualResultsRepository.find(filterFailExistENV);
    let dataFail = await this.ManualResultsRepository.find(filterFailNotENV);

    return {
      pass: {
        total: dataPassENV.length + dataPass.length,
        existENV: dataPassENV.length,
        notExistENV: dataPass.length,
      },
      fail: {
        total: dataFailENV.length + dataFail.length,
        existENV: dataFailENV.length,
        notExistENV: dataFail.length,
      },
    };
  }

  //Get statistic count4Column
  @get("/statistics/count4Column")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getCount4Column(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<any> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    
    let filterPassManual = {
      where: {
        macAddress: { neq: "" },
        isPass: true,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let filterFailManual = {
      where: {
        macAddress: { neq: "" },
        isPass: false,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let filterPassAutomaticResult = {
      where: {
        macAddress: { neq: "" },
        isPass: true,
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let dataPassManual = await this.ManualResultsRepository.find(filterPassManual);
    let dataFailManual = await this.ManualResultsRepository.find(filterFailManual);
    let dataPassAutomaticResult = await this.AutomaticResultsRepository.find(filterPassAutomaticResult);
    
    return {
      totalAchieved: dataPassManual.length,
      percentAchieved: ((dataPassManual.length*100)/21000).toFixed(1),
      totalQualified: dataPassManual.length,
      percentQualified: ((dataPassManual.length*100)/21000).toFixed(1),
      totalUnsatisfactory: dataFailManual.length,
      percentUnsatisfactory: ((dataFailManual.length*100)/21000).toFixed(1),
      totalPCBTestAutomatic: dataPassAutomaticResult.length - (dataPassManual.length + dataFailManual.length),
      percentPCBTestAutomatic:(((dataPassAutomaticResult.length - (dataPassManual.length + dataFailManual.length))*100)/21000).toFixed(1)
    }
  }

  //Get statistic of line chart automatic
  @get("/statistics/line-chart-automatic")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getLineChartAutomatic(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<[]> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filter = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let data = await this.AutomaticResultsRepository.find(filter);
    let arrDateTime: any = [];
    for (const iterator of data) {
      // let date = await this.formatDate(
      //   await this.timeFormat(iterator.lastDate, 7)
      // );
      let date = await this.formatDate(
        await this.timeFormat(iterator.lastDate, 0)
      );

      if (!arrDateTime.hasOwnProperty(date)) {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = 1;
          isFail = 0;
        } else {
          isPass = 0;
          isFail = 1;
        }
        //Push new object to array
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      } else {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = arrDateTime[date].isPass + 1;
          isFail = arrDateTime[date].isFail;
        } else {
          isFail = arrDateTime[date].isFail + 1;
          isPass = arrDateTime[date].isPass;
        }
        //Update value for exist object
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      }
    }
    let arrResult: any = [];
    let arrSumUp: any = [];
    let index = 0;
    for (const key in arrDateTime) {
      arrResult.push({ date: key, ...arrDateTime[key] });
      if (index != 0) {
        arrSumUp.push({
          date: key,
          isPass: arrSumUp[index - 1].isPass + arrResult[index].isPass,
          isFail: arrSumUp[index - 1].isFail + arrResult[index].isFail,
        });
      } else {
        arrSumUp.push({
          date: key,
          isPass: arrResult[index].isPass,
          isFail: arrResult[index].isFail,
        });
      }
      index++;
    }
    return arrSumUp;
  }

  // //Get statistic of line chart automatic
  // @get("/statistics/pie2-chart-automatic")
  // @response(200, {
  //   description: "Testing upload to server",
  //   content: { "application/json": { schema: {} } },
  // })
  // async getPie2Automatic(
  //   @param.query.string("fromDate") fromDate: string,
  //   @param.query.string("toDate") toDate: string
  // ): Promise<any> {
  //   fromDate = fromDate + " 00:00:00";
  //   toDate = toDate + " 23:59:59";
  //   let filterPass = {
  //     // "limit": 100,
  //     where: {
  //       macAddress: { neq: "" },
  //       isPass: true,
  //       and: [
  //         { lastDate: { gte: new Date(fromDate) } },
  //         { lastDate: { lte: new Date(toDate) } },
  //       ],
  //     },
  //     order: ["lastDate ASC"],
  //   };

  //   let filterPass = {
  //     // "limit": 100,
  //     where: {
  //       macAddress: { neq: "" },
  //       isPass: true,
  //       and: [
  //         { lastDate: { gte: new Date(fromDate) } },
  //         { lastDate: { lte: new Date(toDate) } },
  //       ],
  //     },
  //     order: ["lastDate ASC"],
  //   };

  //   let data = await this.AutomaticResultsRepository.find(filter);

  //   let res = {
  //     pass: {
  //       value: 100,
  //       typeA: 100,
  //       typeB: 100
  //     },
  //     fail: {
  //       value: 100,
  //       typeA: 100,
  //       typeB: 100
  //     }
  //   };

  //   return [
  //     {
  //       category: "Fail",
  //       value: 300,
  //       subData: [
  //         { category: "Type A", value: 350 },
  //         { category: "Type B", value: 150 },
  //       ],
  //     },
  //     {
  //       category: "Pass",
  //       value: 500,
  //       subData: [
  //         { category: "Type A", value: 200 },
  //         { category: "Type B", value: 150 },
  //       ],
  //     },
  //   ];
  //   // let arrDateTime: any = [];
  //   // for (const iterator of data) {
  //   //   // let date = await this.formatDate(
  //   //   //   await this.timeFormat(iterator.lastDate, 7)
  //   //   // );
  //   //   let date = await this.formatDate(
  //   //     await this.timeFormat(iterator.lastDate, 0)
  //   //   );

  //   //   if (!arrDateTime.hasOwnProperty(date)) {
  //   //     let isPass = 0,
  //   //       isFail = 0;
  //   //     if (iterator.isPass) {
  //   //       isPass = 1;
  //   //       isFail = 0;
  //   //     } else {
  //   //       isPass = 0;
  //   //       isFail = 1;
  //   //     }
  //   //     //Push new object to array
  //   //     arrDateTime[date] = {
  //   //       isPass: isPass,
  //   //       isFail: isFail,
  //   //     };
  //   //   } else {
  //   //     let isPass = 0,
  //   //       isFail = 0;
  //   //     if (iterator.isPass) {
  //   //       isPass = arrDateTime[date].isPass + 1;
  //   //       isFail = arrDateTime[date].isFail;
  //   //     } else {
  //   //       isFail = arrDateTime[date].isFail + 1;
  //   //       isPass = arrDateTime[date].isPass;
  //   //     }
  //   //     //Update value for exist object
  //   //     arrDateTime[date] = {
  //   //       isPass: isPass,
  //   //       isFail: isFail,
  //   //     };
  //   //   }
  //   // }
  //   // let arrResult: any = [];
  //   // let arrSumUp: any = [];
  //   // let index = 0;
  //   // for (const key in arrDateTime) {
  //   //   arrResult.push({ date: key, ...arrDateTime[key] });
  //   //   if (index != 0) {
  //   //     arrSumUp.push({
  //   //       date: key,
  //   //       isPass: arrSumUp[index - 1].isPass + arrResult[index].isPass,
  //   //       isFail: arrSumUp[index - 1].isFail + arrResult[index].isFail,
  //   //     });
  //   //   } else {
  //   //     arrSumUp.push({
  //   //       date: key,
  //   //       isPass: arrResult[index].isPass,
  //   //       isFail: arrResult[index].isFail,
  //   //     });
  //   //   }
  //   //   index++;
  //   // }
  //   // return arrSumUp;
  // }

  //Get statistic of line chart automatic bar
  @get("/statistics/line-chart-automatic-bar")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getLineChartAutomatic_Bar(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<[]> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filter = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate DESC"],
    };

    let data = await this.AutomaticResultsRepository.find(filter);
    let arrDateTime: any = [];
    for (const iterator of data) {
      // let date = await this.formatDate(
      //   await this.timeFormat(iterator.lastDate, 7)
      // );
      let date = await this.formatDate(
        await this.timeFormat(iterator.lastDate, 0)
      );

      if (!arrDateTime.hasOwnProperty(date)) {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = 1;
          isFail = 0;
        } else {
          isPass = 0;
          isFail = 1;
        }
        //Push new object to array
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      } else {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = arrDateTime[date].isPass + 1;
          isFail = arrDateTime[date].isFail;
        } else {
          isFail = arrDateTime[date].isFail + 1;
          isPass = arrDateTime[date].isPass;
        }
        //Update value for exist object
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      }
    }
    let arrResult: any = [];
    // let arrSumUp: any = [];
    // let index = 0;
    for (const key in arrDateTime) {
      arrResult.push({ date: key, ...arrDateTime[key] });
      //   if (index != 0) {
      //     arrSumUp.push({
      //       date: key,
      //       isPass: arrSumUp[index - 1].isPass + arrResult[index].isPass,
      //       isFail: arrSumUp[index - 1].isFail + arrResult[index].isFail,
      //     });
      //   } else {
      //     arrSumUp.push({
      //       date: key,
      //       isPass: arrResult[index].isPass,
      //       isFail: arrResult[index].isFail,
      //     });
      //   }
      //   index++;
    }
    return arrResult;
  }

  //Get statistic of line chart manual bar
  @get("/statistics/line-chart-manual-bar")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getLineChartManual_Bar(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<[]> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filter = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate DESC"],
    };

    let data = await this.ManualResultsRepository.find(filter);
    let arrDateTime: any = [];
    for (const iterator of data) {
      // let date = await this.formatDate(
      //   await this.timeFormat(iterator.lastDate, 7)
      // );
      let date = await this.formatDate(
        await this.timeFormat(iterator.lastDate, 0)
      );

      if (!arrDateTime.hasOwnProperty(date)) {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = 1;
          isFail = 0;
        } else {
          isPass = 0;
          isFail = 1;
        }
        //Push new object to array
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      } else {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = arrDateTime[date].isPass + 1;
          isFail = arrDateTime[date].isFail;
        } else {
          isFail = arrDateTime[date].isFail + 1;
          isPass = arrDateTime[date].isPass;
        }
        //Update value for exist object
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      }
    }
    let arrResult: any = [];
    // let arrSumUp: any = [];
    // let index = 0;
    for (const key in arrDateTime) {
      arrResult.push({ date: key, ...arrDateTime[key] });
      //   if (index != 0) {
      //     arrSumUp.push({
      //       date: key,
      //       isPass: arrSumUp[index - 1].isPass + arrResult[index].isPass,
      //       isFail: arrSumUp[index - 1].isFail + arrResult[index].isFail,
      //     });
      //   } else {
      //     arrSumUp.push({
      //       date: key,
      //       isPass: arrResult[index].isPass,
      //       isFail: arrResult[index].isFail,
      //     });
      //   }
      //   index++;
    }
    return arrResult;
  }

  //Get statistic for line chart automatic time of day
  @get("/statistics/line-chart-automatic/time-of-day")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getLineChartAutomaticTimeOfDay(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<any> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filter = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let data = await this.AutomaticResultsRepository.find(filter);
    let arrDateTime: any = [];
    for (const iterator of data) {
      let date = await this.formatDateDay(
        await this.timeFormat(iterator.lastDate, 7)
      );
      date = date.split(", ")[1];

      if (!arrDateTime.hasOwnProperty(date)) {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = 1;
          isFail = 0;
        } else {
          isPass = 0;
          isFail = 1;
        }
        //Push new object to array
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      } else {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = arrDateTime[date].isPass + 1;
          isFail = arrDateTime[date].isFail;
        } else {
          isFail = arrDateTime[date].isFail + 1;
          isPass = arrDateTime[date].isPass;
        }
        //Update value for exist object
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      }
    }
    let arrResult: any = [];
    let arrSumUp: any = [];
    let index = 0;
    for (const key in arrDateTime) {
      arrResult.push({ date: key, ...arrDateTime[key] });
      // if(index != 0){
      //   arrSumUp.push(
      //     {
      //       date: key,
      //       isPass: (arrSumUp[index-1].isPass + arrResult[index].isPass),
      //       isFail: (arrSumUp[index-1].isFail + arrResult[index].isFail)
      //     });
      // }else{
      //   arrSumUp.push({date: key, isPass: arrResult[index].isPass, isFail: arrResult[index].isFail})
      // }
      // index++
    }
    arrResult = arrResult.sort((a: any, b: any) => a.date.localeCompare(b.date));
    return arrResult;
  }

  //Get statistic of line chart manual
  @get("/statistics/error-reason-manual")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getErrorReasonManual(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<any> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filter = {
      where: {
        macAddress: { neq: "" },
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
        isPass: false,
      },
      order: ["lastDate ASC"],
      fields: {
        macAddress: true,
      },
    };

    let data = await this.ManualResultsRepository.find(filter);
    let arrIds: any = [];
    for (const iterator of data) {
      arrIds.push(iterator.macAddress);
    }

    let filterLstErr = {
      where: {
        isPass: false,
        macAddress: {
          inq: arrIds,
        },
      },
    };
    let dataDetail = await this.ManualDetailsRepository.find(filterLstErr);

    let arrResult: any = [];
    for (const iterator of arrIds) {
      let item = dataDetail.filter((fil) => fil.macAddress === iterator);
      let sort = item.sort(
        (a: any, b: any) => b.createdDate.getTime() - a.createdDate.getTime()
      )[0];
      arrResult.push(sort);
    }
    let get_hpi = 0,
      check_battery = 0,
      get_mac = 0,
      press_user_button = 0,
      check_led = 0,
      take_a_picture = 0,
      check_image = 0,
      check_hall_sensor = 0,
      check_wifi = 0,
      send_test_upload = 0,
      send_key = 0,
      check_hpi = 0,
      burn_hpi = 0,
      update_fw_prod = 0,
      check_led_last = 0;

    for (const iterator of arrResult) {
      let obj = JSON.parse(
        iterator.logResult.replace(/\T/gi, "t").replace(/\F/gi, "f")
      );
      switch (JSON.stringify(obj[obj.length - 1])) {
        case '{"get_hpi":false}':
          get_hpi++;
          break;
        case '{"check_battery":false}':
          check_battery++;
          break;
        case '{"get_mac":false}':
          get_mac++;
          break;
        case '{"press_user_button":false}':
          press_user_button++;
          break;
        case '{"check_led":false}':
          check_led++;
          break;
        case '{"take_a_picture":false}':
          take_a_picture++;
          break;
        case '{"check_image":false}':
          check_image++;
          break;
        case '{"check_hall_sensor":false}':
          check_hall_sensor++;
          break;
        case '{"check_wifi":false}':
          check_wifi++;
          break;
        case '{"send_test_upload":false}':
          send_test_upload++;
          break;
        case '{"send_key":false}':
          send_key++;
          break;
        case '{"check_hpi":false}':
          check_hpi++;
          break;
        case '{"burn_hpi":false}':
          burn_hpi++;
          break;
        case '{"update_fw_prod":false}':
          update_fw_prod++;
          break;
        case '{"check_led_last":false}':
          check_led_last++;
          break;
      }
    }

    return {
      get_hpi: get_hpi,
      check_battery: check_battery,
      get_mac: get_mac,
      press_user_button: press_user_button,
      check_led: check_led,
      take_a_picture: take_a_picture,
      check_image: check_image,
      check_hall_sensor: check_hall_sensor,
      check_wifi: check_wifi,
      send_test_upload: send_test_upload,
      send_key: send_key,
      check_hpi: check_hpi,
      burn_hpi: burn_hpi,
      update_fw_prod: update_fw_prod,
      check_led_last: check_led_last,
    };
  }

  //Get statistic of line chart manual
  @get("/statistics/line-chart-manual")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getLineChartManual(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<any> {
    // let dates: any = [];
    // function printDates(startDate: any, endDate: any) {
    //   let currentDate = new Date(startDate);
    //   while (currentDate <= new Date(endDate)) {
    //     dates.push({
    //       date: currentDate.toISOString().split("T")[0],
    //       value: 150,
    //     });
    //     currentDate.setDate(currentDate.getDate() + 1);
    //   }
    // }

    // printDates("2023-01-01", "2023-05-30");

    // function updateValue(arr: any, date: any, value: any) {
    //   return arr.map((item: any) => {
    //     if (item.date === date) {
    //       item['value'] = value;
    //     }
    //   });
    // }

    // updateValue(dates, '2023-01-01', 32);

    // try {
    // let aaa = await this.SettingValuesRepository.create({
    //   settingName: "Target Date",
    //   data: [dates],
    // });
    //   console.log(aaa);
    // } catch (error) {
    //   console.log(error);
    // }

    let settingData = await this.SettingValuesRepository.find({
      where: { settingName: "Target Date" },
    });
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filter = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let data = await this.ManualResultsRepository.find(filter);
    let arrDateTime: any = [];
    for (const iterator of data) {
      let date = await this.formatDate(
        await this.timeFormat(iterator.lastDate, 0)
      );

      if (!arrDateTime.hasOwnProperty(date)) {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = 1;
          isFail = 0;
        } else {
          isPass = 0;
          isFail = 1;
        }
        //Push new object to array
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      } else {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = arrDateTime[date].isPass + 1;
          isFail = arrDateTime[date].isFail;
        } else {
          isFail = arrDateTime[date].isFail + 1;
          isPass = arrDateTime[date].isPass;
        }
        //Update value for exist object
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      }
    }
    let arrResult: any = [];
    let arrSumUp: any = [];
    let index = 0;
    for (const key in arrDateTime) {
      arrResult.push({ date: key, ...arrDateTime[key] });
      if (index != 0) {
        arrSumUp.push({
          date: key,
          isPass: arrSumUp[index - 1].isPass + arrResult[index].isPass,
          isFail: arrSumUp[index - 1].isFail + arrResult[index].isFail,
        });
      } else {
        arrSumUp.push({
          date: key,
          isPass: arrResult[index].isPass,
          isFail: arrResult[index].isFail,
        });
      }
      index++;
    }
    return { result: arrSumUp, targetData: settingData[0].data };
  }

  //Get statistic for line chart manual time of day
  @get("/statistics/line-chart-manual/time-of-day")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getLineChartManualTimeOfDay(
    @param.query.string("fromDate") fromDate: string,
    @param.query.string("toDate") toDate: string
  ): Promise<any> {
    fromDate = fromDate + " 00:00:00";
    toDate = toDate + " 23:59:59";
    let filter = {
      // "limit": 100,
      where: {
        macAddress: { neq: "" },
        and: [
          { lastDate: { gte: new Date(fromDate) } },
          { lastDate: { lte: new Date(toDate) } },
        ],
      },
      order: ["lastDate ASC"],
    };

    let data = await this.ManualResultsRepository.find(filter);
    let arrDateTime: any = [];
    for (const iterator of data) {
      let date = await this.formatDateDay(
        await this.timeFormat(iterator.lastDate, 7)
      );
      date = date.split(", ")[1];

      if (!arrDateTime.hasOwnProperty(date)) {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = 1;
          isFail = 0;
        } else {
          isPass = 0;
          isFail = 1;
        }
        //Push new object to array
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      } else {
        let isPass = 0,
          isFail = 0;
        if (iterator.isPass) {
          isPass = arrDateTime[date].isPass + 1;
          isFail = arrDateTime[date].isFail;
        } else {
          isFail = arrDateTime[date].isFail + 1;
          isPass = arrDateTime[date].isPass;
        }
        //Update value for exist object
        arrDateTime[date] = {
          isPass: isPass,
          isFail: isFail,
        };
      }
    }
    let arrResult: any = [];
    let arrSumUp: any = [];
    let index = 0;
    for (const key in arrDateTime) {
      arrResult.push({ date: key, ...arrDateTime[key] });
      // if(index != 0){
      //   arrSumUp.push(
      //     {
      //       date: key,
      //       isPass: (arrSumUp[index-1].isPass + arrResult[index].isPass),
      //       isFail: (arrSumUp[index-1].isFail + arrResult[index].isFail)
      //     });
      // }else{
      //   arrSumUp.push({date: key, isPass: arrResult[index].isPass, isFail: arrResult[index].isFail})
      // }
      // index++
    }
    arrResult = arrResult.sort((a: any, b: any) => a.date.localeCompare(b.date));
    return arrResult;
  }

  async formatDate(date: any) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  }

  async formatDateDay(date: any) {
    return new Date(date).toLocaleDateString("en-GB", {
      // day: "2-digit",
      // month: "2-digit",
      // year: "numeric",
      hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  }

  async timeFormat(date: Date, num: any) {
    return date.setHours(date.getHours() + num);
  }

  @post("/DrinkMoments")
  @response(200, {
    description: "DrinkMoments model instance",
    content: {
      "application/json": { schema: getModelSchemaRef(DrinkMoments) },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(DrinkMoments, {
            title: "NewDrinkMoments",
            exclude: ["_id"],
          }),
        },
      },
    })
    DrinkMoments: Omit<DrinkMoments, "string">
  ): Promise<DrinkMoments> {
    return this.DrinkMomentsRepository.create(DrinkMoments);
  }

  @get("/DrinkMoments/count")
  @response(200, {
    description: "DrinkMoments model count",
    content: { "application/json": { schema: CountSchema } },
  })
  async count(
    @param.where(DrinkMoments) where?: Where<DrinkMoments>
  ): Promise<Count> {
    return this.DrinkMomentsRepository.count(where);
  }

  @get("/DrinkMoments")
  @response(200, {
    description: "Array of DrinkMoments model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(DrinkMoments, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(DrinkMoments) filter?: Filter<DrinkMoments>
  ): Promise<DrinkMoments[]> {
    return this.DrinkMomentsRepository.find(filter);
  }

  @patch("/DrinkMoments")
  @response(200, {
    description: "DrinkMoments PATCH success count",
    content: { "application/json": { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(DrinkMoments, { partial: true }),
        },
      },
    })
    DrinkMoments: DrinkMoments,
    @param.where(DrinkMoments) where?: Where<DrinkMoments>
  ): Promise<Count> {
    return this.DrinkMomentsRepository.updateAll(DrinkMoments, where);
  }

  @get("/DrinkMoments/{id}")
  @response(200, {
    description: "DrinkMoments model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(DrinkMoments, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string("id") id: string,
    @param.filter(DrinkMoments, { exclude: "where" })
    filter?: FilterExcludingWhere<DrinkMoments>
  ): Promise<DrinkMoments> {
    return this.DrinkMomentsRepository.findById(id, filter);
  }

  @patch("/DrinkMoments/{id}")
  @response(204, {
    description: "DrinkMoments PATCH success",
  })
  async updateById(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(DrinkMoments, { partial: true }),
        },
      },
    })
    DrinkMoments: DrinkMoments
  ): Promise<void> {
    await this.DrinkMomentsRepository.updateById(id, DrinkMoments);
  }

  @put("/DrinkMoments/{id}")
  @response(204, {
    description: "DrinkMoments PUT success",
  })
  async replaceById(
    @param.path.string("id") id: string,
    @requestBody() DrinkMoments: DrinkMoments
  ): Promise<void> {
    await this.DrinkMomentsRepository.replaceById(id, DrinkMoments);
  }

  @del("/DrinkMoments/{id}")
  @response(204, {
    description: "DrinkMoments DELETE success",
  })
  async deleteById(@param.path.string("id") id: string): Promise<void> {
    await this.DrinkMomentsRepository.deleteById(id);
  }
}
