// const URL_PATH = "http://[::1]:3000";
const URL_PATH = "http://35.240.171.212:3000";

const ROOT = "";
// const ROOT = "/public";

window.onload = async function () {
  checkAuthorize();
  automaticClick();
};

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
    drawChartColumn3(e.target.value, "light");
  }

  if (
    e.target.tagName === "INPUT" &&
    e.target.name == "radio_result_byday_manual"
  ) {
    drawChartColumn3_3(e.target.value, "light");
  }
});

async function checkAuthorize() {
  const token = localStorage.getItem("token");
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(URL_PATH + "/whoAmI", requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        window.location.href = ROOT + "/html/login.html";
      } else response.text();
    })
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

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
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
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
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

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

function automaticClick() {
  document
    .getElementById("btn_manual_tab")
    .setAttribute(
      "style",
      "opacity: 30%; background-color: #67E0E3; width: 100px"
    );
  document
    .getElementById("btn_automatic_tab")
    .setAttribute(
      "style",
      "opacity: 100%; background-color: #67E0E3; width: 100px"
    );
  document
    .getElementsByClassName("main-manual")[0]
    .setAttribute("style", "display: none");
  document
    .getElementsByClassName("main-automatic")[0]
    .setAttribute("style", "display: block");
  callbackOnload_Automatic();
}

function manualClick() {
  document
    .getElementById("btn_automatic_tab")
    .setAttribute(
      "style",
      "opacity: 30%; background-color: #67E0E3; width: 100px"
    );
  document
    .getElementById("btn_manual_tab")
    .setAttribute(
      "style",
      "opacity: 100%; background-color: #67E0E3; width: 100px"
    );
  document
    .getElementsByClassName("main-manual")[0]
    .setAttribute("style", "display: block");
  document
    .getElementsByClassName("main-automatic")[0]
    .setAttribute("style", "display: none");
  callbackOnload_Manual();
}

function drinkMomentClick() {
  window.location.href = "http://35.240.171.212:3000/view-page.html";
}

function getLast30Days() {
  const today = new Date();
  const last30Days = [];
  for (let i = 0; i <= 62; i++) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    const date = day.toISOString().substr(0, 10);
    last30Days.push(date);
  }
  return {
    // firstDay: last30Days[last30Days.length - 1],
    firstDay: '2023-04-01',
    lastDay: last30Days[0],
  };
}

function callbackOnload_Automatic() {
  let date = getLast30Days();
  let fristDay = date.firstDay;
  let lastDay = date.lastDay;

  let from = document.getElementById("inputFrom").value;
  let to = document.getElementById("inputTo").value;

  if (from != "" && to != "") {
    fristDay = from;
    lastDay = to;
  }

  draw4Column(fristDay, lastDay);
  drawChartColumn1(fristDay, lastDay, "light");
  drawChartColumn2(fristDay, lastDay, "light");
  drawChartPie1(fristDay, lastDay, "light");
  drawChartPie2(fristDay, lastDay, "light");
  drawChartColumn3(fristDay, lastDay, "light");
  generateTableDetailAutomatic(fristDay, lastDay, "");
  generateTableCheckAutomatic(fristDay, lastDay);

  // let value = 30;
  // document
  //   .getElementsByClassName("progress-bar")[0]
  //   .setAttribute("style", "width:" + value + "%");
  // document.getElementById("target-1").innerHTML = value + "%";

  // document
  //   .getElementsByClassName("progress-bar")[1]
  //   .setAttribute("style", "width:" + value + "%");
  // document.getElementById("target-2").innerHTML = value + "%";

  // document
  //   .getElementsByClassName("progress-bar")[2]
  //   .setAttribute("style", "width:" + value + "%");
  // document.getElementById("target-3").innerHTML = value + "%";

  // document
  //   .getElementsByClassName("progress-bar")[3]
  //   .setAttribute("style", "width:" + value + "%");
  // document.getElementById("target-4").innerHTML = value + "%";
}

function callbackOnload_Manual() {
  let date = getLast30Days();
  let fristDay = date.firstDay;
  let lastDay = date.lastDay;

  let from = document.getElementById("inputFrom").value;
  let to = document.getElementById("inputTo").value;

  if (from != "" && to != "") {
    fristDay = from;
    lastDay = to;
  }

  draw4Column(fristDay, lastDay);
  drawChartColumn1_1(fristDay, lastDay, "light");
  drawChartColumn2_2(fristDay, lastDay, "light");
  drawChartPie1_1(fristDay, lastDay, "light");
  drawChartPie2_2(fristDay, lastDay, "light");
  drawChartColumn3_3(fristDay, lastDay, "light");
  generateTableCheckManual(fristDay, lastDay);
  generateTableDetailManual(fristDay, lastDay, "");
}

