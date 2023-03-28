import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { AutomaticDetailsRepository, AutomaticResultsRepository, ManualDetailsRepository, ManualResultsRepository, ConfigurationsRepository, CertificatesRepository } from '../repositories';

@injectable({ scope: BindingScope.TRANSIENT })
export class Convertdata2JsonService {
  constructor(
    @repository(AutomaticDetailsRepository)
    public automaticDetailsRepository: AutomaticDetailsRepository,

    @repository(AutomaticResultsRepository)
    public automaticResultsRepository: AutomaticResultsRepository,

    @repository(ManualDetailsRepository)
    public manualDetailsRepository: ManualDetailsRepository,

    @repository(ManualResultsRepository)
    public manualResultsRepository: ManualResultsRepository,

    @repository(ConfigurationsRepository)
    public configurationsRepository: ConfigurationsRepository,

    @repository(CertificatesRepository)
    public certificatesRepository: CertificatesRepository,
  ) { }

  async convertData2Json(currentDate: any, fileName: any) {
    let time = await this.formatDate(new Date(await this.timeFormat(7)));
    time = time.replace(/\//gi, '').replace(/, /gi, '').replace(/:/gi, '')

    // let currentDate = '2022-07-13T00:00:00.000+00:00';
    let q: any = [], w: any = [], e: any = [], r: any = [], t: any = [], y: any = [];

    //#endregion Get data from database
    //@ts-ignore
    q = await this.automaticDetailsRepository.find({ where: { createdDate: { gte: currentDate } } })
    if (q.length > 0) q.push({ filename: "AutomaticDetails" })

    //@ts-ignore
    w = await this.automaticResultsRepository.find({ where: { lastDate: { gte: currentDate } } })
    if (w.length > 0) w.push({ filename: "AutomaticResults" })

    //@ts-ignore
    e = await this.manualDetailsRepository.find({ where: { createdDate: { gte: currentDate } } })
    if (e.length > 0) e.push({ filename: "ManualDetails" })

    //@ts-ignore
    r = await this.manualResultsRepository.find({ where: { lastDate: { gte: currentDate } } })
    if (r.length > 0) r.push({ filename: "ManualResults" })

    //@ts-ignore
    t = await this.configurationsRepository.find({})
    if (t.length > 0) t.push({ filename: "Configurations" })

    //@ts-ignore
    y = await this.certificatesRepository.find({ where: { createdDate: { gte: currentDate } } })
    if (y.length > 0) y.push({ filename: "Certificates" })
    //#endregion Get data from database

    let arrJson = [q, w, e, r, t, y];
    let arrPath: string[] = [];

    const fs = require('fs');
    for (const iterator of arrJson) {
      try {
        //Save json to file
        if (iterator.length > 0) {
          let filename = iterator[iterator.length - 1].filename;
          let path = './src/temple_folder/backup_mongodb/' + filename + '_' + time + '.json';

          fs.writeFile(path, JSON.stringify(iterator), (err: any) => {
            if (err) throw err;
            console.log('Saved!', path);
          });
          arrPath.push(path);
        }
      } catch (error) {
        console.log(error);
        continue;
      }
    }

    //Compress folder to zip
    const archiver = require('archiver');
    const pathZip = './src/temple_folder/backup_mongodb/Backup_' + time + '.zip';
    const output = fs.createWriteStream(pathZip);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    await archive.pipe(output);
    for (const iterator of arrPath) {
      await archive.file(iterator, { name: iterator.split('/').pop() });
    }
    await archive.finalize();
    await output.on('close', () => {
      console.log('done');
      //Remove file after compress
      for (const iterator of arrPath) {
        fs.unlink(iterator, (err: any) => {
          if (err) throw err;
          console.log('File deleted!');
        });
      }
    });
    
    let pathq = __dirname.replace(/\\/gi, "/");
    let filePathZip = pathZip.replace("./", "/")
    let filePath = pathq.replace("/dist/services","") + filePathZip;

    return {
      path: filePath,
      status: true
    }
  }

  async replaceRegex(input: string, pattern: RegExp, replacement: string) {
    return input.replace(pattern, replacement);
  }

  async formatDate(date: any) {
    return new Date(date).toLocaleDateString('en-GB', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  async timeFormat(num: any) {
    return new Date().setHours(new Date().getHours() + num)
  }
}
