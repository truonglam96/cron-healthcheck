window.onload = async function () {
  generateImg();
};

window.addEventListener("mouseup", function (e) {
  if (e.target.tagName === 'IMG') {
    let mac = e.target.alt;
    drawCharts(mac);
    loadJson(mac);
  }
});

async function loadJson(macAddress) {
  let data = await getDeviceInfo(macAddress);
  const json = document.getElementById("json");
  json.innerHTML = data;
}

function generateImg() {
  const panel = document.getElementById("panel");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // fetch("http://[::1]:3000/get_img", requestOptions)
    fetch("http://35.240.171.212:3000/get_img", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const newRow = document.createElement("tr");
      let array = JSON.parse(result);
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        let mac = element.split('\\').pop().replace('.jpg','');
        let remove = '_'+mac.split('_').pop();
        mac = mac.replace(remove, '');
        mac = mac.replace(/_/gi, ':');

        var img = document.createElement("img");
        img.src = element.toString();
        img.alt = mac;
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

function drawCharts(macAddress) {
  google.charts.load("current", { packages: ["line"] });
  google.charts.setOnLoadCallback(drawChart);
  let width = 600;
  let height = 300;

  async function drawChart() {
    //"7C:DF:A1:E7:BB:A9"
    let dataConverted = await convertData(macAddress);
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

    var dataForce = new google.visualization.DataTable();
    dataForce.addColumn("number", "Times");
    dataForce.addColumn("number", "Force values");
    dataForce.addRows(arrForce);
    var optionsForce = {
      chart: {
        title: "Force sensor",
        subtitle: "1/500s",
      },
      width: width,
      height: height,
    };
    var chartForce = new google.charts.Line(
      document.getElementById("linechartForce")
    );
    chartForce.draw(dataForce, google.charts.Line.convertOptions(optionsForce));
  }
}

async function convertData(macAddress) {
  return await new Promise(function (resolve, reject) {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      macAddress: macAddress,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://35.240.171.212:3000/convert-force-imu", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => console.log("error", error));
  });
}

async function getDeviceInfo(macAddress) {
  return await new Promise(function (resolve, reject) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "http://35.240.171.212:3000/get-info-device?macAddress=" + macAddress,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => resolve(result))
    .catch((error) => console.log("error", error));
  });
}