async function draw4Column(from, to) {
  let data = await getCount4Column(from, to);

  document.getElementById("totalAchieved").innerHTML = data.totalAchieved;
  document
    .getElementsByClassName("progress-bar")[0]
    .setAttribute("style", "width:" + data.percentAchieved + "%");
  document.getElementById("target-1").innerHTML = data.percentAchieved + "%";

  document.getElementById("totalQualified").innerHTML = data.totalQualified;
  document
    .getElementsByClassName("progress-bar")[2]
    .setAttribute("style", "width:" + data.percentQualified + "%");
  document.getElementById("target-2").innerHTML = data.percentQualified + "%";

  document.getElementById("totalUnsatisfactory").innerHTML =
    data.totalUnsatisfactory;
  document
    .getElementsByClassName("progress-bar")[1]
    .setAttribute("style", "width:" + data.percentUnsatisfactory + "%");
  document.getElementById("target-3").innerHTML =
    data.percentUnsatisfactory + "%";

  document.getElementById("totalPCBTestAutomatic").innerHTML =
    data.totalPCBTestAutomatic;
  document
    .getElementsByClassName("progress-bar")[3]
    .setAttribute("style", "width:" + data.percentPCBTestAutomatic + "%");
  document.getElementById("target-4").innerHTML =
    data.percentPCBTestAutomatic + "%";
}

async function getCount4Column(from, to) {
  let dataResult;
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH + "/statistics/count4Column?fromDate=" + from + "&toDate=" + to,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      dataResult = JSON.parse(result);
    })
    .catch((error) => console.log("error", error));

  return dataResult;
}

function search() {
  let date = getLast30Days();
  let fristDay = date.firstDay;
  let lastDay = date.lastDay;

  let from = document.getElementById("inputFrom").value;
  let to = document.getElementById("inputTo").value;

  if (from != "" && to != "") {
    fristDay = from;
    lastDay = to;
  }

  //Load automatic
  draw4Column(fristDay, lastDay);
  drawChartColumn1(fristDay, lastDay, "light");
  drawChartColumn2(fristDay, lastDay, "light");
  drawChartPie1(fristDay, lastDay, "light");
  drawChartPie2(fristDay, lastDay, "light");
  drawChartColumn3(fristDay, lastDay, "light");
  generateTableDetailAutomatic(fristDay, lastDay, "");
  generateTableCheckAutomatic(fristDay, lastDay);

  //Load manual
  drawChartColumn1_1(fristDay, lastDay, "light");
  drawChartColumn2_2(fristDay, lastDay, "light");
  drawChartPie1_1(fristDay, lastDay, "light");
  drawChartPie2_2(fristDay, lastDay, "light");
  drawChartColumn3_3(fristDay, lastDay, "light");
  generateTableCheckManual(fristDay, lastDay);
  generateTableDetailManual(fristDay, lastDay, "");
}

