//
google.charts.load("current", { packages: ["corechart", "line"] });
google.charts.load("current", { packages: ["line"] });
google.charts.setOnLoadCallback(callbackOnload);

function callbackOnload() {
  drawChart_Pie_Automatic();
  drawChart_Line_Automatic();
  DrawChart_Donut_Automatic();
  drawAxisTickColors_Automatic();

  drawChart_Pie_Manual();
  drawChart_Line_Manual();
  DrawChart_Donut_Manual();
}

function drawChart_Pie_Automatic() {
  var data = google.visualization.arrayToDataTable([
    ["Error", "Error reason"],
    ["read_mac", 30],
    ["erase_flash", 20],
    ["flash_firmware", 3],
    ["check_gpio", 7],
    ["check_force", 20],
    ["check_ram", 5],
    ["check_camera", 5],
    ["check_rtc", 5],
    ["take_pic", 5],
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

function drawChart_Line_Automatic() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Day");
  data.addColumn("number", "Pass");
  data.addColumn("number", "Fail");

  data.addRows([
    ["01/01", 37.8, 80.8],
    ["02/01", 30.9, 69.5],
    ["03/01", 25.4, 57],
    ["04/01", 11.7, 18.8],
    ["05/01", 11.9, 17.6],
    ["06/01", 8.8, 13.6],
    ["07/01", 7.6, 12.3],
    ["08/01", 12.3, 29.2],
    ["09/01", 16.9, 42.9],
    ["10/01", 12.8, 30.9],
    ["11/01", 5.3, 7.9],
    ["12/01", 6.6, 8.4],
    ["13/01", 4.8, 6.3],
    ["14/01", 4.2, 6.2],
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
    document.getElementById("linechart_result")
  );

  chart.draw(data, google.charts.Line.convertOptions(options));
}

function DrawChart_Donut_Automatic() {
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
    document.getElementById("donutchart")
  );
  chart.draw(data, options);
}

function drawAxisTickColors_Automatic() {
  var data = new google.visualization.DataTable();
  data.addColumn("timeofday", "Time of Day");
  data.addColumn("number", "Pass");
  data.addColumn("number", "Fail");

  data.addRows([
    [{ v: [7, 0, 0], f: "7 am" }, 1, 0.25],
    [{ v: [8, 0, 0], f: "8 am" }, 2, 0.5],
    [{ v: [9, 0, 0], f: "9 am" }, 3, 0.75],
    [{ v: [10, 0, 0], f: "10 am" }, 4, 1 ],
    [{ v: [11, 0, 0], f: "11 am" }, 5, 2.25],
    [{ v: [12, 0, 0], f: "12 pm" }, 6, 2.25],
    [{ v: [13, 0, 0], f: "1 pm" }, 7, 3],
    [{ v: [14, 0, 0], f: "2 pm" }, 8, 4],
    [{ v: [15, 0, 0], f: "3 pm" }, 9, 5.25],
    [{ v: [16, 0, 0], f: "4 pm" }, 10, 7.5],
    [{ v: [17, 0, 0], f: "5 pm" }, 11, 10],
  ]);

  var options = {
    //   title: 'Motivation and Energy Level Throughout the Day',
    focusTarget: "category",
    hAxis: {
      title: "Time of Day",
      format: "h:mm a",
      viewWindow: {
        min: [6, 30, 0],
        max: [17, 30, 0],
      },
      textStyle: {
        fontSize: 14,
        color: "#053061",
        bold: true,
        italic: false,
      },
      titleTextStyle: {
        fontSize: 18,
        color: "#053061",
        bold: true,
        italic: false,
      },
    },
    vAxis: {
      // title: 'Rating (scale of 1-10)',
      textStyle: {
        fontSize: 18,
        color: "#67001f",
        bold: false,
        italic: false,
      },
      titleTextStyle: {
        fontSize: 18,
        color: "#67001f",
        bold: true,
        italic: false,
      },
    },
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

//************************************************************************************************************************ */

function drawChart_Pie_Manual() {
  var data = google.visualization.arrayToDataTable([
    ["Error", "Error reason"],
    ["read_mac", 30],
    ["erase_flash", 20],
    ["flash_firmware", 3],
    ["check_gpio", 7],
    ["check_force", 20],
    ["check_ram", 5],
    ["check_camera", 5],
    ["check_rtc", 5],
    ["take_pic", 5],
    ["check_imu", 5],
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
document.getElementById("defaultOpen").click();
