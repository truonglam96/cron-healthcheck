function convertIMU() {
  var fs = require("fs");
  var path = require("path");
  var idx_name_dict = {
    0: "gyro_x",
    2: "gyro_y",
    4: "gyro_z",
    6: "acc_x",
    8: "acc_y",
    10: "acc_z",
  };

  function extract_data(path) {
    var data = fs.readFileSync(path);
    var data_points = [];
    for (var i = 0; i < data.length; i += 10) {
      var point = {};
      for (var j = 0; j < 10; j += 2) {
        var idx_start = i + j;
        var idx_end = idx_start + 2;
        var v = data.readInt16LE(idx_start);
        point[idx_name_dict[j]] = v;
      }
      data_points.push(point);
    }
    return data_points;
  }

  function extract_data_to_csv(params) {
    var path_raw = params[0];
    var path_csv = params[1];
    var data = extract_data(path_raw);
    // fs.writeFileSync(path_csv, JSON.stringify(data));
    console.log("[");
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
      var item = data_1[_i];
      var val = JSON.stringify(item);
      val = val.replace("'", '"');
      console.log(val + ",");
    }
    console.log("]");
  }
  extract_data_to_csv([__dirname + "/force", __dirname + "/csv"]);
}

function convertForce() {
  var fs = require("fs");
  var path = require("path");
  var idx_name_dict = {
    0: "values",
  };
  function extract_data(path) {
    // var data = fs.readFileSync(path);
    let b64 =
      "2rIMs5y0MrUAtZy0ErJKseCx2rLasqKzZLVktTK1nLQ+s0qx4LF2shKyorNkte63orOctNqy5rDgsRKyErI+s/q1ZLUytWq0nLTmsBKy2rLasqKzWLdqtJy0orM+s+aw4LHasnaytLB8seCxOLSctNqyrrEMsxKyqLJetmS1nLSctJy0orPgseCx2rJ2sqKzMrUytWS1arSis3yxgrDasqiyorOWtWS1MrWctKKz4LF8saKzqLKiszK1MrVktXayBrQSsnyxdrIMs6KzMrUytZy0OLQ+s3yx4LEMsxKy2rKis5y0DLM4tAyz4LHgsdqy2rKiszK1MrUytTK1orPgsa6x2rJ2sqKzMrWWtaKznLR8sRKy4LHasqiyorOWtTK1ALU4tAyz5rASsqKz2rKiszK1ZLWctGS1PrNKsUqx2rKosj6zMrVktZy0nLQ+s+CxSrGctNqyorNktTK1nLQAtT6z5rC0sNqy2rLasjK1BrSctJy0PrNKsUqx2rISsqKzZLX6tV62nLQ4tK6xSrEMs9qyorMytfq1MrV8sYivaKwqriSvJK8esOCx4LG0sOaw7K/GrTCt7K+Ir1Cw5rASskqx5rBQsPKuxq2Ir/Ku7K98seawfLHmsB6wxq0qroivJK/sr3yxrrFKsXyx5rD+rMat7K8kr1CwErLgsUqx5rCIr/6s/qyIr/KuSrHgsaiytLB8seyvxq3+rOyvJK8esKKzdrJKseyvSrFirf6siK98sR6wfLGosnyx5rDsr2isMK2Ir1yuuq98sa6x5rDmsIivaKxorI6u/qwesHyxfLG0sOawiK9orGKtJK98sdqyALUytdqyOLTaskqxrrEMs3ayPrOctJy0arQytdqy5rB8sdqy4LGiszK1+rVqtAa0orN8sa6x2rKosj6zMrUytT6zorMMs3yxfLGosnayorMAtV62nLSctKKz5rB8sfKu8q7asji0nLQAtZy02rJ8sRKy2rISsqKzMrVetqKzorM+s3yxSrHastqyOLRktZa1ALWctKKz5rDgsdqy2rKis2S1arQMs5y0DLNKsXyx2rKosqKzALVktWq0BrTasoKw5rCosuCxorNktaKznLSctKKz5rCusdqyrrEGtJy0MrWctKKzorOusUqx2rLgsaiyMrWctGq0orM+s0qxSrF2stqyorP6tQC1orOctAyz5rB8sdqy2rI+s5y0+rWctKKzDLN8seCxErKosj6zarQytaKzorMMs1Cw5rCosnayorOctGS1orM4tBKy5rC0sNqy4LHasjK1MrUGtGq0DLOCsHyxdrISsqKzALWctAa0nLSisz6zSrHasnyxorMAtQC1OLSiswyz5rC0sBKy2rLasnyxfLG0sEqxiK/+rCquJK9cruyv4LHgsbSwHrAkr/6sjq4kr/Kuuq98seCxHrB8sSSvaKxorPKu8q7sr+CxJK8esFyu7K9uq/6sxq3yroivfLHgsR6wHrAkr8ys/qzyrsatiK/msK6xHrBQsKKztLDmsNqyqLLaspy0MrWctJy02rIesOawqLLastqyarT6tWq0orMGtHyxfLHasqKzorOctGS1PrOis6iyULAesBKyrrHasji0nLTasga0ErK0sOawErJ8saiyOLT0tqKzPrPash6wULDgsUqx4LGctGq0OLQMs+Cx5rBQsOCxorPasqKzMrU+sz6zErJQsLSw4LESsqiyorOctNqy2rKisx6wHrASsnayErI+szi02rKis3yxJK+6r+CxfLHgsZy0orPasj6ziK82rPKu4LGusRKyarSctHay2rKosrSwtLDgseCx2rJqtAC1DLMMs3aygrC0sHayfLHasji0nLTasqKzqLIesIKw2rLgsdqynLRqtNqyorPaslCwULDastqyDLMytZy0orM4tAyz5rAesNqyErLaspy0orMSsqiyqLK0sOawErJ2stqyMrVktWS1arTasuCx4LE+sz6z2rIytSy2nLQGtKKzErLmsAa0PrOctF62WLcytWS1ALXasj6zarSisyy2WLdYt5a1WLfItaKzorNktTK1yLWEuFK4vLe8t/q1nLSctJa1yLW8t4S46LhSuIS4WLeWtZa1vLe8t3653LqEuBq5GrmEuCy29LbiueK5qrrQvDq81ruku6S74rkUuta71rv8vWC+Wr8uvsS+yr06vNC8FLrcujq8SMJIwkjCQsNIwiLAgMEKxNLE/sVixlDJVsjmyezIXMdKytrL2suWzrzQftJ+0n7SRtN+0kbTntVg1yLZQtwE3tLdMN8w3wTezN7m4trkZOdS6tzsDu0I7pjvpO387+TzEPUw+Lr6cP5w/voA9AGKAkwENAgoCuQMaBCIE1AUrhUYFa4VOBhYG7wbQB+YISIkhiTkJawm5CV0JzAqjiuCLT4wADIGMZYyyDLUMJYyijS8NBQ3bDk0Omw5/DpsOQ44cjg0OgI6LjscPk4+Ij0cPow8NDpmOsQ7xDsiPU4+gD7wPPY7LjukOHI4bDncNzQ6bDmeOX42TDa8NNQwojCiMHYvEi98LuwsxirSKE4lmCE6IDogTB0aHYQcWBsMF3YW+BF0DuQMhgtaCtAHOgcgA6L+OP8e+zb3dPWA88Tw/O8C7xTsyOdw5YLiBN6s2xbbjNjK1mbW0NVS0V7P2stQyfjGMMZuxArEpsPkwVq/NL2kuyC4vLfut1i3wrZYtyy2ALUAtdqyErJ8sdqydrKis5y0ZLWis6Kz2rJ8seCxErLgsdqyarQAtaiyarTasuCx4LHasnayorOctAC1nLQGtD6ziK+is9qy2rJqtDi0OLR2smq0orPgsXay2rLasqKzorM4tKKzorPastqy4LGoshKyPrMGtJy0BrQMs9qyErKusXay2rI+s6KzorOiswa0orN2shKyHrDastqy5rAGtAa0orOis3aytLDashKy2rKiswC1DLMGtNqy4LHgsRKy4LHasl62ZLX6tQyz2rJQsLSwdrJ8sa6xarSctD6zorOusaCraKz+rIKworMytTK1PrPash6wiK+0sHyxPrM4tKKzMrUyteCx5rC6r+CxfLESsmq0nLRqtJy0SrFQsB6w5rASstqyBrSctGS1arTaslCwULCCsK6xfLGis5y0MrXastqy5rCIr4iviK92sqKzALVktQC12rLmsB6w2rJKsaiyBrSctDK1nLTasrSwHrDgsa6xDLOis5y0MrWctKiy5rAesIKwSrESspy0ALU+sz6zqLKoskqx4LGusdqyPrOis5y0arQAtRKyrrHashKy4LEAtcK2BrTgsdqySrFKsRKyrrGosgyzorM4tD6zDLPmsLqv7K9KsaiyDLOctAC1arQSsoKw8q6CsOaw4LEMswC1MrWis9qygrBcrh6wtLDastqyOLQAtT6z2rIesOyvHrAesPKu7K+is5y0OLR2srSwiK+osuaw4LEMszi0nLQ4tAyz5rDmsK6xrrGosuCxorOctAa0nLQSsnyxfLF2stqyErKis2q0orPasnyxSrGusXayqLKiszi0arQ4tNqyMrXmsBKygrDasqKzorOctKKzDLOusRKyErISstqyorOis5y0nLSis+CxfLESstqy2rIGtCy2MrVqtKKzSrGusa6xdrI+s9qynLQAtZy0PrMSsuCxErJ2sgyzPrNktZy0PrOis3ayrrHgsaiyorOiszK1orOis6KzqLKusRKydrLasqKzOLSis6KzPrMytZy0SrHastqyorMytTK1BrQ+s6iyrrF2suCx2rI+s6KzBrQ4tAyzdrKuseCxdrLasgyzorMGtBKyPrMSsq6xErJ2stqyorMGtFCw5rCIr+CxdrISshKy2rLasqKzOLSis9qyErJ8sRKyqLLasqKzOLSctDi02rLasuawfLF2stqy2rKis6KzorPasq6xSrESsq6x2rLasqKzorOis6iyqLJ8seawrrHasqKz2rKctKKz4LGCsLSw5rB8sZy0DLOiswa02rLasq6x5rBKseCxrrESsqKzorMSsh6wfLHmsOCxiK8Ssj6zDLOis5y02rK0sOyvULAesOCxorOis2S1OLTasoKwgrAesNqyErKis5y0orOctNqyfLESskqxSrGosj6zorMGtKKz2rJKsUqxULASsnayorOiszK1arTasuCxtLCis3yx2rI4tKKzorM+swyzErJ8sXyxdrLasj6zorOis+Cx2rISsnyxqLISsuCxorNqtKKzPrOosq6x/qwwrRKy2rKis6KznLSis3ayErISshKy4LESsji0nLRqtKKzDLMSsuCxdrKctKiyorM+s5y0PrMMs6iydrJ2skqx2rLasqKznLSiswyzErJ2sq6xdrIMs6KznLSis6Kz4LF2shKydrKostqyPrM4tDi0lrU4tOCxfLESshKy4LE+s6KzorMGtNqyErLashKyqLLasqKzorNqtKKzDLN2shKy";

    var data = Buffer.from(b64, "base64");

    var data_points = [];
    for (var i = 0; i < data.length; i += 2) {
      var point = {};
      for (var j = 0; j < 2; j += 2) {
        var idx_start = i + j;
        var idx_end = idx_start + 2;
        var v = data.readInt16LE(idx_start);
        point[idx_name_dict[j]] = v;
      }
      data_points.push(point);
    }
    return data_points;
  }
  function extract_data_to_csv(params) {
    var path_raw = params[0];
    var path_csv = params[1];
    var data = extract_data(path_raw);
    // fs.writeFileSync(path_csv, JSON.stringify(data));
    console.log("[");
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
      var item = data_1[_i];
      var val = JSON.stringify(item);
      val = val.replace("'", '"');
      console.log(val + ",");
    }
    console.log("]");
  }
  extract_data_to_csv([__dirname + "/binary-file", __dirname + "/csv"]);
}


convertForce()