function downloadTableAutomaticResult() {
  // Get the table element
  const table = document.getElementById('table_automatic_result');
  
  // Extract the data from the table
  const rows = table.rows;
  const data = [];
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;
    const row_data = [];
    for (let j = 0; j < cells.length; j++) {
      row_data.push(cells[j].innerText.trim());
    }
    data.push(row_data);
  }

  // Convert the data to CSV format
  const csv = data.map(row => row.join(',')).join('\n');

  // Create a download link and click it
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  link.setAttribute('download', 'automatic_results.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadTableManualResult() {
  // Get the table element
  const table = document.getElementById('table_manual_result');
  
  // Extract the data from the table
  const rows = table.rows;
  const data = [];
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;
    const row_data = [];
    for (let j = 0; j < cells.length; j++) {
      row_data.push(cells[j].innerText.trim());
    }
    data.push(row_data);
  }

  // Convert the data to CSV format
  const csv = data.map(row => row.join(',')).join('\n');

  // Create a download link and click it
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  link.setAttribute('download', 'manual_results.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadTableAutomaticDetail() {
  // Get the table element
  const table = document.getElementById('table_automatic_detail');
  
  // Extract the data from the table
  const rows = table.rows;
  const data = [];
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;
    const row_data = [];
    for (let j = 0; j < cells.length; j++) {
      row_data.push(cells[j].innerText.trim());
    }
    data.push(row_data);
  }

  // Convert the data to CSV format
  const csv = data.map(row => row.join(',')).join('\n');

  // Create a download link and click it
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  link.setAttribute('download', 'automatic_details.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadTableManualDetail() {
  // Get the table element
  const table = document.getElementById('table_manual_detail');
  
  // Extract the data from the table
  const rows = table.rows;
  const data = [];
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;
    const row_data = [];
    for (let j = 0; j < cells.length; j++) {
      row_data.push(cells[j].innerText.trim());
    }
    data.push(row_data);
  }

  // Convert the data to CSV format
  const csv = data.map(row => row.join(',')).join('\n');

  // Create a download link and click it
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  link.setAttribute('download', 'manual_details.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Automatic
async function generateTableDetailAutomatic(from, to, macAddress) {
  let dataResult = [];
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

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
  tbody.innerHTML = "";
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
    td2.innerHTML = iterator.isPass == true ? "PASS" : "FAIL";
    if (td2.innerHTML == "PASS") {
      td2.setAttribute(
        "style",
        `color: #1abc9c!important; font-size: 0.75em; font-weight: 700; white-space: nowrap; vertical-align: baseline; border-radius: 0.25rem;`
      );
    } else {
      td2.setAttribute(
        "style",
        `color: #f1556c!important; font-size: 0.75em; font-weight: 700; white-space: nowrap; vertical-align: baseline; border-radius: 0.25rem;`
      );
    }
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

function upSideDown_Datetime(date) {
  let arrDate = date.split("/");
  date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
  return date;
}

async function generateTableCheckAutomatic(from, to) {
  let res = await getDataColumn2(from, to);
  let tbody = document.getElementById("tbody_automatic");
  tbody.innerHTML = "";
  for (const iterator of res) {
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

  drawChartColumn3(res[res.length - 1][0]);
  // drawChartColumn3(res[0][0]);
}

async function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

async function drawChartColumn3(date, darkMode) {
  let data = await getDataTimeOfDayAutomatic(date);

  let arrHour = [];
  let arrPass = [];
  let arrFail = [];
  for (const iterator of data) {
    arrHour.push(iterator[0]);
    arrPass.push(iterator[1]);
    arrFail.push(iterator[2]);
  }

  var chartDom = document.getElementById("column-3");
  var myChart = echarts.init(chartDom, darkMode);
  var option;

  option = {
    title: {
      // text: "Rainfall vs Evaporation",
      // subtext: "Fake Data",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Fail", "Pass"],
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: arrHour,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Fail",
        type: "bar",
        data: arrFail,
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        color: "#FFD85C",
      },
      {
        name: "Pass",
        type: "bar",
        data: arrPass,
        markPoint: {
          data: [
            { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
            { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        color: "#67E0E3",
      },
    ],
  };

  option && myChart.setOption(option);
}

async function getDataTimeOfDayAutomatic(date) {
  let arrDate = date;
  arrDate = arrDate.split("/");

  date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];

  let from = date;
  let to = date;
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let arrData = [];

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
  return arrData;
}

async function getDataPie1(from, to) {
  let dataResult;
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
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

  return dataResult;
}

async function getDataColumn1(from, to) {
  let dataResult = [];
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

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

  return dataResult;
}

async function getDataColumn2(from, to) {
  let dataResult = [];
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/statistics/line-chart-automatic-bar?fromDate=" +
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

  return dataResult;
}

async function drawChartColumn1(from, to, darkMode) {
  let data = await getDataColumn1(from, to);

  let arrLabel = [];
  let arrPass = [];
  let arrFail = [];
  for (const iterator of data) {
    arrLabel.push(iterator[0]);
    arrPass.push(iterator[1]);
    arrFail.push(iterator[2]);
  }

  var chartDom = document.getElementById("column-1");
  var myChart = echarts.init(chartDom, darkMode);
  var option;

  option = {
    title: {
      // text: "Stacked Area Chart",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["Pass", "Fail"],
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: arrLabel,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Fail",
        type: "line",
        smooth: true,
        stack: "Total",
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        // data: [120, 132, 101, 134, 90, 230, 210],
        data: arrFail,
        color: "red",
      },
      {
        name: "Pass",
        type: "line",
        smooth: true,
        stack: "Total",
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        // data: [820, 932, 901, 934, 1290, 1330, 1320],
        data: arrPass,
        color: "green",
      },
    ],
  };

  option && myChart.setOption(option);

  // drawChartPie2();
}

async function drawChartColumn2(from, to, darkMode) {
  let data = await getDataColumn2(from, to);

  let arrDate = [];
  let arrPass = [];
  let arrFail = [];
  for (const iterator of data) {
    arrDate.push(iterator[0]);
    arrPass.push(iterator[1]);
    arrFail.push(iterator[2]);
  }
  var chartDom = document.getElementById("column-2");
  var myChart = echarts.init(chartDom, darkMode);
  var option;

  option = {
    title: {
      // text: "Rainfall vs Evaporation",
      // subtext: "Fake Data",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Fail", "Pass"],
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: arrDate,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Fail",
        type: "bar",
        data: arrFail,
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        color: "red",
      },
      {
        name: "Pass",
        type: "bar",
        data: arrPass,
        markPoint: {
          data: [
            { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
            { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        color: "green",
      },
    ],
  };

  option && myChart.setOption(option);
}

async function drawChartPie1(from, to, darkMode) {
  let data = await getDataPie1(from, to);

  let arrData = [];
  for (const iterator in data) {
    if (data[iterator] > 0) {
      switch (iterator) {
        case "read_mac":
          arrData.push({ value: data.read_mac, name: "Read Mac" });
          break;
        case "erase_flash":
          arrData.push({ value: data.erase_flash, name: "Erase Flash" });
          break;
        case "flash_firmware":
          arrData.push({ value: data.flash_firmware, name: "Flash FW" });
          break;
        case "check_gpio":
          arrData.push({ value: data.check_gpio, name: "GPIO" });
          break;
        case "check_force":
          arrData.push({ value: data.check_force, name: "Force" });
          break;
        case "check_ram":
          arrData.push({ value: data.check_ram, name: "Memory Ram" });
          break;
        case "check_camera":
          arrData.push({ value: data.check_camera, name: "Camera" });
          break;
        case "check_rtc":
          arrData.push({ value: data.check_rtc, name: "RTC" });
          break;
        case "take_pic":
          arrData.push({ value: data.take_pic, name: "Take Picture" });
          break;
        case "check_imu":
          arrData.push({ value: data.check_imu, name: "IMU" });
          break;
      }
      // arrData.push({});
    }
  }

  let dataTypeError = await getDataPieAutomaticType(from, to);

  var chartDom = document.getElementById("pie-1");
  var myChart = echarts.init(chartDom, darkMode);
  var option;

  option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      data: [
        "Read Mac",
        "Erase Flash",
        "Flash FW",
        "GPIO",
        "Force",
        "Memory Ram",
        "Camera",
        "RTC",
        "Take Picture",
        "IMU",
      ],
    },
    series: [
      {
        name: "Ratio Type",
        type: "pie",
        selectedMode: "single",
        radius: [0, "40%"],
        label: {
          position: "inner",
          fontSize: 10,
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: dataTypeError.fail.typeA, name: "Type A" },
          { value: dataTypeError.fail.typeB, name: "Type B" },
          { value: dataTypeError.fail.orders, name: "Order" },
        ],
      },
      {
        name: "Ratio Error",
        type: "pie",
        radius: ["45%", "60%"],
        labelLine: {
          length: 15,
        },
        label: {
          formatter: "{b|{b}: }{c} \n{per|{d}%}",
          backgroundColor: "#F6F8FC",
          borderColor: "#8C8D8E",
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: "#6E7079",
              lineHeight: 22,
              align: "center",
            },
            hr: {
              borderColor: "#8C8D8E",
              width: "100%",
              borderWidth: 1,
              height: 0,
            },
            b: {
              color: "#4C5058",
              fontSize: 14,
              fontWeight: "bold",
              lineHeight: 33,
            },
            per: {
              color: "#fff",
              backgroundColor: "#4C5058",
              padding: [3, 4],
              borderRadius: 4,
            },
          },
        },
        // data: [
        //   { value: data.read_mac, name: "Read Mac" },
        //   { value: data.erase_flash, name: "Erase Flash" },
        //   { value: data.flash_firmware, name: "Flash FW" },
        //   { value: data.check_gpio, name: "GPIO" },
        //   { value: data.check_force, name: "Force" },
        //   { value: data.check_ram, name: "Memory Ram" },
        //   { value: data.check_camera, name: "Camera" },
        //   { value: data.check_rtc, name: "RTC" },
        //   { value: data.take_pic, name: "Take Picture" },
        //   { value: data.check_imu, name: "IMU" },
        // ],
        data: arrData,
      },
    ],
  };

  option && myChart.setOption(option);
}

async function getDataPieAutomaticType(from, to) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let res;
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/statistics/pie-automatic-type?fromDate=" +
      from +
      "&toDate=" +
      to,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      res = JSON.parse(result);
    })
    .catch((error) => console.log("error", error));

  return res;
}

