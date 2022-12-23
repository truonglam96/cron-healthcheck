window.onload = function () {
  //   const table = document.getElementById("table");
  const panel = document.getElementById("panel");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://35.240.171.212:3000/get_img", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const newRow = document.createElement("tr");
      let array = JSON.parse(result);
      for (let index = 0; index < array.length; index++) {
        const element = array[index];

        // let newCell = document.createElement("td");
        var img = document.createElement("img");
        img.src = element.toString();
        panel.appendChild(img);
        // newRow.appendChild(newCell);
        // table.appendChild(newRow);
      }
    })
    .catch((error) => console.log("error", error));

};
