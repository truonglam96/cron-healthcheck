// const URL_PATH = "http://[::1]:3000";
const URL_PATH = "http://35.240.171.212:3000";

//
google.charts.load("current", { packages: ["corechart", "line"] });
google.charts.load("current", { packages: ["line"] });
google.charts.load("current", { packages: ["bar"] });
// google.charts.setOnLoadCallback(callbackOnload);

window.onload = async function () {
  checkAuthorize();
  callbackOnload();
};

async function checkAuthorize() {
  const token = localStorage.getItem("token");
  let res;
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(URL_PATH + "/whoAmI", requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        window.location.href = "/public/html/login.html";
      }else
      response.text();
    })
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return res;
}

window.addEventListener("mouseup", function (e) {
  if (
    e.target.tagName == "TD" &&
    e.target.parentNode.name == "tr_offcanvas_automatic"
  ) {
    document.getElementById("tbody_automatic_detail_canvas").innerHTML = "";
    let mac = e.target.parentNode.children[0].innerHTML;
    generateTableAutomaticDetail_offcanvas(mac);
  }

  if (
    e.target.tagName == "TD" &&
    e.target.parentNode.name == "tr_offcanvas_manual"
  ) {
    document.getElementById("tbody_manual_detail_canvas").innerHTML = "";
    let mac = e.target.parentNode.children[0].innerHTML;
    generateTableManualDetail_offcanvas(mac);
  }

  if (e.target.tagName === "INPUT" && e.target.name == "radio_result_byday") {
    drawChart_TimeOfDay_Automatic(e.target.value);
  }

  if (
    e.target.tagName === "INPUT" &&
    e.target.name == "radio_result_byday_manual"
  ) {
    drawChart_TimeOfDay_Manual(e.target.value);
  }
});

async function generateTableAutomaticDetail_offcanvas(mac) {
  let date = getLast30Days();
  let fristDay = date.firstDay;
  let lastDay = date.lastDay;

  let from = document.getElementById("inputFrom").value;
  let to = document.getElementById("inputTo").value;

  if (from != "" && to != "") {
    fristDay = from;
    lastDay = to;
  }

  let dataResult = [];
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/automatic-details?fromDate=" +
      fristDay +
      "&toDate=" +
      lastDay +
      "&macAddress=" +
      mac,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      for (const iterator of JSON.parse(result)) {
        dataResult.push(iterator);
      }
    })
    .catch((error) => console.log("error", error));

  //Generate table
  document.getElementById("total_detail_automatic").innerHTML =
    "Total: " + dataResult.length;
  let tbody = document.getElementById("tbody_automatic_detail_canvas");
  tbody.innerHTML = "";
  for (const iterator of dataResult) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");

    let errorReason = JSON.parse(
      iterator.logResult.replace(/\T/gi, "t").replace(/\F/gi, "f")
    );

    let type = iterator.type;
    if (type != "A" && type != "B") {
      type = "-";
    }

    td1.innerHTML = iterator.macAddress;
    td2.innerHTML = iterator.isPass == true ? "Pass" : "Fail";
    td3.innerHTML = await formatDateTime(iterator.createdDate);
    td4.innerHTML = iterator.testingTime;
    td5.innerHTML =
      iterator.firmwareTestName == "" ? "-" : iterator.firmwareTestName;
    td6.innerHTML =
      iterator.isPass == true
        ? "-"
        : JSON.stringify(errorReason[errorReason.length - 1]);
    td7.innerHTML = type;
    td8.innerHTML =
      iterator.resultData != undefined ? iterator.resultData : "-";

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td7);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td8);

    tbody.appendChild(tr);
  }
}

