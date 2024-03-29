import { authenticate } from "@loopback/authentication";
import { inject } from "@loopback/core";
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
  Request,
  RestBindings,
  Response,
} from "@loopback/rest";

import { DrinkMoments, OtaInfo } from "../models";
import { DrinkMomentsRepository, OtaInfoRepository } from "../repositories";

export class BackupMongodbController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private request: Request,
    @repository(DrinkMomentsRepository)
    private drinkMomentsRepository: DrinkMomentsRepository,
    @repository(OtaInfoRepository)
    public otaInfoRepository: OtaInfoRepository
  ) {}

  @authenticate('jwt')
  @get("/DrinkMoments/{id}")
  @response(200, {
    description: "DrinkMoments model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(DrinkMoments, { includeRelations: true }),
      },
    },
  })
  async findById(@param.path.string("id") id: string): Promise<DrinkMoments> {
    return this.drinkMomentsRepository.findById(id);
  }

  @authenticate('jwt')
  @get("/get_img")
  @response(200, {})
  async getLink(): Promise<any> {
    var files = require("fs").readdirSync("./public/image/");
    let arr = [];
    for (const iterator of files) {
      arr.push("image\\" + iterator);
      // arr.unshift("image\\" + iterator);
    }
    return arr;
  }

  //Receive payload from opener
  @post("/box_comming")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  // async create(@requestBody() body: any): Promise<{}> {
  //   const sleep = (waitTimeInMs: any) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
  //   await sleep(25000)
  //   return {
  //     result: "success",
  //     brand: "test",
  //     doReset: false,
  //     doUpdate: false,
  //     fwUrl: "",
  //     image: "",
  //     timeUTC: parseInt((new Date().getTime() / 1000).toFixed()),
  //   };
  // }
  async create(@requestBody() body: any): Promise<{}> {
    let doUpdate: any = false,
      doReset: any = false,
      fwUrl: any = "";
    console.log(body);

    let obj = new DrinkMoments();
    obj.firmware = body.firmware ? body.firmware : "";
    obj.boxId = body.boxId ? body.boxId : "";
    obj.deviceSerial = body.deviceSerial ? body.deviceSerial : "";
    obj.battery = body.battery ? body.battery : "";
    obj.count = body.count ? body.count : "";
    obj.deviceTime = body.deviceTime ? body.deviceTime : "";
    obj.totalAwakeTime = body.totalAwakeTime ? body.totalAwakeTime : "";
    obj.restartCount = body.restartCount ? body.restartCount : "";
    obj.connection = body.connection ? body.connection : "";
    obj.wifiConnectStart = body.wifiConnectStart ? body.wifiConnectStart : "";
    obj.wifiConnectDone = body.wifiConnectDone ? body.wifiConnectDone : "";
    obj.rssi = body.rssi ? body.rssi : "";
    obj.cameraWakeupCount = body.cameraWakeupCount
      ? body.cameraWakeupCount
      : "";
    obj.imgType = body.imgType ? body.imgType : "";
    obj.imageCaptureTime = body.imageCaptureTime ? body.imageCaptureTime : "";
    obj.captureTimeRel = body.captureTimeRel ? body.captureTimeRel : "";
    obj.successfulImageUploadCount = body.successfulImageUploadCount
      ? body.successfulImageUploadCount
      : "";
    obj.serialNr = body.serialNr ? body.serialNr : "";
    obj.uniqueID = body.uniqueID ? body.uniqueID : "";
    obj.imagesRemaining = body.imagesRemaining ? body.imagesRemaining : "";
    obj.imagesUploadedInCycle = body.imagesUploadedInCycle
      ? body.imagesUploadedInCycle
      : "";
    obj.HPI = body.HPI ? body.HPI : "";
    obj.temperature = body.temperature ? body.temperature : "";
    obj.humidity = body.humidity ? body.humidity : "";
    obj.remainingImgInfo = body.remainingImgInfo ? body.remainingImgInfo : "";
    obj.imageB64 = body.imageB64 ? body.imageB64 : "";
    obj.imu = body.imu ? body.imu : "";
    obj.force = body.force ? body.force : "";
    this.drinkMomentsRepository.create(obj);

    // if(obj.boxId !== "" && obj.serialNr === "TEST"){
    //   //Find info OTA
    //   let getInfo: any = await this.otaInfoRepository.findOne({
    //     where: {
    //       boxId: obj.boxId,
    //     },
    //   });

    //   if (getInfo.doUpdate === true) {
    //     doUpdate = getInfo.doUpdate;
    //     doReset = getInfo.doReset;
    //     fwUrl = getInfo.fwUrl;

    //     //Set status after OTA runing
    //     this.otaInfoRepository.updateById(getInfo._id, new OtaInfo({doUpdate : false}));
    //   }
    // }

    if (obj.imageB64 === "" && obj.serialNr !== "TEST") {
      return {
        result: "failed",
        brand: "test",
        doReset: doReset,
        doUpdate: doUpdate,
        fwUrl: fwUrl,
        image: "",
        timeUTC: parseInt((new Date().getTime() / 1000).toFixed()),
      };
    } else {
      return {
        result: "success",
        brand: "test",
        doReset: doReset,
        doUpdate: doUpdate,
        fwUrl: fwUrl,
        image: "",
        timeUTC: parseInt((new Date().getTime() / 1000).toFixed()),
      };
    }
    // if(obj.imageB64 != ""){
    //   try {
    //     var b64 = body.imageB64;
    //     const fs = require("fs");
    //     // var b64 = b64.replace(/^data:image\/png;base64,/, "");
    //     let pathFile = './public/image/' + obj.boxId?.toString().replace(/:/gi, '_') + '_' + new Date().getTime() + '_' + drinkMomentNew._id.toString() + '.jpg';
    //     fs.writeFile(
    //       pathFile,
    //       b64,
    //       "base64",
    //       function (err: any) {
    //         console.log(err);
    //       }
    //     );
    //   } catch (error) {
    //     // console.log(error);
    //   }
    // }
  }

  @authenticate('jwt')
  //Create 1 data opener
  @post("/create-drink-moments")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async createDrinkMoments(@requestBody() body: any): Promise<{}> {
    let obj = new DrinkMoments();
    obj.firmware = body.firmware ? body.firmware : "";
    obj.boxId = body.boxId ? body.boxId : "";
    obj.deviceSerial = body.deviceSerial ? body.deviceSerial : "";
    obj.battery = body.battery ? body.battery : "";
    obj.count = body.count ? body.count : "";
    obj.deviceTime = body.deviceTime ? body.deviceTime : "";
    obj.totalAwakeTime = body.totalAwakeTime ? body.totalAwakeTime : "";
    obj.restartCount = body.restartCount ? body.restartCount : "";
    obj.connection = body.connection ? body.connection : "";
    obj.wifiConnectStart = body.wifiConnectStart ? body.wifiConnectStart : "";
    obj.wifiConnectDone = body.wifiConnectDone ? body.wifiConnectDone : "";
    obj.rssi = body.rssi ? body.rssi : "";
    obj.cameraWakeupCount = body.cameraWakeupCount
      ? body.cameraWakeupCount
      : "";
    obj.imgType = body.imgType ? body.imgType : "";
    obj.imageCaptureTime = body.imageCaptureTime ? body.imageCaptureTime : "";
    obj.captureTimeRel = body.captureTimeRel ? body.captureTimeRel : "";
    obj.successfulImageUploadCount = body.successfulImageUploadCount
      ? body.successfulImageUploadCount
      : "";
    obj.serialNr = body.serialNr ? body.serialNr : "";
    obj.uniqueID = body.uniqueID ? body.uniqueID : "";
    obj.imagesRemaining = body.imagesRemaining ? body.imagesRemaining : "";
    obj.imagesUploadedInCycle = body.imagesUploadedInCycle
      ? body.imagesUploadedInCycle
      : "";
    obj.HPI = body.HPI ? body.HPI : "";
    obj.temperature = body.temperature ? body.temperature : "";
    obj.humidity = body.humidity ? body.humidity : "";
    obj.remainingImgInfo = body.remainingImgInfo ? body.remainingImgInfo : "";
    obj.imageB64 = body.imageB64 ? body.imageB64 : "";
    obj.imu = body.imu ? body.imu : "";
    obj.force = body.force ? body.force : "";
    return this.drinkMomentsRepository.create(obj);
  }

  //Convert data force sensor b64 to chart
  @authenticate('jwt')
  @post("/convert-force")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async convertForce(): Promise<{}> {
    let b64 =
      "2rIMs5y0MrUAtZy0ErJKseCx2rLasqKzZLVktTK1nLQ+s0qx4LF2shKyorNkte63orOctNqy5rDgsRKyErI+s/q1ZLUytWq0nLTmsBKy2rLasqKzWLdqtJy0orM+s+aw4LHasnaytLB8seCxOLSctNqyrrEMsxKyqLJetmS1nLSctJy0orPgseCx2rJ2sqKzMrUytWS1arSis3yxgrDasqiyorOWtWS1MrWctKKz4LF8saKzqLKiszK1MrVktXayBrQSsnyxdrIMs6KzMrUytZy0OLQ+s3yx4LEMsxKy2rKis5y0DLM4tAyz4LHgsdqy2rKiszK1MrUytTK1orPgsa6x2rJ2sqKzMrWWtaKznLR8sRKy4LHasqiyorOWtTK1ALU4tAyz5rASsqKz2rKiszK1ZLWctGS1PrNKsUqx2rKosj6zMrVktZy0nLQ+s+CxSrGctNqyorNktTK1nLQAtT6z5rC0sNqy2rLasjK1BrSctJy0PrNKsUqx2rISsqKzZLX6tV62nLQ4tK6xSrEMs9qyorMytfq1MrV8sYivaKwqriSvJK8esOCx4LG0sOaw7K/GrTCt7K+Ir1Cw5rASskqx5rBQsPKuxq2Ir/Ku7K98seawfLHmsB6wxq0qroivJK/sr3yxrrFKsXyx5rD+rMat7K8kr1CwErLgsUqx5rCIr/6s/qyIr/KuSrHgsaiytLB8seyvxq3+rOyvJK8esKKzdrJKseyvSrFirf6siK98sR6wfLGosnyx5rDsr2isMK2Ir1yuuq98sa6x5rDmsIivaKxorI6u/qwesHyxfLG0sOawiK9orGKtJK98sdqyALUytdqyOLTaskqxrrEMs3ayPrOctJy0arQytdqy5rB8sdqy4LGiszK1+rVqtAa0orN8sa6x2rKosj6zMrUytT6zorMMs3yxfLGosnayorMAtV62nLSctKKz5rB8sfKu8q7asji0nLQAtZy02rJ8sRKy2rISsqKzMrVetqKzorM+s3yxSrHastqyOLRktZa1ALWctKKz5rDgsdqy2rKis2S1arQMs5y0DLNKsXyx2rKosqKzALVktWq0BrTasoKw5rCosuCxorNktaKznLSctKKz5rCusdqyrrEGtJy0MrWctKKzorOusUqx2rLgsaiyMrWctGq0orM+s0qxSrF2stqyorP6tQC1orOctAyz5rB8sdqy2rI+s5y0+rWctKKzDLN8seCxErKosj6zarQytaKzorMMs1Cw5rCosnayorOctGS1orM4tBKy5rC0sNqy4LHasjK1MrUGtGq0DLOCsHyxdrISsqKzALWctAa0nLSisz6zSrHasnyxorMAtQC1OLSiswyz5rC0sBKy2rLasnyxfLG0sEqxiK/+rCquJK9cruyv4LHgsbSwHrAkr/6sjq4kr/Kuuq98seCxHrB8sSSvaKxorPKu8q7sr+CxJK8esFyu7K9uq/6sxq3yroivfLHgsR6wHrAkr8ys/qzyrsatiK/msK6xHrBQsKKztLDmsNqyqLLaspy0MrWctJy02rIesOawqLLastqyarT6tWq0orMGtHyxfLHasqKzorOctGS1PrOis6iyULAesBKyrrHasji0nLTasga0ErK0sOawErJ8saiyOLT0tqKzPrPash6wULDgsUqx4LGctGq0OLQMs+Cx5rBQsOCxorPasqKzMrU+sz6zErJQsLSw4LESsqiyorOctNqy2rKisx6wHrASsnayErI+szi02rKis3yxJK+6r+CxfLHgsZy0orPasj6ziK82rPKu4LGusRKyarSctHay2rKosrSwtLDgseCx2rJqtAC1DLMMs3aygrC0sHayfLHasji0nLTasqKzqLIesIKw2rLgsdqynLRqtNqyorPaslCwULDastqyDLMytZy0orM4tAyz5rAesNqyErLaspy0orMSsqiyqLK0sOawErJ2stqyMrVktWS1arTasuCx4LE+sz6z2rIytSy2nLQGtKKzErLmsAa0PrOctF62WLcytWS1ALXasj6zarSisyy2WLdYt5a1WLfItaKzorNktTK1yLWEuFK4vLe8t/q1nLSctJa1yLW8t4S46LhSuIS4WLeWtZa1vLe8t3653LqEuBq5GrmEuCy29LbiueK5qrrQvDq81ruku6S74rkUuta71rv8vWC+Wr8uvsS+yr06vNC8FLrcujq8SMJIwkjCQsNIwiLAgMEKxNLE/sVixlDJVsjmyezIXMdKytrL2suWzrzQftJ+0n7SRtN+0kbTntVg1yLZQtwE3tLdMN8w3wTezN7m4trkZOdS6tzsDu0I7pjvpO387+TzEPUw+Lr6cP5w/voA9AGKAkwENAgoCuQMaBCIE1AUrhUYFa4VOBhYG7wbQB+YISIkhiTkJawm5CV0JzAqjiuCLT4wADIGMZYyyDLUMJYyijS8NBQ3bDk0Omw5/DpsOQ44cjg0OgI6LjscPk4+Ij0cPow8NDpmOsQ7xDsiPU4+gD7wPPY7LjukOHI4bDncNzQ6bDmeOX42TDa8NNQwojCiMHYvEi98LuwsxirSKE4lmCE6IDogTB0aHYQcWBsMF3YW+BF0DuQMhgtaCtAHOgcgA6L+OP8e+zb3dPWA88Tw/O8C7xTsyOdw5YLiBN6s2xbbjNjK1mbW0NVS0V7P2stQyfjGMMZuxArEpsPkwVq/NL2kuyC4vLfut1i3wrZYtyy2ALUAtdqyErJ8sdqydrKis5y0ZLWis6Kz2rJ8seCxErLgsdqyarQAtaiyarTasuCx4LHasnayorOctAC1nLQGtD6ziK+is9qy2rJqtDi0OLR2smq0orPgsXay2rLasqKzorM4tKKzorPastqy4LGoshKyPrMGtJy0BrQMs9qyErKusXay2rI+s6KzorOiswa0orN2shKyHrDastqy5rAGtAa0orOis3aytLDashKy2rKiswC1DLMGtNqy4LHgsRKy4LHasl62ZLX6tQyz2rJQsLSwdrJ8sa6xarSctD6zorOusaCraKz+rIKworMytTK1PrPash6wiK+0sHyxPrM4tKKzMrUyteCx5rC6r+CxfLESsmq0nLRqtJy0SrFQsB6w5rASstqyBrSctGS1arTaslCwULCCsK6xfLGis5y0MrXastqy5rCIr4iviK92sqKzALVktQC12rLmsB6w2rJKsaiyBrSctDK1nLTasrSwHrDgsa6xDLOis5y0MrWctKiy5rAesIKwSrESspy0ALU+sz6zqLKoskqx4LGusdqyPrOis5y0arQAtRKyrrHashKy4LEAtcK2BrTgsdqySrFKsRKyrrGosgyzorM4tD6zDLPmsLqv7K9KsaiyDLOctAC1arQSsoKw8q6CsOaw4LEMswC1MrWis9qygrBcrh6wtLDastqyOLQAtT6z2rIesOyvHrAesPKu7K+is5y0OLR2srSwiK+osuaw4LEMszi0nLQ4tAyz5rDmsK6xrrGosuCxorOctAa0nLQSsnyxfLF2stqyErKis2q0orPasnyxSrGusXayqLKiszi0arQ4tNqyMrXmsBKygrDasqKzorOctKKzDLOusRKyErISstqyorOis5y0nLSis+CxfLESstqy2rIGtCy2MrVqtKKzSrGusa6xdrI+s9qynLQAtZy0PrMSsuCxErJ2sgyzPrNktZy0PrOis3ayrrHgsaiyorOiszK1orOis6KzqLKusRKydrLasqKzOLSis6KzPrMytZy0SrHastqyorMytTK1BrQ+s6iyrrF2suCx2rI+s6KzBrQ4tAyzdrKuseCxdrLasgyzorMGtBKyPrMSsq6xErJ2stqyorMGtFCw5rCIr+CxdrISshKy2rLasqKzOLSis9qyErJ8sRKyqLLasqKzOLSctDi02rLasuawfLF2stqy2rKis6KzorPasq6xSrESsq6x2rLasqKzorOis6iyqLJ8seawrrHasqKz2rKctKKz4LGCsLSw5rB8sZy0DLOiswa02rLasq6x5rBKseCxrrESsqKzorMSsh6wfLHmsOCxiK8Ssj6zDLOis5y02rK0sOyvULAesOCxorOis2S1OLTasoKwgrAesNqyErKis5y0orOctNqyfLESskqxSrGosj6zorMGtKKz2rJKsUqxULASsnayorOiszK1arTasuCxtLCis3yx2rI4tKKzorM+swyzErJ8sXyxdrLasj6zorOis+Cx2rISsnyxqLISsuCxorNqtKKzPrOosq6x/qwwrRKy2rKis6KznLSis3ayErISshKy4LESsji0nLRqtKKzDLMSsuCxdrKctKiyorM+s5y0PrMMs6iydrJ2skqx2rLasqKznLSiswyzErJ2sq6xdrIMs6KznLSis6Kz4LF2shKydrKostqyPrM4tDi0lrU4tOCxfLESshKy4LE+s6KzorMGtNqyErLashKyqLLasqKzorNqtKKzDLN2shKy";
    var data = Buffer.from(b64, "base64");
    console.log(convertForce(data));
    return {};
  }

  //Convert data imu sensor b64 to chart
  @authenticate('jwt')
  @post("/convert-imu")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async convertIMU(): Promise<{}> {
    let b64 =
      "2rIMs5y0MrUAtZy0ErJKseCx2rLasqKzZLVktTK1nLQ+s0qx4LF2shKyorNkte63orOctNqy5rDgsRKyErI+s/q1ZLUytWq0nLTmsBKy2rLasqKzWLdqtJy0orM+s+aw4LHasnaytLB8seCxOLSctNqyrrEMsxKyqLJetmS1nLSctJy0orPgseCx2rJ2sqKzMrUytWS1arSis3yxgrDasqiyorOWtWS1MrWctKKz4LF8saKzqLKiszK1MrVktXayBrQSsnyxdrIMs6KzMrUytZy0OLQ+s3yx4LEMsxKy2rKis5y0DLM4tAyz4LHgsdqy2rKiszK1MrUytTK1orPgsa6x2rJ2sqKzMrWWtaKznLR8sRKy4LHasqiyorOWtTK1ALU4tAyz5rASsqKz2rKiszK1ZLWctGS1PrNKsUqx2rKosj6zMrVktZy0nLQ+s+CxSrGctNqyorNktTK1nLQAtT6z5rC0sNqy2rLasjK1BrSctJy0PrNKsUqx2rISsqKzZLX6tV62nLQ4tK6xSrEMs9qyorMytfq1MrV8sYivaKwqriSvJK8esOCx4LG0sOaw7K/GrTCt7K+Ir1Cw5rASskqx5rBQsPKuxq2Ir/Ku7K98seawfLHmsB6wxq0qroivJK/sr3yxrrFKsXyx5rD+rMat7K8kr1CwErLgsUqx5rCIr/6s/qyIr/KuSrHgsaiytLB8seyvxq3+rOyvJK8esKKzdrJKseyvSrFirf6siK98sR6wfLGosnyx5rDsr2isMK2Ir1yuuq98sa6x5rDmsIivaKxorI6u/qwesHyxfLG0sOawiK9orGKtJK98sdqyALUytdqyOLTaskqxrrEMs3ayPrOctJy0arQytdqy5rB8sdqy4LGiszK1+rVqtAa0orN8sa6x2rKosj6zMrUytT6zorMMs3yxfLGosnayorMAtV62nLSctKKz5rB8sfKu8q7asji0nLQAtZy02rJ8sRKy2rISsqKzMrVetqKzorM+s3yxSrHastqyOLRktZa1ALWctKKz5rDgsdqy2rKis2S1arQMs5y0DLNKsXyx2rKosqKzALVktWq0BrTasoKw5rCosuCxorNktaKznLSctKKz5rCusdqyrrEGtJy0MrWctKKzorOusUqx2rLgsaiyMrWctGq0orM+s0qxSrF2stqyorP6tQC1orOctAyz5rB8sdqy2rI+s5y0+rWctKKzDLN8seCxErKosj6zarQytaKzorMMs1Cw5rCosnayorOctGS1orM4tBKy5rC0sNqy4LHasjK1MrUGtGq0DLOCsHyxdrISsqKzALWctAa0nLSisz6zSrHasnyxorMAtQC1OLSiswyz5rC0sBKy2rLasnyxfLG0sEqxiK/+rCquJK9cruyv4LHgsbSwHrAkr/6sjq4kr/Kuuq98seCxHrB8sSSvaKxorPKu8q7sr+CxJK8esFyu7K9uq/6sxq3yroivfLHgsR6wHrAkr8ys/qzyrsatiK/msK6xHrBQsKKztLDmsNqyqLLaspy0MrWctJy02rIesOawqLLastqyarT6tWq0orMGtHyxfLHasqKzorOctGS1PrOis6iyULAesBKyrrHasji0nLTasga0ErK0sOawErJ8saiyOLT0tqKzPrPash6wULDgsUqx4LGctGq0OLQMs+Cx5rBQsOCxorPasqKzMrU+sz6zErJQsLSw4LESsqiyorOctNqy2rKisx6wHrASsnayErI+szi02rKis3yxJK+6r+CxfLHgsZy0orPasj6ziK82rPKu4LGusRKyarSctHay2rKosrSwtLDgseCx2rJqtAC1DLMMs3aygrC0sHayfLHasji0nLTasqKzqLIesIKw2rLgsdqynLRqtNqyorPaslCwULDastqyDLMytZy0orM4tAyz5rAesNqyErLaspy0orMSsqiyqLK0sOawErJ2stqyMrVktWS1arTasuCx4LE+sz6z2rIytSy2nLQGtKKzErLmsAa0PrOctF62WLcytWS1ALXasj6zarSisyy2WLdYt5a1WLfItaKzorNktTK1yLWEuFK4vLe8t/q1nLSctJa1yLW8t4S46LhSuIS4WLeWtZa1vLe8t3653LqEuBq5GrmEuCy29LbiueK5qrrQvDq81ruku6S74rkUuta71rv8vWC+Wr8uvsS+yr06vNC8FLrcujq8SMJIwkjCQsNIwiLAgMEKxNLE/sVixlDJVsjmyezIXMdKytrL2suWzrzQftJ+0n7SRtN+0kbTntVg1yLZQtwE3tLdMN8w3wTezN7m4trkZOdS6tzsDu0I7pjvpO387+TzEPUw+Lr6cP5w/voA9AGKAkwENAgoCuQMaBCIE1AUrhUYFa4VOBhYG7wbQB+YISIkhiTkJawm5CV0JzAqjiuCLT4wADIGMZYyyDLUMJYyijS8NBQ3bDk0Omw5/DpsOQ44cjg0OgI6LjscPk4+Ij0cPow8NDpmOsQ7xDsiPU4+gD7wPPY7LjukOHI4bDncNzQ6bDmeOX42TDa8NNQwojCiMHYvEi98LuwsxirSKE4lmCE6IDogTB0aHYQcWBsMF3YW+BF0DuQMhgtaCtAHOgcgA6L+OP8e+zb3dPWA88Tw/O8C7xTsyOdw5YLiBN6s2xbbjNjK1mbW0NVS0V7P2stQyfjGMMZuxArEpsPkwVq/NL2kuyC4vLfut1i3wrZYtyy2ALUAtdqyErJ8sdqydrKis5y0ZLWis6Kz2rJ8seCxErLgsdqyarQAtaiyarTasuCx4LHasnayorOctAC1nLQGtD6ziK+is9qy2rJqtDi0OLR2smq0orPgsXay2rLasqKzorM4tKKzorPastqy4LGoshKyPrMGtJy0BrQMs9qyErKusXay2rI+s6KzorOiswa0orN2shKyHrDastqy5rAGtAa0orOis3aytLDashKy2rKiswC1DLMGtNqy4LHgsRKy4LHasl62ZLX6tQyz2rJQsLSwdrJ8sa6xarSctD6zorOusaCraKz+rIKworMytTK1PrPash6wiK+0sHyxPrM4tKKzMrUyteCx5rC6r+CxfLESsmq0nLRqtJy0SrFQsB6w5rASstqyBrSctGS1arTaslCwULCCsK6xfLGis5y0MrXastqy5rCIr4iviK92sqKzALVktQC12rLmsB6w2rJKsaiyBrSctDK1nLTasrSwHrDgsa6xDLOis5y0MrWctKiy5rAesIKwSrESspy0ALU+sz6zqLKoskqx4LGusdqyPrOis5y0arQAtRKyrrHashKy4LEAtcK2BrTgsdqySrFKsRKyrrGosgyzorM4tD6zDLPmsLqv7K9KsaiyDLOctAC1arQSsoKw8q6CsOaw4LEMswC1MrWis9qygrBcrh6wtLDastqyOLQAtT6z2rIesOyvHrAesPKu7K+is5y0OLR2srSwiK+osuaw4LEMszi0nLQ4tAyz5rDmsK6xrrGosuCxorOctAa0nLQSsnyxfLF2stqyErKis2q0orPasnyxSrGusXayqLKiszi0arQ4tNqyMrXmsBKygrDasqKzorOctKKzDLOusRKyErISstqyorOis5y0nLSis+CxfLESstqy2rIGtCy2MrVqtKKzSrGusa6xdrI+s9qynLQAtZy0PrMSsuCxErJ2sgyzPrNktZy0PrOis3ayrrHgsaiyorOiszK1orOis6KzqLKusRKydrLasqKzOLSis6KzPrMytZy0SrHastqyorMytTK1BrQ+s6iyrrF2suCx2rI+s6KzBrQ4tAyzdrKuseCxdrLasgyzorMGtBKyPrMSsq6xErJ2stqyorMGtFCw5rCIr+CxdrISshKy2rLasqKzOLSis9qyErJ8sRKyqLLasqKzOLSctDi02rLasuawfLF2stqy2rKis6KzorPasq6xSrESsq6x2rLasqKzorOis6iyqLJ8seawrrHasqKz2rKctKKz4LGCsLSw5rB8sZy0DLOiswa02rLasq6x5rBKseCxrrESsqKzorMSsh6wfLHmsOCxiK8Ssj6zDLOis5y02rK0sOyvULAesOCxorOis2S1OLTasoKwgrAesNqyErKis5y0orOctNqyfLESskqxSrGosj6zorMGtKKz2rJKsUqxULASsnayorOiszK1arTasuCxtLCis3yx2rI4tKKzorM+swyzErJ8sXyxdrLasj6zorOis+Cx2rISsnyxqLISsuCxorNqtKKzPrOosq6x/qwwrRKy2rKis6KznLSis3ayErISshKy4LESsji0nLRqtKKzDLMSsuCxdrKctKiyorM+s5y0PrMMs6iydrJ2skqx2rLasqKznLSiswyzErJ2sq6xdrIMs6KznLSis6Kz4LF2shKydrKostqyPrM4tDi0lrU4tOCxfLESshKy4LE+s6KzorMGtNqyErLashKyqLLasqKzorNqtKKzDLN2shKy";
    var data = Buffer.from(b64, "base64");
    console.log(convertIMU(data));
    return {};
  }

  //Convert b64 to array (force, imu)
  @authenticate('jwt')
  @post("/convert-force-imu")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getForceIMUData(@requestBody() body: any): Promise<{}> {
    let response: any = [];
    // if(!body.macAddress) return {error: 'macAddress not null'}

    // let res = await this.drinkMomentsRepository.findOne({where: {boxId: body.macAddress}, order: ['createdDate DESC']});
    let res = await this.drinkMomentsRepository.findById(body.id);
    if (res) {
      let dataIMU: any, dataForce: any;

      if (res.imu) {
        dataIMU = Buffer.from(res.imu, "base64");
        dataIMU = convertIMU(dataIMU);
      }

      if (res.force) {
        dataForce = Buffer.from(res.force, "base64");
        dataForce = convertForce(dataForce);
      }

      response.push({ imu: dataIMU }, { force: dataForce });
    }
    return response;
  }

  //Get data of macAddress
  @authenticate('jwt')
  @get("/get-info-device")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getDeviceInfo(
    @param.query.string("macAddress") macAddress: string
  ): Promise<any> {
    if (!macAddress || macAddress === "")
      return { error: "macAddress not null" };
    let res = await this.drinkMomentsRepository.findOne({
      where: { boxId: macAddress },
    });
    let data: any;
    data = res;
    data.imageB64 = "";
    data.imu = "";
    data.force = "";
    return data;
  }
}

