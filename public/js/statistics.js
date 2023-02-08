// const URL_PATH = "http://[::1]:3000";
const URL_PATH = "http://35.240.171.212:3000";

//
google.charts.load("current", { packages: ["corechart", "line"] });
google.charts.load("current", { packages: ["line"] });
google.charts.load("current", { packages: ["bar"] });
google.charts.setOnLoadCallback(callbackOnload);

window.addEventListener("mouseup", function (e) {
  if (e.target.tagName === "INPUT") {
    drawChart_TimeOfDay_Automatic(e.target.value);
  }
});

function callbackOnload() {
  drawChart_Pie_Automatic();
  drawChart_Line_Automatic();
  //   DrawChart_Donut_Automatic();
  //   drawAxisTickColors_Automatic();
  generateTableDetailAutomatic();

  drawChart_Pie_Manual();
  drawChart_Line_Manual();
  //   DrawChart_Donut_Manual();
}

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

  drawAxisTickColors_Automatic(arrData);
}

function upSideDown_Datetime(date) {
  let arrDate = date.split("/");
  date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
  return date;
}

async function drawChart_Pie_Automatic() {
  let from = document.getElementById("inputFrom").textContent;
  let to = document.getElementById("inputTo").textContent;
  let dataResult;

  if (from === "" && to === "") {
    from = "2023-01-01";
    to = "2023-03-01";
  }

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

async function drawChart_Line_Automatic() {
  let from = document.getElementById("inputFrom").textContent;
  let to = document.getElementById("inputTo").textContent;
  let dataResult = [];

  if (from === "" && to === "") {
    from = "2023-01-01";
    to = "2023-03-01";
  }
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
  DrawChart_Donut_Automatic(dataResult[dataResult.length - 1]);

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
}

async function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

function DrawChart_Donut_Automatic(arr) {
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

async function generateTableDetailAutomatic() {
  let from = document.getElementById("inputFrom").textContent;
  let to = document.getElementById("inputTo").textContent;
  let dataResult = [];

  if (from === "" && to === "") {
    from = "2023-01-01";
    to = "2023-03-01";
  }
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    URL_PATH + "/automatic-results?fromDate=" + from + "&toDate=" + to,
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

    td1.innerHTML = iterator.macAddress;
    td2.innerHTML = iterator.isPass;
    td3.innerHTML = await formatDate(iterator.lastDate);
    td4.innerHTML = 1;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

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

//************************************************************************************************************************ */

async function drawChart_Pie_Manual() {
  let from = document.getElementById("inputFrom").textContent;
  let to = document.getElementById("inputTo").textContent;
  let dataResult;

  if (from === "" && to === "") {
    from = "2023-01-01";
    to = "2023-03-01";
  }

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

function drawChart_Line_Manual() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Day");
  data.addColumn("number", "Test pass");
  data.addColumn("number", "Test fail");
  data.addColumn("number", "Current production");
  data.addColumn("number", "Target production");

  data.addRows([
    ["01/01", 37.8, 80.8, 37.8, 80.8],
    ["02/01", 30.9, 69.5, 37.8, 80.8],
    ["03/01", 25.4, 57, 37.8, 87.8],
    ["04/01", 11.7, 18.8, 31.8, 80.8],
    ["05/01", 11.9, 17.6, 37.8, 80.8],
    ["06/01", 8.8, 13.6, 37.8, 80.8],
    ["07/01", 7.6, 12.3, 37.8, 80.8],
    ["08/01", 12.3, 29.2, 37.8, 80.8],
    ["09/01", 16.9, 42.9, 37.8, 80.8],
    ["10/01", 12.8, 30.9, 37.8, 80.8],
    ["11/01", 5.3, 7.9, 37.8, 80.8],
    ["12/01", 6.6, 8.4, 37.8, 80.8],
    ["13/01", 4.8, 6.3, 37.8, 80.8],
    ["14/01", 4.2, 6.2, 37.8, 80.8],
  ]);

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
}

function DrawChart_Donut_Manual() {
  var data = google.visualization.arrayToDataTable([
    ["Result", "Per times"],
    ["Pass", 11],
    ["Fail", 2],
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

function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();
