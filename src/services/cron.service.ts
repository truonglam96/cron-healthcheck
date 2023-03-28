import { injectable, /* inject, */ BindingScope, inject } from "@loopback/core";
import { CronJob, cronJob } from "@loopback/cron";
import { repository, Where } from '@loopback/repository';
import { stringify } from 'querystring';
// import { certificateinfos } from '../models';
import { ConfigurationsRepository } from '../repositories';
import { Convertdata2JsonService } from "./convertdata-2-json.service";
import { GoogleapisService } from "./googleapis.service";
import { TelegramService } from "./telegram.service";

let flagUpdated = false;
let nameFile: any;
let debug = true;
@cronJob()
export class CronService extends CronJob {
  constructor(
    @inject("services.TelegramService")
    private telegramService: TelegramService,
    @inject("services.GoogleapisService")
    private googleapisService: GoogleapisService,
    @inject("services.Convertdata2JsonService")
    private convertdata2JsonService: Convertdata2JsonService,
    @repository(ConfigurationsRepository)
    public configurationsRepository: ConfigurationsRepository,
  ) {
    super({
      name: "Process backup and update week number !!!",
      onTick: async () => {
        console.log(
          "Cron is running..." +
            (await this.formatDate(new Date(await this.timeFormat(7))))
        );
        // this.runningProcess();
        this.runScript();
        // if(debug){
        //   debug = false;
        //   this.runScript();
        // }
      },
        // cronTime: '*/1 * * * * *',  //every 1s
      cronTime: "*/2 * * * * ", // every 2 minutes
      start: true, // Chạy ngay lập tức
      onComplete: async () => {
        this.telegramService.sendMessageToChannel(
          "Service cronjob is STOPED !!!" +
            await this.formatDate(new Date(await this.timeFormat(7)))
        );
        console.log(this.name + " Stop");
      },
    });
  }

  async runningProcess() {
    try {
      var axios = require("axios");

      var config = {
        method: "get",
        url: "http://35.240.171.212:3000/ping",
        headers: {},
      };

      axios(config)
        .then(function (response: any) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error: any) {
          console.log(error);
        });
    } catch (error) {
      this.telegramService.sendMessageToChannel(
        "Exception in Cron-Check-Process: \n{\n\t\t\tname: " +
          error.name +
          ", \n\t\t\terror: " +
          error.message +
          ", \n\t\t\tdate: " +
          await this.formatDate(new Date(await this.timeFormat(7))) +
          "\n}"
      );
    }
  }

  async runScript(){
    let isUpdateWeek = await this.timeStartUpdateWeek();
    if(isUpdateWeek){
      this.backupStart();
    }

    let isBackupDB = await this.timeStartBackupDB();
    if(isBackupDB){
      this.setWeekProd();
    }
  }

  async stringToDate(dateString: any) {
    return new Date(dateString);
  }

  async backupStart() {
    try {
      let currentDate =
        new Date().getFullYear() +
        "-" +
        ((new Date().getMonth() + 1).toString().length == 1
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth()) +
        "-" +
        (new Date().getDate().toString().length == 1
          ? "0" + new Date().getDate()
          : new Date().getDate()) +
        "T00:00:00.000+00:00";
      let file = await this.convertdata2JsonService.convertData2Json(
        currentDate,
        ''
      );
      this.googleapisService.uploadFile(file.path);
      // this.googleapisService.uploadFile('D:/Github/cron-healthcheck/src/temple_folder/backup_mongodb/Backup_28032023230259.zip');
      this.telegramService.sendMessageToChannel(
        "Backup mongoDB today completed 🎉🎉🎉 \n{\n\t\t\tfilename: " +
          file.path +
          ",\n\t\t\tdate: " +
          await this.formatDate(new Date(await this.timeFormat(7))) +
          "\n}"
      );
      flagUpdated = true;
    } catch (error) {
      this.telegramService.sendMessageToChannel(
        "Exception in Backup mongoDB: \n{\n\t\t\tname: " +
          error.name +
          ", \n\t\t\terror: " +
          error.message +
          ", \n\t\t\tdate: " +
          (await this.formatDate(new Date(await this.timeFormat(7)))) +
          "\n}"
      );
    }
  }

  async setWeekProd() {
    try {
      let info: any = await this.configurationsRepository.findOne();
      let productionCode = info.efuseConfig.productionCode.substr(0, 6);
      let time = await this.getWeekNumber(new Date(await this.timeFormat(7)));
      let code = productionCode + time[1];
      //Update
      this.configurationsRepository
        .updateById(info?._id, {
          //@ts-ignore
          "efuseConfig.productionCode": code,
        })
        .then(() => {
          this.telegramService.sendMessageToChannel(
            "Update week number success, from " +
              info.efuseConfig.productionCode +
              " to " +
              code
          );
        });
    } catch (error) {
      let b = await this.telegramService.sendMessageToChannel(
        "Exception in Update week number: \n{\n\t\t\tname: " +
          error.name +
          ", \n\t\t\terror: " +
          error.message +
          ", \n\t\t\tdate: " +
          this.formatDate(new Date(await this.timeFormat(7))) +
          "\n}"
      );
      console.log(b);
    }
  }

  async getWeekNumber(d: any) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    let weekNo: any = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
  }

  async timeFormat(num: any) {
    return new Date().setHours(new Date().getHours() + num);
  }

  async timeStartUpdateWeek() {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(await this.timeFormat(7));
    let day = weekday[d.getDay()];
    let hours = d.getHours();
    let minutes = d.getMinutes();
    if (day == "Monday" && hours == 0 && minutes >= 0 && minutes <= 5) {
      return true;
    } else {
      return false;
    }
  }

  async timeStartBackupDB() {
    // const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date(await this.timeFormat(7));
    // let day = weekday[d.getDay()];
    let hours = d.getHours();
    let minutes = d.getMinutes();

    if ((hours == 23 && minutes > 2 && minutes < 8)||(hours == 12 && minutes > 2 && minutes < 8)) {
      flagUpdated = false;
    }
    if ((hours == 23 && minutes >= 0 && minutes <= 2)||(hours == 12 && minutes >= 0 && minutes <= 2)) {
      return true;
    } else {
      return false;
    }
  }

  async formatDate(date: any) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
}