async function drawChartPie2(from, to, darkMode) {
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("pie-2");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);

  var container = root.container.children.push(
    am5.Container.new(root, {
      width: am5.p100,
      height: am5.p100,
      layout: root.horizontalLayout,
    })
  );

  // Create main chart
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  var chart = container.children.push(
    am5percent.PieChart.new(root, {
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  // Create series
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  var series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
      alignLabels: false,
    })
  );

  series.labels.template.setAll({
    textType: "circular",
    radius: 4,
  });
  series.ticks.template.set("visible", false);
  series.slices.template.set("toggleKey", "none");

  // add events
  series.slices.template.events.on("click", function (e) {
    selectSlice(e.target);
  });

  // Create sub chart
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  var subChart = container.children.push(
    am5percent.PieChart.new(root, {
      radius: am5.percent(50),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  // Create sub series
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  var subSeries = subChart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
    })
  );

  subSeries.data.setAll([
    { category: "A", value: 0 },
    { category: "B", value: 0 },
    { category: "C", value: 0 },
  ]);
  subSeries.slices.template.set("toggleKey", "none");

  var selectedSlice;

  series.on("startAngle", function () {
    updateLines();
  });

  container.events.on("boundschanged", function () {
    root.events.on("frameended", function () {
      updateLines();
    });
  });

  function updateLines() {
    if (selectedSlice) {
      var startAngle = selectedSlice.get("startAngle");
      var arc = selectedSlice.get("arc");
      var radius = selectedSlice.get("radius");

      var x00 = radius * am5.math.cos(startAngle);
      var y00 = radius * am5.math.sin(startAngle);

      var x10 = radius * am5.math.cos(startAngle + arc);
      var y10 = radius * am5.math.sin(startAngle + arc);

      var subRadius = subSeries.slices.getIndex(0).get("radius");
      var x01 = 0;
      var y01 = -subRadius;

      var x11 = 0;
      var y11 = subRadius;

      var point00 = series.toGlobal({ x: x00, y: y00 });
      var point10 = series.toGlobal({ x: x10, y: y10 });

      var point01 = subSeries.toGlobal({ x: x01, y: y01 });
      var point11 = subSeries.toGlobal({ x: x11, y: y11 });

      line0.set("points", [point00, point01]);
      line1.set("points", [point10, point11]);
    }
  }

  // lines
  var line0 = container.children.push(
    am5.Line.new(root, {
      position: "absolute",
      stroke: root.interfaceColors.get("text"),
      strokeDasharray: [2, 2],
    })
  );
  var line1 = container.children.push(
    am5.Line.new(root, {
      position: "absolute",
      stroke: root.interfaceColors.get("text"),
      strokeDasharray: [2, 2],
    })
  );

  let data = await getDataPieAutomaticType(from, to);

  // Set data
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
  series.data.setAll([
    {
      // category: "Fail: (" + data.fail.total + ") ",
      category: "Fail",
      value: data.fail.total,
      subData: [
        { category: "Type A", value: data.fail.typeA },
        { category: "Type B", value: data.fail.typeB },
        { category: "Other", value: data.fail.orders },
      ],
    },
    {
      // category: "Pass: (" + data.pass.total + ") ",
      category: "Pass",
      value: data.pass.total,
      subData: [
        { category: "Type A", value: data.pass.typeA },
        { category: "Type B", value: data.pass.typeB },
      ],
    },
  ]);

  function selectSlice(slice) {
    selectedSlice = slice;
    var dataItem = slice.dataItem;
    var dataContext = dataItem.dataContext;

    if (dataContext) {
      var i = 0;
      subSeries.data.each(function (dataObject) {
        var dataObj = dataContext.subData[i];
        if (dataObj) {
          subSeries.data.setIndex(i, dataObj);
          if (!subSeries.dataItems[i].get("visible")) {
            subSeries.dataItems[i].show();
          }
        } else {
          subSeries.dataItems[i].hide();
        }

        i++;
      });
    }

    var middleAngle = slice.get("startAngle") + slice.get("arc") / 2;
    var firstAngle = series.dataItems[0].get("slice").get("startAngle");

    series.animate({
      key: "startAngle",
      to: firstAngle - middleAngle,
      duration: 1000,
      easing: am5.ease.out(am5.ease.cubic),
    });
    series.animate({
      key: "endAngle",
      to: firstAngle - middleAngle + 360,
      duration: 1000,
      easing: am5.ease.out(am5.ease.cubic),
    });
  }

  container.appear(1000, 10);

  series.events.on("datavalidated", function () {
    selectSlice(series.slices.getIndex(0));
  });
}