async function generateTableManualDetail_offcanvas(mac) {
  let date = getLast30Days();
  let fristDay = date.firstDay;
  let lastDay = date.lastDay;

  let from = document.getElementById("inputFrom").value;
  let to = document.getElementById("inputTo").value;

  if (from != "" && to != "") {
    fristDay = from;
    lastDay = to;
  }

  let dataResult = [];
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/manual-details?fromDate=" +
      fristDay +
      "&toDate=" +
      lastDay +
      "&macAddress=" +
      mac,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      for (const iterator of JSON.parse(result)) {
        dataResult.push(iterator);
      }
    })
    .catch((error) => console.log("error", error));

  //Generate table
  document.getElementById("total_detail_manual").innerHTML =
    "Total: " + dataResult.length;
  let tbody = document.getElementById("tbody_manual_detail_canvas");
  tbody.innerHTML = "";
  for (const iterator of dataResult) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");

    let errorReason = JSON.parse(
      iterator.logResult.replace(/\T/gi, "t").replace(/\F/gi, "f")
    );

    td1.innerHTML = iterator.macAddress;
    td2.innerHTML = iterator.isPass == true ? "Pass" : "Fail";
    td3.innerHTML = await formatDateTime(iterator.createdDate);
    td4.innerHTML = iterator.testingTime;
    td5.innerHTML = iterator.firmwareOTA == "" ? "-" : iterator.firmwareOTA;
    td6.innerHTML =
      iterator.isPass == true
        ? "-"
        : JSON.stringify(errorReason[errorReason.length - 1]);

    let img = document.createElement("img");
    img.src = "data:image/png;base64," + iterator.imageB64;
    img.alt = "Don't have image data";
    img.style.width = "100px";
    td7.appendChild(img);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    tbody.appendChild(tr);
  }
}

function callbackOnload() {
  let date = getLast30Days();
  let fristDay = date.firstDay;
  let lastDay = date.lastDay;

  let from = document.getElementById("inputFrom").value;
  let to = document.getElementById("inputTo").value;

  if (from != "" && to != "") {
    fristDay = from;
    lastDay = to;
  }

  drawChart_Pie_Automatic(fristDay, lastDay);
  drawChart_Line_Automatic(fristDay, lastDay);
  generateTableDetailAutomatic(fristDay, lastDay, "");

  drawChart_Pie_Manual(fristDay, lastDay);
  drawChart_Line_Manual(fristDay, lastDay);
  generateTableDetailManual(fristDay, lastDay, "");
}

function serachAll() {
  resetControl();
  callbackOnload();
}

function searchMacAutomatic() {
  document.getElementById("tbody_detail_automatic").innerHTML = "";
  let date = getLast30Days();
  let fristDay = date.firstDay;
  let lastDay = date.lastDay;

  let from = document.getElementById("inputFrom").value;
  let to = document.getElementById("inputTo").value;

  if (from != "" && to != "") {
    fristDay = from;
    lastDay = to;
  }
  generateTableDetailAutomatic(
    fristDay,
    lastDay,
    document.getElementById("mac_automatic").value
  );
}

function searchMacManual() {
  document.getElementById("tbody_detail_manual").innerHTML = "";
  let date = getLast30Days();
  let fristDay = date.firstDay;
  let lastDay = date.lastDay;

  let from = document.getElementById("inputFrom").value;
  let to = document.getElementById("inputTo").value;

  if (from != "" && to != "") {
    fristDay = from;
    lastDay = to;
  }
  generateTableDetailManual(
    fristDay,
    lastDay,
    document.getElementById("mac_manual").value
  );
}

function resetControl() {
  document.getElementById("linechart_result").innerHTML = "";
  document.getElementById("tbody_automatic").innerHTML = "";
  document.getElementById("donutchart").innerHTML = "";
  document.getElementById("piechart").innerHTML = "";
  document.getElementById("chart_div").innerHTML = "";
  document.getElementById("tbody_detail_automatic").innerHTML = "";
  document.getElementById("linechart_result_manual").innerHTML = "";
  document.getElementById("tbody_manual").innerHTML = "";
  document.getElementById("donutchart_manual").innerHTML = "";
  document.getElementById("piechart_manual").innerHTML = "";
  document.getElementById("chart_div_manual").innerHTML = "";
  document.getElementById("tbody_detail_manual").innerHTML = "";
  // document.getElementById('').innerHTML = "";
  // document.getElementById('').innerHTML = "";
  // document.getElementById('').innerHTML = "";
  // document.getElementById('').innerHTML = "";
  // document.getElementById('').innerHTML = "";
  // document.getElementById('').innerHTML = "";
  // document.getElementById('').innerHTML = "";
  // document.getElementById('').innerHTML = "";
}

/**Automatic********************************************************************************************************************** */