//This is a JavaScript function that appears to be converting some data stored in a base64 encoded string, b64, into an array of data points.
function convertIMU(b64: any) {
  var data = b64;
  var data_points = [];
  //The idx_name_dict object is a dictionary that maps indices to names for the data in b64.
  var idx_name_dict: any = {
    0: "gyro_x",
    2: "gyro_y",
    4: "gyro_z",
    6: "acc_x",
    8: "acc_y",
    10: "acc_z",
  };

  //The outer for loop iterates over b64 in increments of 12, and the inner for loop iterates over each increment in increments of 2. At each iteration, the value of b64 at the current index is read as a little-endian 16-bit integer using the readInt16LE() method, and this value is added to an array called pointArr.
  for (var i = 0; i < data.length; i += 12) {
    var pointArr: any = [];
    for (var j = 0; j < 12; j += 2) {
      var idx_start = i + j;
      var v = data.readInt16LE(idx_start);
      pointArr.push(v);
    }
    data_points.push(pointArr);
  }
  //After both loops have completed, pointArr is added to an array called data_points and the function returns this array.
  return data_points;
}

function convertForce(b64: any) {
  var data = b64;
  var data_points = [];
  var idx_name_dict: any = {
    0: "values",
  };
  // console.log("[");
  for (var i = 0; i < data.length; i += 2) {
    var point: any = {};
    var pointArr: any = [];
    for (var j = 0; j < 2; j += 2) {
      var idx = i + j;
      var v = data.readInt16LE(idx);
      pointArr.push(i, v);
    }
    data_points.push(pointArr);
    // var val = JSON.stringify(pointArr);
    // val = val.replace("'", '"');
    // console.log(val + ",");
  }
  
  // var arrMean: any = [];
  // for (const iterator of data_points) {
  //   arrMean.push(iterator[1]);
  // }

  // var meanFilter = mean_filter(arrMean);

  // var medianFilter = median_filter(meanFilter);

  // let data_smooth_deri: number[] = medianFilter
  //   .slice(1)
  //   .map((x, i) => x - medianFilter[i]);

  return data_points;
}

