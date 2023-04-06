import { inject } from "@loopback/core";
import { repository } from "@loopback/repository";
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
  param,
} from "@loopback/rest";
import { query } from "express";
import { DrinkMomentsRepository } from "../repositories";
import { ElasticService } from "../services";

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: "Ping Response",
  content: {
    "application/json": {
      schema: {
        type: "object",
        title: "PingResponse",
        properties: {
          greeting: { type: "string" },
          date: { type: "string" },
          url: { type: "string" },
          headers: {
            type: "object",
            properties: {
              "Content-Type": { type: "string" },
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
    @repository(DrinkMomentsRepository)
    public DrinkMomentsRepository: DrinkMomentsRepository,
    @inject("services.ElasticService") protected elastic: ElasticService,
    @inject(RestBindings.Http.REQUEST) private req: Request
  ) {}

  // Map to `GET /ping`
  @get("/ping")
  @response(200, PING_RESPONSE)
  async ping(): Promise<object> {
    // Reply with a greeting, the current time, the url, and request headers

    var fs = require("fs");
    // // READ CSV INTO STRING

    // var data = fs.readFileSync("D:/Download/URL.csv").toLocaleString();
    // const csv = require("csv-parser");

    // async function readCsvFile(filePath: any) {
    //   const results: any = [];

    //   return new Promise((resolve, reject) => {
    //     fs.createReadStream(filePath)
    //       .pipe(csv())
    //       .on("data", (data: any) => results.push(data))
    //       .on("end", () => resolve(results))
    //       .on("error", (error: any) => reject(error));
    //   });
    // }

    // let arr: any;
    // await readCsvFile("D:/Download/URL.csv")
    //   .then((data) => {
    //     // console.log(data);
    //     arr = data;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // const https = require("https");

    // function downloadFile(url: any, filePath: any) {
    //   const results: any = [];
    //   return new Promise<void>((resolve, reject) => {
    //     const file = fs.createWriteStream(filePath);
    //     https
    //       .get(url, (response: any) => {
    //         response.pipe(file);

    //         file.on("finish", () => {
    //           file.close();
    //           resolve();
    //         });
    //       })
    //       .on("data", (data: any) => results.push(data))
    //       .on("end", () => resolve(results))
    //       .on("error", (error: any) => {
    //         fs.unlink(filePath, () => {
    //           reject(error);
    //         });
    //       });
    //   });
    // }

    // for (const iterator of arr) {
    //   let url = iterator['ACC URL']
    //   let fileName = url.split('/')[url.split('/').length - 1].replace(/\:/gi, '_')
    //   await downloadFile(url, "D:/Download/BinaryFile/" + fileName)
    //   .then((data) => {
    //     console.log("File downloaded successfully!");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // }

    const path = require("path");

    function readFilesInFolder(folderPath: any) {
      return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (error: any, files: any) => {
          if (error) {
            reject(error);
            return;
          }

          const promises = files.map((file: any) => {
            return new Promise((resolve, reject) => {
              const filePath = path.join(folderPath, file);

              fs.readFile(filePath, "utf8", (error: any, data: any) => {
                if (error) {
                  reject(error);
                  return;
                }

                resolve(data);
              });
            });
          });

          Promise.all(promises)
            .then((fileContents) => {
              resolve(fileContents);
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    }

    let dataBinary: any;
    // await readFilesInFolder("D:/Download/BinaryFile/")
    //   .then((fileContents) => {
    //     // console.log(fileContents);
    //     dataBinary = fileContents;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    const files = fs.readdirSync("D:/Download/BinaryFile/");

    let dataConvert: any = [];
    for (const iterator of files) {
      // let aaaa = Buffer.from("wK6Ir/KuwK7yrvKuVq9Wr/it8q5Wr/Kuuq/yrsCuiK/yroivKq6Ir7qv7K/yruyvuq/sr8Cu7K/sr+yv7K/sr+yv7K/sr1Cw7K9QsPKuVq/sr+yvgrCCsIKw7K+CsOyvtLBQsIKwuq/sr+yvtLCCsOyvGLGCsGS1GLFKsUqxfLFKsXyxSrEYsUqxfLFKsXyxGLF8seCxRLJ2skSydrLastqyDLMMs3ayULCctGS1nLSctAC1ALVktci1Xrb6tfq1wrbUs4q3vLf6tV62FLpSuFK4hLjouLC54rlGuqq6qrpAu9a71rtsvAK9mL3Kvfy9vr/qwCLAhsCAwUjCSMKswmjFNsU2xTDGlMbMxZTGlMZcx47H+Mbyx/LHUMm0ybTJtMlKyuDKdst2y6LMPswGzWrNPswsz8LP9M+E0bzQftKq03LUpNRs1dDVYNf21yLZhtkc2tjcstqs2xDc2NzY3DzdPN2C4jbeNt6a3v7eMN8w3/7ezN6a3pTfKuCU3yrglN+O4FDiJOHs4R7iiOGC4nzjfOMS5BLkcOUS5ODj2uTa5AzlLOg+5Qzl2uRq5gzlcOXa5AbmBuYG5gbmauZq5mrmauZq5gbmBuYA5wbmBuZq5gbmBuYM5QbmPuUS5Hbkquxg8MLoEuQS5BLkduQS5Hzj4ON843zjfOMY4xjjUOJQ4oLiiOGI4RjjJOHy4FzgMN/+3tjcPN0Q3KzbgNoc2lTZ9tda2PbX/NZm1qTUeNN+0kzS6NG80PTP9M+Qz17PLM+WzmrNOM2izAzMDMwMzODKfMpKyhjKtMkeyYjIjseOx1bI+MaaxczFaMXSxDzEQsOswqzCgMHqwFTAVMD8vZi9Ar0CvaS7RrqquuK56LhSuLy3WLdetl62lrXUs8i1PrMMs9qydrLgsUqxGLHsr4Kw8q7Arvit+K0qrsatxq3+rPitaKxorASs0qvSq6CrPKsErDyrPKvSqzyrpqoKq26rPKvArtKrBKygq9KroKsErNKrPKvSq6CroKvSqwSsoKvSqzyr/qw8qzyrCqtIqbKojq7askippqrkqBapFqmmqkipeqlIqXqpSKn6taaqSKmyqEipSKnqp0ipeql6qbKoSKnkqHqpSKl2skipfLFIqdiqeqkKq9KrPKs8q26rHKjSq3qpCqs8q9KroKugqzyrCqugq6Cr0qvSq6Cr/qzSq6Cr0qvSq9KrPKvSq9KrPKtorNKroKvSq9KroKsKq9Kr0qugq9KrPKugqzyrPKugq9KroKvSq9KrCqtuq8atoKsErNKrbqugq9KrPKvSq9KrBKygq9KrPKv+rNKr0qs8q6CrPKvSq9Kr0qsKq6yppqqgq7KoSKlIqUipSKmyqEipeqkWqVqmSKkKqxapeqlIqUipeqlIqUipSKlIqWKteqkWqUipSKl6qRyo+K3kqHqpSKnSqwSs/qzSq9KrBKzSq9Kr0qvSq9Kr0qs8q9Kr0qsErNKr/qzSq9Kr0qvSq9Kr0qvSq9KrCqvSq6CrPKs8q6Cr0qugq/6sBKygq9KroKvSq9Kr0qvSq6Cr0qvSq9Kr7K/+rKCroKsKq9KroKvSq9KrPKumqtKroKvSqwSs0qsErNKr0qugq9KrSKk8qzyrBKygq/6soKvSq9Kr0qvSq9Kr2KrSq9Kr0qugqwSs0qugq9Kr0qvSq9Kr0qvSqzyroKvSqwSs0qvSq6Cr0qs8q6Cr0qsErNKr0qvSq9KrCqvSq9KroKs8q2isBKwErNKr0qvSq6Cr0qvSq9Kr0qvSq6Cr0qvSq6Cr0qvSqwqr0qugq9Kr0qsErKCr0qvSq9KrbqvSq9Kr/qx6qUipSKlIqUipSKlIqUipeqnkqBappqp6qUipeql6qTyrCqtIqUipSKmmqnqpWqZIqXqpFql6qUipSKlIqXqpSKmyqHqpdKpIqXqpSKnYqkipSKl6qUipSKlIqRapBKxapm6r2KpIqUip5Kh6qUipSKlEskipeql6qUipFqlIqSqu/qxIqUipeqlIqbKo5Kh6qVSngKjSq+qnsqimqv6ssqhIqUipFqmyqEipSKlIqUipSKlIqeSoSKl6qXqpSKlIqeSoCqtIqXSqSKlIqUipSKl6qTyrsqjkqHqpSKl6qUipSKlIqUipSKlIqWKteqlIqXqpdKqmqnqpsqiyqKaqSKl0qnqpFqlIqUippqrsr1qmSKl6qRapSKl6qUipSKkKq0ipSKl0qkipeqlIqXqpSKlIqXqpeql6qUip8KZIqXqpSKl6qaaqSKkKq0ipSKlIqUipeqlIqYKweqlIqUipeql6qUipdKqyqEipSKlIqUipSKlIqUipTqh6qUipSKl6qUipSKl0quSoeql6qUipeqmAqBCqeqlIqXqpSKlIqUipFqlIqRapSKlIqUipFqlIqUipSKkWqXqp", "base64");
      var data = fs.readFileSync("D:/Download/BinaryFile/"+iterator).toLocaleString();
      const base64Data = Buffer.from(data, 'binary').toString('base64');
      
      let res = await convertForce(base64Data);
      dataConvert.push(res);
      console.log(new Date().getTime());
    }

    console.log();

    function convertForce(b64: any) {
      var data = b64;
      var data_points = [];
      var idx_name_dict: any = {
        0: "values",
      };
      for (var i = 0; i < data.length; i += 2) {
        var point: any = {};
        var pointArr: any = [];
        for (var j = 0; j < 2; j += 2) {
          var idx = i + j;
          var v = data.readInt16LE(idx);
          pointArr.push(i, v);
        }
        data_points.push(pointArr);
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

    // const fs = require("fs");

    // let data: any = await this.DrinkMomentsRepository.find();

    // for (const iterator of data) {
    //   if(iterator.imageB64 != ""){
    //     try {
    //       var b64 = iterator.imageB64;
    //       const fs = require("fs");
    //       // var b64 = b64.replace(/^data:image\/png;base64,/, "");
    //       let pathFile = './public/image/' + iterator.boxId?.toString().replace(/:/gi, '_') + '_' + new Date().getTime() + '_' + iterator._id.toString() + '.jpg';
    //       fs.writeFile(
    //         pathFile,
    //         b64,
    //         "base64",
    //         function (err: any) {
    //           console.log(err);
    //         }
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }

    return {
      greeting: "Hello from LoopBack",
      // date: new Date(),
      // url: this.req.url,
      // headers: Object.assign({}, this.req.headers),
    };
  }
}