async function drawChart_TimeOfDay_Automatic(date) {
  let arrDate = date;
  arrDate = arrDate.split("/");

  date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];

  let from = date;
  let to = date;
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let arrData = [["Time of day", "Pass", "Fail"]];

  await fetch(
    URL_PATH +
      "/statistics/line-chart-automatic/time-of-day?fromDate=" +
      from +
      "&toDate=" +
      to,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      for (const iterator of JSON.parse(result)) {
        arrData.push([iterator.date, iterator.isPass, iterator.isFail]);
      }
    })
    .catch((error) => console.log("error", error));

  //Draw AxisTick
  drawAxisTickColors_Automatic(arrData);
}

function upSideDown_Datetime(date) {
  let arrDate = date.split("/");
  date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
  return date;
}

async function drawChart_Pie_Automatic(from, to) {
  //   let from = document.getElementById("inputFrom").textContent;
  //   let to = document.getElementById("inputTo").textContent;
  let dataResult;

  //   if (from === "" && to === "") {
  //     from = "2023-01-01";
  //     to = "2023-03-01";
  //   }

  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/statistics/error-reason-automatic?fromDate=" +
      from +
      "&toDate=" +
      to,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => (dataResult = JSON.parse(result)))
    .catch((error) => console.log("error", error));

  var data = google.visualization.arrayToDataTable([
    ["Error", "Error reason"],
    ["read_mac", dataResult.read_mac],
    ["erase_flash", dataResult.erase_flash],
    ["flash_firmware", dataResult.flash_firmware],
    ["check_gpio", dataResult.check_gpio],
    ["check_force", dataResult.check_force],
    ["check_ram", dataResult.check_ram],
    ["check_camera", dataResult.check_camera],
    ["check_rtc", dataResult.check_rtc],
    ["take_pic", dataResult.take_pic],
    ["check_imu", dataResult.check_imu],
    ["-", 0],
  ]);

  var options = {
    // title: "Fail reason",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}

async function drawChart_Line_Automatic(from, to) {
  //   let from = document.getElementById("inputFrom").textContent;
  //   let to = document.getElementById("inputTo").textContent;
  let dataResult = [];

  //   if (from === "" && to === "") {
  //     from = "2023-01-01";
  //     to = "2023-03-01";
  //   }
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/statistics/line-chart-automatic?fromDate=" +
      from +
      "&toDate=" +
      to,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      for (const iterator of JSON.parse(result)) {
        dataResult.push([iterator.date, iterator.isPass, iterator.isFail]);
      }
    })
    .catch((error) => console.log("error", error));

  var data = new google.visualization.DataTable();
  data.addColumn("string", "Day");
  data.addColumn("number", "Pass");
  data.addColumn("number", "Fail");

  data.addRows(dataResult);

  var options = {
    // chart: {
    //   title: 'Box Office Earnings in First Two Weeks of Opening',
    //   subtitle: 'in millions of dollars (USD)'
    // },
    // width: 600,
    // height: 300
  };

  var chart = new google.charts.Line(
    document.getElementById("linechart_result")
  );

  chart.draw(data, google.charts.Line.convertOptions(options));

  //Draw donut chart
  drawChart_Donut_Automatic(dataResult[dataResult.length - 1]);

  //Generate table
  let tbody = document.getElementById("tbody_automatic");
  for (const iterator of dataResult) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    let input = document.createElement("input");
    input.type = "radio";
    input.name = "radio_result_byday";
    input.value = iterator[0];

    td1.appendChild(input);
    td2.innerHTML = iterator[0];
    td3.innerHTML = await getWeekNumber(
      new Date(upSideDown_Datetime(iterator[0]))
    );
    td4.innerHTML = iterator[1];
    td5.innerHTML = iterator[2];

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);
  }

  drawChart_TimeOfDay_Automatic(dataResult[dataResult.length - 1][0]);
}

async function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

function drawChart_Donut_Automatic(arr) {
  var data = google.visualization.arrayToDataTable([
    ["Result", "Per times"],
    ["Pass", arr[1]],
    ["Fail", arr[2]],
  ]);

  var options = {
    //   title: 'My Daily Activities',
    pieHole: 0.4,
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("donutchart")
  );
  chart.draw(data, options);
}

