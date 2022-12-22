window.onload = function () {
  const table = document.getElementById("table");
  const newRow = document.createElement("tr");
  let newCell = document.createElement("td");
  newCell.innerHTML = "first cell";
  let newCell2 = document.createElement("td");
  newCell2.innerHTML = "second cell";
  newRow.appendChild(newCell);
  newRow.appendChild(newCell2);
  table.appendChild(newRow);

  // var files = require('fs').readdirSync('/image/');
  // for (const iterator of files) {

  // }

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://[::1]:3000/get_img", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        newCell2.innerHTML = result;
        console.log(result);
    })
    .catch((error) => console.log("error", error));
};