// Manual
async function generateTableCheckManual(from, to) {
  let res = await getDataColumn2_2(from, to);
  let tbody = document.getElementById("tbody_manual");
  tbody.innerHTML = "";
  for (const iterator of res) {
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

  drawChartColumn3_3(res[res.length - 1][0]);
  // drawChartColumn3_3(res[0][0]);
}

async function drawChartColumn3_3(date, darkMode) {
  let data = await getDataTimeOfDayManual(date);

  let arrHour = [];
  let arrPass = [];
  let arrFail = [];
  for (const iterator of data) {
    arrHour.push(iterator[0]);
    arrPass.push(iterator[1]);
    arrFail.push(iterator[2]);
  }

  var chartDom = document.getElementById("column-3.3");
  var myChart = echarts.init(chartDom, darkMode);
  var option;

  option = {
    title: {
      // text: "Rainfall vs Evaporation",
      // subtext: "Fake Data",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Fail", "Pass"],
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: arrHour,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Fail",
        type: "bar",
        data: arrFail,
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        color: "#FFD85C",
      },
      {
        name: "Pass",
        type: "bar",
        data: arrPass,
        markPoint: {
          data: [
            { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
            { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        color: "#67E0E3",
      },
    ],
  };

  option && myChart.setOption(option);
}

async function getDataTimeOfDayManual(date) {
  let arrDate = date;
  arrDate = arrDate.split("/");

  date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];

  let from = date;
  let to = date;
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let arrData = [];

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
  return arrData;
}

async function getDataPie1_1(from, to) {
  let dataResult;
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

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
  return dataResult;
}

async function getDataColumn1_1(from, to) {
  let dataResult = [];
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

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

  return dataResult;
}

async function getDataColumn2_2(from, to) {
  let dataResult = [];
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH +
      "/statistics/line-chart-manual-bar?fromDate=" +
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

  return dataResult;
}

async function drawChartColumn1_1(from, to, darkMode) {
  let data = await getDataColumn1_1(from, to);

  let arrLabel = [];
  let arrPass = [];
  let arrFail = [];
  let arrCurrent = [];
  let arrTarget = [];
  for (const iterator of data) {
    arrLabel.push(iterator[0]);
    arrPass.push(iterator[1]);
    arrFail.push(iterator[2]);
    arrCurrent.push(iterator[3]);
    arrTarget.push(iterator[4]);
  }

  var chartDom = document.getElementById("column-1.1");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    // title: {
    //   text: 'Stacked Line'
    // },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Pass", "Fail", "Total", "Target"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      // feature: {
      //   saveAsImage: {},
      // },
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: arrLabel,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Fail",
        type: "line",
        // stack: "Total",
        smooth: true,
        color: "red",
        data: arrFail,
        // label: {
        //   show: true,
        //   position: "top",
        // },
      },
      {
        name: "Pass",
        type: "line",
        // stack: "Total",
        smooth: true,
        color: "green",
        data: arrPass,
        // label: {
        //   show: true,
        //   position: "top",
        // },
      },
      
      {
        name: "Total",
        type: "line",
        // stack: "Total",
        smooth: true,
        color: "#8378EA",
        data: arrCurrent,
        // label: {
        //   show: true,
        //   position: "top",
        // },
      },
      {
        name: "Target",
        type: "line",
        // stack: "Total",
        smooth: true,
        color: "blue",
        data: arrTarget,
        // label: {
        //   show: true,
        //   position: "top",
        // },
      },
    ],
  };

  option && myChart.setOption(option);

  // var chartDom = document.getElementById("column-1.1");
  // var myChart = echarts.init(chartDom, darkMode);
  // var option;

  // option = {
  //   title: {
  //     // text: "Stacked Area Chart",
  //   },
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "cross",
  //       label: {
  //         backgroundColor: "#6a7985",
  //       },
  //     },
  //   },
  //   legend: {
  //     data: ["Pass", "Fail", "Current", "Target"],
  //   },
  //   toolbox: {
  //     feature: {
  //       saveAsImage: {},
  //     },
  //   },
  //   grid: {
  //     left: "3%",
  //     right: "4%",
  //     bottom: "3%",
  //     containLabel: true,
  //   },
  //   xAxis: [
  //     {
  //       type: "category",
  //       boundaryGap: false,
  //       // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //       data: arrLabel,
  //     },
  //   ],
  //   yAxis: [
  //     {
  //       type: "value",
  //     },
  //   ],
  //   series: [
  //     {
  //       name: "Fail",
  //       type: "line",
  //       stack: "Total",
  //       label: {
  //         show: true,
  //         position: "top",
  //       },
  //       areaStyle: {},
  //       emphasis: {
  //         focus: "series",
  //       },
  //       // data: [120, 132, 101, 134, 90, 230, 210],
  //       data: arrFail,
  //       color: "red",
  //     },
  //     {
  //       name: "Pass",
  //       type: "line",
  //       stack: "Total",
  //       label: {
  //         show: true,
  //         position: "top",
  //       },
  //       areaStyle: {},
  //       emphasis: {
  //         focus: "series",
  //       },
  //       // data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       data: arrPass,
  //       color: "green",
  //     },

  //     {
  //       name: "Current",
  //       type: "line",
  //       stack: "Total",
  //       label: {
  //         show: true,
  //         position: "top",
  //       },
  //       areaStyle: {},
  //       emphasis: {
  //         focus: "series",
  //       },
  //       // data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       data: arrCurrent,
  //       color: "yellow",
  //     },
  //     {
  //       name: "Target",
  //       type: "line",
  //       stack: "Total",
  //       label: {
  //         show: true,
  //         position: "top",
  //       },
  //       areaStyle: {},
  //       emphasis: {
  //         focus: "series",
  //       },
  //       // data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       data: arrTarget,
  //       color: "blue",
  //     },
  //   ],
  // };

  // option && myChart.setOption(option);
}