function drawAxisTickColors_Automatic(data) {
  var data = google.visualization.arrayToDataTable(data);

  //   var data = google.visualization.arrayToDataTable([
  //     ["Time of day", "Pass", "Fail"],
  //     ["2014", 1000, 400],
  //     ["2015", 1170, 460],
  //     ["2016", 660, 1120],
  //     ["2017", 1030, 540],
  //     ["2017", 1030, 540],
  //   ]);

  var options = {
    chart: {
      // title: 'Company Performance',
      // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
  };

  var chart = new google.charts.Bar(document.getElementById("chart_div"));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}

async function generateTableDetailAutomatic(from, to, macAddress) {
  let dataResult = [];
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/automatic-results?fromDate=" +
      from +
      "&toDate=" +
      to +
      "&macAddress=" +
      macAddress,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      for (const iterator of JSON.parse(result)) {
        dataResult.push(iterator);
      }
    })
    .catch((error) => console.log("error", error));

  //Generate table
  let tbody = document.getElementById("tbody_detail_automatic");
  for (const iterator of dataResult) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    let type = iterator.type;
    if (type != "A" && type != "B") {
      type = "-";
    }

    td1.innerHTML = iterator.macAddress;
    td2.innerHTML = iterator.isPass == true ? "Pass" : "Fail";
    td3.innerHTML = await formatDate(iterator.lastDate);
    td4.innerHTML = type;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tr.name = "tr_offcanvas_automatic";

    tbody.appendChild(tr);
  }
}

async function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
  });
}

async function formatDateTime(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**Manual********************************************************************************************************************** */

async function drawChart_Pie_Manual(from, to) {
  //   let from = document.getElementById("inputFrom").textContent;
  //   let to = document.getElementById("inputTo").textContent;
  let dataResult;

  //   if (from === "" && to === "") {
  //     from = "2023-01-01";
  //     to = "2023-03-01";
  //   }

  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/statistics/error-reason-manual?fromDate=" +
      from +
      "&toDate=" +
      to,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => (dataResult = JSON.parse(result)))
    .catch((error) => console.log("error", error));

  var data = google.visualization.arrayToDataTable([
    ["Error", "Error reason"],
    ["get_mac", dataResult.get_mac],
    ["get_hpi", dataResult.get_hpi],
    ["check_battery", dataResult.check_battery],
    ["press_user_button", dataResult.press_user_button],
    ["check_led", dataResult.check_led],
    ["take_a_picture", dataResult.take_a_picture],
    ["check_image", dataResult.check_image],
    ["check_hall_sensor", dataResult.check_hall_sensor],
    ["check_wifi", dataResult.check_wifi],
    ["send_test_upload", dataResult.send_test_upload],
    ["send_key", dataResult.send_key],
    ["check_hpi", dataResult.check_hpi],
    ["burn_hpi", dataResult.burn_hpi],
    ["update_fw_prod", dataResult.update_fw_prod],
    ["check_led_last", dataResult.check_led_last],
    ["-", 0],
  ]);

  var options = {
    // title: "Fail reason",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart_manual")
  );
  chart.draw(data, options);
}

async function drawChart_Line_Manual(from, to) {
  //   let from = document.getElementById("inputFrom").textContent;
  //   let to = document.getElementById("inputTo").textContent;
  let dataResult = [];

  //   if (from === "" && to === "") {
  //     from = "2023-01-01";
  //     to = "2023-03-01";
  //   }
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/statistics/line-chart-manual?fromDate=" +
      from +
      "&toDate=" +
      to,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let objData = JSON.parse(result);
      for (const iterator of objData.result) {
        let dateTarget = objData.targetData[0].filter(
          (item) => item.date == upSideDown_Datetime(iterator.date)
        );
        let tagetValue = 0;
        if (dateTarget.length > 0) {
          tagetValue = dateTarget[0].value;
        }
        dataResult.push([
          iterator.date,
          iterator.isPass,
          iterator.isFail,
          iterator.isPass + iterator.isFail,
          tagetValue,
        ]);
      }
    })
    .catch((error) => console.log("error", error));

  var data = new google.visualization.DataTable();
  data.addColumn("string", "Day");
  data.addColumn("number", "Test pass");
  data.addColumn("number", "Test fail");
  data.addColumn("number", "Current production");
  data.addColumn("number", "Target production");
  data.addRows(dataResult);
  //   data.addRows([
  //     ["01/01", 37.8, 80.8, 37.8, 80.8],
  //     ["02/01", 30.9, 69.5, 37.8, 80.8],
  //   ]);

  var options = {
    // chart: {
    //   title: 'Box Office Earnings in First Two Weeks of Opening',
    //   subtitle: 'in millions of dollars (USD)'
    // },
    // width: 600,
    // height: 300
  };

  var chart = new google.charts.Line(
    document.getElementById("linechart_result_manual")
  );

  chart.draw(data, google.charts.Line.convertOptions(options));

  //Draw donut chart
  drawChart_Donut_Manual(dataResult[dataResult.length - 1]);

  //Generate table
  let tbody = document.getElementById("tbody_manual");
  for (const iterator of dataResult) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    let input = document.createElement("input");
    input.type = "radio";
    input.name = "radio_result_byday_manual";
    input.value = iterator[0];

    td1.appendChild(input);
    td2.innerHTML = iterator[0];
    td3.innerHTML = await getWeekNumber(
      new Date(upSideDown_Datetime(iterator[0]))
    );
    td4.innerHTML = iterator[1];
    td5.innerHTML = iterator[2];

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);
  }

  //
  drawChart_TimeOfDay_Manual(dataResult[dataResult.length - 1][0]);
}

