// const URL_PATH = "http://[::1]:3000";
const URL_PATH = "http://35.240.171.212:3000";

window.onload = async function () {
  generateImgB64();
};

window.addEventListener("mouseup", function (e) {
  if (e.target.tagName === "IMG") {
    let id = e.target.alt;
    let src = e.target.src;
    let mac = e.target.nextSibling.innerHTML
      ? e.target.nextSibling.innerHTML
      : "";
    let times = e.target.nextSibling.nextSibling.innerHTML
      ? e.target.nextSibling.nextSibling.innerHTML
      : "";
    refreshTag();
    loadImgCanvas(src, mac, times);
    drawCharts(id);
    loadJson(id);
  }
});

function refreshTag() {
  document.getElementById("imgElement").src = "";
  document.getElementById("linechartIMUAccelerometer").innerHTML = "";
  document.getElementById("linechartIMUGyroscope").innerHTML = "";
  document.getElementById("linechartForce").innerHTML = "";
}

async function loadJson(id) {
  let data = await getDeviceInfo(id);
  const json = document.getElementById("json");
  const table = document.createElement("table");

  var objData = JSON.parse(data);
  for (var key in objData) {
    const element = objData[key];

    let tdh3 = document.createElement("th");
    tdh3.innerHTML = key + ": ";
    let tdh4 = document.createElement("td");
    tdh4.innerHTML = element;
    let trh1 = document.createElement("tr");
    trh1.appendChild(tdh3);
    trh1.appendChild(tdh4);
    
    table.appendChild(trh1);
  }
  json.appendChild(table);
}

function loadImgCanvas(src, mac, times) {
  document.getElementById("imgElement").src = src;
  document.getElementById("div_mac_canvas").innerHTML = "MacAddress: " + mac;
  document.getElementById("div_times_canvas").innerHTML = "Times: " + times;
}

function search() {
  document.getElementById("panel").innerHTML = "";
  let tagIndex = document.getElementById("indexNextPage");
  tagIndex.innerHTML = "0";
  generateImgB64();
  let tagMacId = document.getElementById("input_MacId");
  if (tagMacId.value !== "") {
    document.getElementById("label_CountFilter").style.display = "block";
  } else {
    document.getElementById("label_CountFilter").style.display = "none";
  }
}

function countAll() {
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    URL_PATH + '/DrinkMoments/count?where={"serialNr": { "neq": "TEST" }}',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      document.getElementById("totalDrinkMoments").innerHTML =
        "Total all: " + JSON.parse(result).count;
    })
    .catch((error) => console.log("error", error));
}

function countFilter(filter) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(URL_PATH + "/DrinkMoments/count?where=" + filter, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      document.getElementById("label_CountFilter").innerHTML =
        "Result filter: " + JSON.parse(result).count;
    })
    .catch((error) => console.log("error", error));
}