async function drawChartColumn2_2(from, to, darkMode) {
  let data = await getDataColumn2_2(from, to);

  let arrDate = [];
  let arrPass = [];
  let arrFail = [];
  for (const iterator of data) {
    arrDate.push(iterator[0]);
    arrPass.push(iterator[1]);
    arrFail.push(iterator[2]);
  }
  var chartDom = document.getElementById("column-2.2");
  var myChart = echarts.init(chartDom, darkMode);
  var option;

  option = {
    title: {
      // text: "Rainfall vs Evaporation",
      // subtext: "Fake Data",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Fail", "Pass"],
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: arrDate,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Fail",
        type: "bar",
        data: arrFail,
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        color: "red",
      },
      {
        name: "Pass",
        type: "bar",
        data: arrPass,
        markPoint: {
          data: [
            { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
            { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        color: "green",
      },
    ],
  };

  option && myChart.setOption(option);
}

async function drawChartPie1_1(from, to, darkMode) {
  let data = await getDataPie1_1(from, to);

  let arrData = [];
  for (const iterator in data) {
    if (data[iterator] > 0) {
      switch (iterator) {
        case "get_hpi":
          arrData.push({ value: data.get_hpi, name: "Read HPI" });
          break;
        case "check_battery":
          arrData.push({ value: data.check_battery, name: "Low Battery" });
          break;
        case "get_mac":
          arrData.push({ value: data.get_mac, name: "Read Mac" });
          break;
        case "press_user_button":
          arrData.push({ value: data.press_user_button, name: "User Button" });
          break;
        case "check_led":
          arrData.push({ value: data.check_led, name: "Check Led" });
          break;
        case "take_a_picture":
          arrData.push({ value: data.take_a_picture, name: "Take Pic" });
          break;
        case "check_image":
          arrData.push({ value: data.check_image, name: "Image" });
          break;
        case "check_hall_sensor":
          arrData.push({ value: data.check_hall_sensor, name: "Hall Sensor" });
          break;
        case "check_wifi":
          arrData.push({ value: data.check_wifi, name: "Wifi" });
          break;
        case "send_test_upload":
          arrData.push({
            value: data.send_test_upload,
            name: "Send Test Upload",
          });
          break;
        case "send_key":
          arrData.push({ value: data.send_key, name: "Send Key" });
          break;
        case "check_hpi":
          arrData.push({ value: data.check_hpi, name: "Check HPI" });
          break;
        case "burn_hpi":
          arrData.push({ value: data.burn_hpi, name: "Burn HPI" });
          break;
        case "update_fw_prod":
          arrData.push({ value: data.update_fw_prod, name: "Flash FW PROD" });
          break;
        case "check_led_last":
          arrData.push({ value: data.check_led_last, name: "Check Last Led" });
          break;
      }
      // arrData.push({});
    }
  }

  let dataTypeError = await getDataPieManualType(from, to);

  var chartDom = document.getElementById("pie-1.1");
  var myChart = echarts.init(chartDom, darkMode);
  var option;

  option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      data: [
        "Read Mac",
        "Read HPI",
        "Low Battery",
        "User Button",
        "Check Led",
        "Take Pic",
        "Image",
        "Hall Sensor",
        "Wifi",
        "Send Test Upload",
        "Send Key",
        "Check HPI",
        "Burn HPI",
        "Flash FW PROD",
        "Check Last Led",
      ],
    },
    series: [
      {
        name: "Ratio ENV",
        type: "pie",
        selectedMode: "single",
        radius: [0, "40%"],
        label: {
          position: "inner",
          fontSize: 10,
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: dataTypeError.fail.notExistENV, name: "Not Exist ENV" },
          { value: dataTypeError.fail.ExistENV, name: "Exist ENV" },
        ],
      },
      {
        name: "Ratio Error Reason",
        type: "pie",
        radius: ["45%", "60%"],
        labelLine: {
          length: 15,
        },
        label: {
          formatter: "{b|{b}: }{c} \n{per|{d}%}",
          backgroundColor: "#F6F8FC",
          borderColor: "#8C8D8E",
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: "#6E7079",
              lineHeight: 22,
              align: "center",
            },
            hr: {
              borderColor: "#8C8D8E",
              width: "100%",
              borderWidth: 1,
              height: 0,
            },
            b: {
              color: "#4C5058",
              fontSize: 14,
              fontWeight: "bold",
              lineHeight: 33,
            },
            per: {
              color: "#fff",
              backgroundColor: "#4C5058",
              padding: [3, 4],
              borderRadius: 4,
            },
          },
        },
        data: arrData,
      },
    ],
  };

  option && myChart.setOption(option);
}

