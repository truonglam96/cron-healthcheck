// const URL_PATH = "http://[::1]:3000";
const URL_PATH = "http://35.240.171.212:3000";

async function login() {
    let email = document.getElementById("email").value;
    let pwd = document.getElementById("pwd").value;
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      email: email,
      password: pwd,
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    await fetch(URL_PATH + "/users/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).token) {
          localStorage.setItem("token", JSON.parse(result).token);
          window.location.href = "/html/dashboard.html";
        // window.location.href = "/view-page.html";
        } else {
          console.log(result);
          alert("Invalid email or password.");
        }
      })
      .catch((error) => console.log("error", error));
  }