function generateImgB64() {
  let tagIndex = document.getElementById("indexNextPage");
  let indexNextPage = tagIndex.innerHTML;
  let indexParser = parseInt(indexNextPage);

  let tagMacId = document.getElementById("input_MacId");
  let tagDateFrom = document.getElementById("input_DateFrom");
  let tagDateTo = document.getElementById("input_DateTo");

  let _where = {
    serialNr: { neq: "TEST" },
    // ,imageB64: { neq: ""}
  };

  if (tagMacId.value !== "") {
    _where["boxId"] = tagMacId.value.toString();
  }

  if (tagDateFrom.value !== "" && tagDateTo.value !== "") {
    _where["and"] = [
      { createdDate: { gte: new Date(tagDateFrom.value) } },
      { createdDate: { lte: new Date(tagDateTo.value) } },
    ];
  }

  let filter = {
    limit: 60,
    skip: indexParser,
    where: _where,
    order: "createdDate DESC",
    fields: {
      _id: true,
      boxId: true,
      createdDate: true,
      imageB64: true,
      deviceTime: true,
    },
  };
  indexParser += 60;
  tagIndex.innerHTML = indexParser;

  countAll();
  countFilter(JSON.stringify(_where));

  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    URL_PATH + "/DrinkMoments?filter=" + JSON.stringify(filter),
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const panel = document.getElementById("panel");
      const newRow = document.createElement("tr");
      let array = JSON.parse(result);
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        var img = document.createElement("img");
        img.src = "data:image/png;base64," + element.imageB64.toString();
        img.alt = element._id.toString();

        var div_mac = document.createElement("div");
        div_mac.setAttribute("class", "bottom-left");
        div_mac.innerHTML = element.boxId;

        var div_timer = document.createElement("div");
        div_timer.setAttribute("class", "bottom-right");
        let date = formatDate(new Date(parseInt(element.deviceTime + "000")));
        div_timer.innerHTML = date;

        var div_layer = document.createElement("div");
        div_layer.setAttribute("class", "layer");
        div_layer.appendChild(img);
        div_layer.appendChild(div_mac);
        div_layer.appendChild(div_timer);

        panel.appendChild(div_layer);
      }
    })
    .catch((error) => console.log("error", error));
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function generateImg() {
  const panel = document.getElementById("panel");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(URL_PATH + "/get_img", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const newRow = document.createElement("tr");
      let array = JSON.parse(result);
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        let splF = element.split("\\").pop().replace(".jpg", "");
        //34:34:34:34:34:34_16907374_63aeb89ef11d100618df8317

        let id = splF.split("_").pop();
        let mac = splF.replace("_" + id, "");

        let remove = "_" + mac.split("_").pop();
        mac = mac.replace(remove, "");
        mac = mac.replace(/_/gi, ":");

        var img = document.createElement("img");
        img.src = element.toString();
        img.alt = id;
        var h6 = document.createElement("h6");
        h6.innerText = mac;
        var span = document.createElement("span");
        span.appendChild(img);
        // span.appendChild(h6);
        panel.appendChild(span);
      }
    })
    .catch((error) => console.log("error", error));
}