async function getDataPieManualType(from, to) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let res;
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH + "/statistics/pie-manual-type?fromDate=" + from + "&toDate=" + to,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      res = JSON.parse(result);
    })
    .catch((error) => console.log("error", error));

  return res;
}

async function drawChartPie2_2(from, to, darkMode) {
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("pie-2.2");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);

  var container = root.container.children.push(
    am5.Container.new(root, {
      width: am5.p100,
      height: am5.p100,
      layout: root.horizontalLayout,
    })
  );

  // Create main chart
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  var chart = container.children.push(
    am5percent.PieChart.new(root, {
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  // Create series
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  var series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
      alignLabels: false,
    })
  );

  series.labels.template.setAll({
    textType: "circular",
    radius: 4,
  });
  series.ticks.template.set("visible", false);
  series.slices.template.set("toggleKey", "none");

  // add events
  series.slices.template.events.on("click", function (e) {
    selectSlice(e.target);
  });

  // Create sub chart
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  var subChart = container.children.push(
    am5percent.PieChart.new(root, {
      radius: am5.percent(50),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  // Create sub series
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  var subSeries = subChart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
    })
  );

  subSeries.data.setAll([
    { category: "A", value: 0 },
    { category: "B", value: 0 },
    { category: "C", value: 0 },
    { category: "D", value: 0 },
    { category: "E", value: 0 },
    { category: "F", value: 0 },
    { category: "G", value: 0 },
  ]);
  subSeries.slices.template.set("toggleKey", "none");

  var selectedSlice;

  series.on("startAngle", function () {
    updateLines();
  });

  container.events.on("boundschanged", function () {
    root.events.on("frameended", function () {
      updateLines();
    });
  });

  function updateLines() {
    if (selectedSlice) {
      var startAngle = selectedSlice.get("startAngle");
      var arc = selectedSlice.get("arc");
      var radius = selectedSlice.get("radius");

      var x00 = radius * am5.math.cos(startAngle);
      var y00 = radius * am5.math.sin(startAngle);

      var x10 = radius * am5.math.cos(startAngle + arc);
      var y10 = radius * am5.math.sin(startAngle + arc);

      var subRadius = subSeries.slices.getIndex(0).get("radius");
      var x01 = 0;
      var y01 = -subRadius;

      var x11 = 0;
      var y11 = subRadius;

      var point00 = series.toGlobal({ x: x00, y: y00 });
      var point10 = series.toGlobal({ x: x10, y: y10 });

      var point01 = subSeries.toGlobal({ x: x01, y: y01 });
      var point11 = subSeries.toGlobal({ x: x11, y: y11 });

      line0.set("points", [point00, point01]);
      line1.set("points", [point10, point11]);
    }
  }

  // lines
  var line0 = container.children.push(
    am5.Line.new(root, {
      position: "absolute",
      stroke: root.interfaceColors.get("text"),
      strokeDasharray: [2, 2],
    })
  );
  var line1 = container.children.push(
    am5.Line.new(root, {
      position: "absolute",
      stroke: root.interfaceColors.get("text"),
      strokeDasharray: [2, 2],
    })
  );

  let data = await getDataPieManualType(from, to);

  // Set data
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
  series.data.setAll([
    {
      category: "Fail",
      value: data.fail.total,
      subData: [
        { category: "Exist ENV", value: data.fail.existENV },
        { category: "Not Exist ENV", value: data.fail.notExistENV },
      ],
    },
    {
      category: "Pass",
      value: data.pass.total,
      subData: [
        { category: "Exist ENV", value: data.pass.existENV },
        { category: "Not Exist ENV", value: data.pass.notExistENV },
      ],
    },
  ]);

  function selectSlice(slice) {
    selectedSlice = slice;
    var dataItem = slice.dataItem;
    var dataContext = dataItem.dataContext;

    if (dataContext) {
      var i = 0;
      subSeries.data.each(function (dataObject) {
        var dataObj = dataContext.subData[i];
        if (dataObj) {
          subSeries.data.setIndex(i, dataObj);
          if (!subSeries.dataItems[i].get("visible")) {
            subSeries.dataItems[i].show();
          }
        } else {
          subSeries.dataItems[i].hide();
        }

        i++;
      });
    }

    var middleAngle = slice.get("startAngle") + slice.get("arc") / 2;
    var firstAngle = series.dataItems[0].get("slice").get("startAngle");

    series.animate({
      key: "startAngle",
      to: firstAngle - middleAngle,
      duration: 1000,
      easing: am5.ease.out(am5.ease.cubic),
    });
    series.animate({
      key: "endAngle",
      to: firstAngle - middleAngle + 360,
      duration: 1000,
      easing: am5.ease.out(am5.ease.cubic),
    });
  }

  container.appear(1000, 10);

  series.events.on("datavalidated", function () {
    selectSlice(series.slices.getIndex(0));
  });
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
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

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
  tbody.innerHTML = "";
  for (const iterator of dataResult) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    td1.innerHTML = iterator.macAddress;
    td2.innerHTML = iterator.isPass == true ? "PASS" : "FAIL";
    if (td2.innerHTML == "PASS") {
      td2.setAttribute(
        "style",
        `color: #1abc9c!important; font-size: 0.75em; font-weight: 700; white-space: nowrap; vertical-align: baseline; border-radius: 0.25rem;`
      );
    } else {
      td2.setAttribute(
        "style",
        `color: #f1556c!important; font-size: 0.75em; font-weight: 700; white-space: nowrap; vertical-align: baseline; border-radius: 0.25rem;`
      );
    }
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
