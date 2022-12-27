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
} from "@loopback/rest";

import { DrinkMoments } from "../models";
import { DrinkMomentsRepository } from "../repositories";

export class BackupMongodbController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private request: Request,
    @repository(DrinkMomentsRepository) private drinkMomentsRepository : DrinkMomentsRepository,
  ) {}
  
  //Receive payload from opener
  @post("/box_comming")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async create(@requestBody() body: any): Promise<{}> {
    console.log(body);
      let obj = new DrinkMoments();
      obj.firmware = body.firmware? body.firmware:'';
      obj.boxId = body.boxId? body.boxId:'';
      obj.deviceSerial = body.deviceSerial? body.deviceSerial:'';
      obj.battery = body.battery? body.battery:'';
      obj.count = body.count? body.count:'';
      obj.deviceTime = body.deviceTime? body.deviceTime:'';
      obj.totalAwakeTime = body.totalAwakeTime? body.totalAwakeTime:'';
      obj.restartCount = body.restartCount? body.restartCount:'';
      obj.connection = body.connection? body.connection:'';
      obj.wifiConnectStart = body.wifiConnectStart? body.wifiConnectStart:'';
      obj.wifiConnectDone = body.wifiConnectDone? body.wifiConnectDone:'';
      obj.rssi = body.rssi? body.rssi:'';
      obj.cameraWakeupCount = body.cameraWakeupCount? body.cameraWakeupCount:'';
      obj.imgType = body.imgType? body.imgType:'';
      obj.imageCaptureTime = body.imageCaptureTime? body.imageCaptureTime:'';
      obj.captureTimeRel = body.captureTimeRel? body.captureTimeRel:'';
      obj.successfulImageUploadCount = body.successfulImageUploadCount? body.successfulImageUploadCount:'';
      obj.serialNr = body.serialNr? body.serialNr:'';
      obj.uniqueID = body.uniqueID? body.uniqueID:'';
      obj.imagesRemaining = body.imagesRemaining? body.imagesRemaining:'';
      obj.imagesUploadedInCycle = body.imagesUploadedInCycle? body.imagesUploadedInCycle:'';
      obj.HPI = body.HPI? body.HPI:'';
      obj.temperature = body.temperature? body.temperature:'';
      obj.humidity = body.humidity? body.humidity:'';
      obj.remainingImgInfo = body.remainingImgInfo? body.remainingImgInfo:'';
      obj.imageB64 = body.imageB64? body.imageB64:'';
      obj.imu = body.imu? body.imu:'';
      obj.force = body.force? body.force:'';
      let aa = await this.drinkMomentsRepository.create(obj);


      if(obj.imageB64 != ""){
        try {
          var b64 = body.imageB64;
          const fs = require("fs");
          // var b64 = b64.replace(/^data:image\/png;base64,/, "");
          let pathFile = './public/image/' + obj.boxId?.toString().replace(/:/gi, '_') + '_' + new Date().getTime() + '.jpg';
          fs.writeFile(
            pathFile,
            b64,
            "base64",
            function (err: any) {
              console.log(err);
            }
          );
        } catch (error) {
          // console.log(error);
        }
      }
    
    return {
      brand: "test",
      doReset: false,
      doUpdate: false,
      fwUrl: "",
      image: "",
      result: "success",
      timeUTC: new Date().getTime(),
    };
  }

  //Create 1 data opener
  @post("/create-drink-moments")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async createDrinkMoments(
    @requestBody() body: any 
  ): Promise<{}> {
    let obj = new DrinkMoments();
    obj.firmware = body.firmware? body.firmware:'';
    obj.boxId = body.boxId? body.boxId:'';
    obj.deviceSerial = body.deviceSerial? body.deviceSerial:'';
    obj.battery = body.battery? body.battery:'';
    obj.count = body.count? body.count:'';
    obj.deviceTime = body.deviceTime? body.deviceTime:'';
    obj.totalAwakeTime = body.totalAwakeTime? body.totalAwakeTime:'';
    obj.restartCount = body.restartCount? body.restartCount:'';
    obj.connection = body.connection? body.connection:'';
    obj.wifiConnectStart = body.wifiConnectStart? body.wifiConnectStart:'';
    obj.wifiConnectDone = body.wifiConnectDone? body.wifiConnectDone:'';
    obj.rssi = body.rssi? body.rssi:'';
    obj.cameraWakeupCount = body.cameraWakeupCount? body.cameraWakeupCount:'';
    obj.imgType = body.imgType? body.imgType:'';
    obj.imageCaptureTime = body.imageCaptureTime? body.imageCaptureTime:'';
    obj.captureTimeRel = body.captureTimeRel? body.captureTimeRel:'';
    obj.successfulImageUploadCount = body.successfulImageUploadCount? body.successfulImageUploadCount:'';
    obj.serialNr = body.serialNr? body.serialNr:'';
    obj.uniqueID = body.uniqueID? body.uniqueID:'';
    obj.imagesRemaining = body.imagesRemaining? body.imagesRemaining:'';
    obj.imagesUploadedInCycle = body.imagesUploadedInCycle? body.imagesUploadedInCycle:'';
    obj.HPI = body.HPI? body.HPI:'';
    obj.temperature = body.temperature? body.temperature:'';
    obj.humidity = body.humidity? body.humidity:'';
    obj.remainingImgInfo = body.remainingImgInfo? body.remainingImgInfo:'';
    obj.imageB64 = body.imageB64? body.imageB64:'';
    obj.imu = body.imu? body.imu:'';
    obj.force = body.force? body.force:'';
    return this.drinkMomentsRepository.create(obj);
  }

  //Convert data force sensor b64 to chart
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
  @post("/convert-force-imu")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getForceIMUData(
    @requestBody() body: any 
  ): Promise<{}> {
    let response: any = [];
    if(!body.macAddress) return {error: 'macAddress not null'}

    let res = await this.drinkMomentsRepository.findOne({where: {boxId: body.macAddress}});
    if(res){
      let dataIMU: any, dataForce: any
      
      if(res.imu){
      dataIMU = Buffer.from(res.imu, "base64");
      dataIMU = convertIMU(dataIMU);
      }

      if(res.force){
        dataForce = Buffer.from(res.force, "base64");
        dataForce = convertForce(dataForce);
      }

      response.push({'imu' : dataIMU}, {'force': dataForce});
    }    
    return response;
  }

  //Get data of macAddress
  @get("/get-info-device")
  @response(200, {
    description: "Testing upload to server",
    content: { "application/json": { schema: {} } },
  })
  async getDeviceInfo(
    @param.query.string('macAddress') macAddress: string 
  ): Promise<any> {
    if(!macAddress || macAddress === "") return {error: 'macAddress not null'}
    let res = await this.drinkMomentsRepository.findOne({where: {boxId: macAddress}});
    let data: any;
    data = res;
    data.imageB64 = '';
    data.imu = '';
    data.force = '';
    return data;
  }
}

function convertIMU(b64: any) {
  var data = b64;
  var data_points = [];
  var idx_name_dict: any = {
    0: "gyro_x",
    2: "gyro_y",
    4: "gyro_z",
    6: "acc_x",
    8: "acc_y",
    10: "acc_z",
  };
  for (var i = 0; i < data.length; i += 12) {
    var pointArr: any = [];
    for (var j = 0; j < 12; j += 2) {
      var idx_start = i + j;
      var v = data.readInt16LE(idx_start);
      // let rangeName = {
      //   idx_name_dict[j] : v
      // }
      pointArr.push(v);
    }
    data_points.push(pointArr);
    // var val = JSON.stringify(pointArr);
    // val = val.replace("'", '"');
    // console.log(val + ",");
  }
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
  // console.log("]");
  return data_points;
}