function drawCharts(id) {
  google.charts.load("current", { packages: ["line"] });
  google.charts.setOnLoadCallback(drawChart);
  let width = 600;
  let height = 300;

  async function drawChart() {
    let dataConverted = await convertData(id);
    let imuData = JSON.parse(dataConverted)[0].imu;
    let forceData = JSON.parse(dataConverted)[1].force;

    // 0: "gyro_x",
    // 1: "gyro_y",
    // 2: "gyro_z",
    // 3: "acc_x",
    // 4: "acc_y",
    // 5: "acc_z",

    let arrGyro = [],
      arrAcc = [];
    let indexIMU = 1 / 416;
    for (let index = 0; index < imuData.length; index++) {
      const element = imuData[index];
      arrGyro.push([
        parseFloat(indexIMU.toFixed(3)),
        element[0],
        element[1],
        element[2],
      ]);
      arrAcc.push([
        parseFloat(indexIMU.toFixed(3)),
        element[3],
        element[4],
        element[5],
      ]);
      indexIMU += 1 / 416;
    }

    var dataIMUGyroscope = new google.visualization.DataTable();
    dataIMUGyroscope.addColumn("number", "Times");
    dataIMUGyroscope.addColumn("number", "x gyro");
    dataIMUGyroscope.addColumn("number", "y gyro");
    dataIMUGyroscope.addColumn("number", "z gyro");
    dataIMUGyroscope.addRows(arrGyro);
    var optionsIMUGyroscope = {
      chart: {
        title: "Gyroscope",
        subtitle: "1/416s",
      },
      width: width,
      height: height,
    };
    var chartIMUGyroscope = new google.charts.Line(
      document.getElementById("linechartIMUGyroscope")
    );
    chartIMUGyroscope.draw(
      dataIMUGyroscope,
      google.charts.Line.convertOptions(optionsIMUGyroscope)
    );

    ////
    var dataIMUAccelerometer = new google.visualization.DataTable();
    dataIMUAccelerometer.addColumn("number", "Times");
    dataIMUAccelerometer.addColumn("number", "x accel");
    dataIMUAccelerometer.addColumn("number", "y accel");
    dataIMUAccelerometer.addColumn("number", "z accel");
    dataIMUAccelerometer.addRows(arrAcc);
    var optionsForce = {
      chart: {
        title: "Accelerometer",
        subtitle: "1/416s",
      },
      width: width,
      height: height,
    };
    var chartForce = new google.charts.Line(
      document.getElementById("linechartIMUAccelerometer")
    );
    chartForce.draw(
      dataIMUAccelerometer,
      google.charts.Line.convertOptions(optionsForce)
    );

    ////
    let arrForce = [];
    let indexForce = 1 / 500;
    for (let index = 0; index < forceData.length; index++) {
      const element = forceData[index];
      arrForce.push([parseFloat(indexForce.toFixed(3)), element[1]]);
      indexForce += 1 / 500;
    }

    var arrMean = [];
    for (const iterator of arrForce) {
      arrMean.push(iterator[1]);
    }

    var meanFilter = mean_filter(arrMean);

    var medianFilter = median_filter(meanFilter);

    var data_smooth_deri = ([] = medianFilter
      .slice(1)
      .map((x, i) => x - medianFilter[i]));

    var valueMinDeri = Math.min(...data_smooth_deri);
    var isFraud = valueMinDeri < -900 ? "Normal" : "Fraud";

    document.getElementById("div_fraud_canvas").innerHTML =
      "Status: " + isFraud + ", value: " + valueMinDeri.toFixed() + "/-900";

    var arrForceNormal = [];
    for (let index = 0; index < arrForce.length; index++) {
      const element = arrForce[index];
      arrForceNormal.push([
        element[0],
        element[1],
        medianFilter[index],
        data_smooth_deri[index],
        -900,
      ]);
    }

    var dataForce = new google.visualization.DataTable();
    dataForce.addColumn("number", "Times");
    dataForce.addColumn("number", "Force values");
    dataForce.addColumn("number", "Smoothed data");
    dataForce.addColumn("number", "Derivative");
    dataForce.addColumn("number", "Non fraud limit");
    dataForce.addRows(arrForceNormal);
    var optionsForce = {
      chart: {
        title: "Force sensor",
        subtitle: "1/500s",
      },
      width: width,
      height: height,

      // colors:['#4285f4','#004411']
      // axes: {
      //   x: {
      //     0: {side: 'top'}
      //   }
      // }
    };
    var chartForce = new google.charts.Line(
      document.getElementById("linechartForce")
    );
    chartForce.draw(dataForce, google.charts.Line.convertOptions(optionsForce));
  }
}

function mean(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total / arr.length;
}

function median(arr) {
  const { length } = arr;

  arr.sort((a, b) => a - b);

  if (length % 2 === 0) {
    return (arr[length / 2 - 1] + arr[length / 2]) / 2;
  }

  return arr[(length - 1) / 2];
}

function mean_filter(data, n = 3) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    result.push(mean(data.slice(i, i + n)));
  }
  return result;
}

function median_filter(data, n = 11) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    result.push(median(data.slice(i, i + n)));
  }
  return result;
}

async function convertData(id) {
  return await new Promise(function (resolve, reject) {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(URL_PATH + "/convert-force-imu", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => console.log("error", error));
  });
}

async function getDeviceInfo(id) {
  return await new Promise(function (resolve, reject) {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(URL_PATH + "/DrinkMoments/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => resolve(result))
      .catch((error) => console.log("error", error));
  });
}

function uploadFW() {}

function setupUploadForm() {
  const formElem = document.getElementById("uploadForm");
  formElem.onsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/files", {
      method: "POST",
      body: new FormData(formElem),
    });
    const body = await res.json();
    console.log("Response from upload", body);
    await fetchFiles();
  };
}