function drawChart_Donut_Manual(arr) {
  var data = google.visualization.arrayToDataTable([
    ["Result", "Per times"],
    ["Pass", arr[1]],
    ["Fail", arr[2]],
  ]);

  var options = {
    //   title: 'My Daily Activities',
    pieHole: 0.3,
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("donutchart_manual")
  );
  chart.draw(data, options);
}

function drawAxisTickColors_Manual(data) {
  var data = google.visualization.arrayToDataTable(data);

  //   var data = google.visualization.arrayToDataTable([
  //     ["Time of day", "Pass", "Fail"],
  //     ["2014", 1000, 400],
  //     ["2015", 1170, 460],
  //     ["2016", 660, 1120],
  //     ["2017", 1030, 540],
  //     ["2017", 1030, 540],
  //   ]);

  var options = {
    chart: {
      // title: 'Company Performance',
      // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
  };

  var chart = new google.charts.Bar(
    document.getElementById("chart_div_manual")
  );

  chart.draw(data, google.charts.Bar.convertOptions(options));
}

async function generateTableDetailManual(from, to, macAddress) {
  //   let from = document.getElementById("inputFrom").textContent;
  //   let to = document.getElementById("inputTo").textContent;
  let dataResult = [];

  //   if (from === "" && to === "") {
  //     from = "2023-01-01";
  //     to = "2023-03-01";
  //   }
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/manual-results?fromDate=" +
      from +
      "&toDate=" +
      to +
      "&macAddress=" +
      macAddress,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      for (const iterator of JSON.parse(result)) {
        dataResult.push(iterator);
      }
    })
    .catch((error) => console.log("error", error));

  //Generate table
  let tbody = document.getElementById("tbody_detail_manual");
  for (const iterator of dataResult) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    td1.innerHTML = iterator.macAddress;
    td2.innerHTML = iterator.isPass == true ? "Pass" : "Fail";
    td3.innerHTML = await formatDate(iterator.lastDate);
    td4.innerHTML = iterator.HPI;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tr.name = "tr_offcanvas_manual";

    tbody.appendChild(tr);
  }
}

async function drawChart_TimeOfDay_Manual(date) {
  let arrDate = date;
  arrDate = arrDate.split("/");

  date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];

  let from = date;
  let to = date;
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let arrData = [["Time of day", "Pass", "Fail"]];

  await fetch(
    URL_PATH +
      "/statistics/line-chart-manual/time-of-day?fromDate=" +
      from +
      "&toDate=" +
      to,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      for (const iterator of JSON.parse(result)) {
        arrData.push([iterator.date, iterator.isPass, iterator.isFail]);
      }
    })
    .catch((error) => console.log("error", error));

  drawAxisTickColors_Manual(arrData);
}

//**Function********************************************************************************************************************** */

function getLast30Days() {
  const today = new Date();
  const last30Days = [];
  for (let i = 0; i <= 31; i++) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    const date = day.toISOString().substr(0, 10);
    last30Days.push(date);
  }
  return {
    firstDay: last30Days[last30Days.length - 1],
    lastDay: last30Days[0],
  };
}

function getLast7Days() {
  const today = new Date();
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    const date = day.toISOString().substr(0, 10);
    last7Days.push(date);
  }
  return {
    firstDay: last7Days[last7Days.length - 1],
    lastDay: last7Days[0],
  };
}