// function mean(arr: number[]) {
//   let total = 0;
//   for (let i = 0; i < arr.length; i++) {
//     total += arr[i];
//   }
//   return total / arr.length;
// }

// function median(arr: number[]) {
//   const { length } = arr;

//   arr.sort((a, b) => a - b);

//   if (length % 2 === 0) {
//     return (arr[length / 2 - 1] + arr[length / 2]) / 2;
//   }

//   return arr[(length - 1) / 2];
// }

// function mean_filter(data: number[], n: number = 3): number[] {
//   let result: number[] = [];
//   for (let i = 0; i < data.length; i++) {
//     result.push(mean(data.slice(i, i + n)));
//   }
//   return result;
// }

// function median_filter(data: number[], n: number = 11): number[] {
//   let result: number[] = [];
//   for (let i = 0; i < data.length; i++) {
//     result.push(median(data.slice(i, i + n)));
//   }
//   return result;
// }

// function predict(path: string): string {
//   let data_median: number[] = median_filter(data_points, 11);
//   let data_median_mean: number[] = mean_filter(data_median, 3);
//   let data_smooth_deri: number[] = data_median_mean
//     .slice(1)
//     .map((x, i) => x - data_median_mean[i]);

//   return Math.min(data_smooth_deri) < -900 ? "normal" : "fraud";
// }
