let currentDateInput = document.querySelector(".currentDate");
let divInfoApi = document.querySelector(".divInfoApi");
let divPartOneCountry = divInfoApi.querySelector(".divPartOneCountry");
let divPartAllCountry = divInfoApi.querySelector(".divPartAllCountry");
let inputOneCountry = divPartOneCountry.querySelector(".inputOneCountry");
let divInfoOneCountry = divPartOneCountry.querySelector(".infoOneCountry");
let divAllCountryInfo = divPartAllCountry.querySelector(".allCountryInfo");
let pError = document.querySelector(".pError");
let inputToggleDirection = document.querySelector(".toggleDirection");
let inputFunctionDiv = document.querySelector(".inputFunctionDiv");
let allInputFunc = document.querySelectorAll(".inputFunc");
let allBtnFunc = document.querySelectorAll(".btnFunc");
let spanPartDisplay = document.querySelector(".partDisplay span");
let inputNumberStairs = document.querySelector(".inputNumberStairs");
let spanStairs = document.querySelector(".displayEscalier");
let buttonPartEscalier = document.querySelectorAll(".buttonPartEscalier");
let eventChange = new Event("change");

const inputAudio = new Audio("../assets/audio/aTone.mp3");
const apiOneCountryUrl = "https://restcountries.com/v3.1/name/";
const apiAllCountryUrl = "https://restcountries.com/v2/all";

//Part Horlorge
setInterval(() => {
  let currentDate = new Date();
  let hours = "";
  if (currentDate.getHours().toString().length == 1) {
    hours = "0" + currentDate.getHours();
  } else {
    hours = currentDate.getHours();
  }
  let min = "";
  if (currentDate.getMinutes().toString().length == 1) {
    min = "0" + currentDate.getMinutes();
  } else {
    min = currentDate.getMinutes();
  }
  let day = "";
  if (currentDate.getDate().toString().length == 1) {
    day = "0" + currentDate.getDate();
  } else {
    day = currentDate.getDate();
  }
  let month = "";
  if (currentDate.getMonth().toString().length == 1) {
    month = "0" + currentDate.getMonth();
  } else {
    month = currentDate.getMonth();
  }
  currentDateInput.innerHTML = `${day}/${month} ${hours}:${min}`;
}, 1000);

//Part get one country
inputOneCountry.addEventListener("change", (e) => {
  const { value } = e.target;
  if (value == "") {
    alert("Enter a country name pls");
  } else {
    recoverOneCountry(value);
    inputAudio.play();
  }
});

const recoverOneCountry = (value) => {
  fetch(`${apiOneCountryUrl}${value}`)
    .then((res) => {
      pError.innerHTML = "";
      if (res.status == 200) {
        res.json().then((data) => {
          let firstPays = data[0];
          const { name, flags, population, capital } = firstPays;
          divInfoOneCountry.innerHTML = `
            <div class="textInfoOneCountry">
                <p>Pays : ${name.official}</p>
                <p>Population actuelle : ${population}</p>
                <p>Captital : ${capital}</p>
            </div>
            <img class="imgFlag" src="${flags.svg}" alt="${name.official} flag">
                
      `;
          divInfoOneCountry.classList.add("active");
        });
      } else {
        pError.innerHTML = res.statusText;
        divInfoOneCountry.innerHTML = "";
        divInfoOneCountry.classList.remove("active");
      }
    })
    .catch((err) => (pError.innerHTML = err));
};

//Part get 10 country
const recoverXCountry = (value = 10) => {
  fetch(`${apiAllCountryUrl}`)
    .then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          for (let index = 0; index < value; index++) {
            const { name, flags, population, capital } = data[index];
            divAllCountryInfo.innerHTML += `
                <div class="oneCountry">
                    <div class="textInfoOneCountry">
                        <p>Pays : ${name}</p>
                        <p>Population actuelle : ${population}</p>
                        <p>Captital : ${capital}</p>
                    </div>
                    <img class="imgFlag" src="${flags.svg}" alt="${name} flag">
                </div>
                `;
          }
        });
      } else {
        pError.innerHTML = res.statusText;
        divInfoOneCountry.innerHTML = "";
      }
    })
    .catch((err) => (pError.innerHTML = err));
};
recoverXCountry();

//Part changement direction on all country
inputToggleDirection.addEventListener("click", (e) => {
  divAllCountryInfo.classList.toggle("flex-direction-column");
  e.target.value =
    e.target.value == "Display : Columns"
      ? "Display : Lines"
      : "Display : Columns";
  inputAudio.play();
});

//Part button for js function
allBtnFunc.forEach((element) => {
  element.addEventListener("click", (e) => {
    let operator = e.target.getAttribute("data-operator");
    let tabVal = [];
    for (inputVal of allInputFunc.values()) {
      if (inputVal.value != "") {
        tabVal.push(parseFloat(inputVal.value));
      }
    }
    if (tabVal.length != 3) {
      alert("All input must be fullfill");
      return;
    }
    let res;
    switch (operator) {
      case "+":
        res = tabVal.reduce((a, b) => {
          return a + b;
        });
        break;
      case "-":
        res = tabVal.reduce((a, b) => {
          return a - b;
        });
        break;

      case "*":
        res = tabVal.reduce((a, b) => {
          return a * b;
        });
        break;

      case "join":
        res = tabVal.join(",");
        break;

      default:
        break;
    }
    spanPartDisplay.innerHTML = `Result : ${res}`;
    inputAudio.play();
  });
});

//Part stairs
inputNumberStairs.addEventListener("change", (e) => {
  let { value } = e.target;
  if (value > 20) {
    value = 20;
    e.target.value = 20;
  }
  let stairs = "";
  let currentStair = "";
  for (let index = 0; index < parseInt(value, 10); index++) {
    currentStair += "*";
    stairs += `${currentStair}<br>`;
  }
  spanStairs.innerHTML = stairs;
});

buttonPartEscalier.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.value == "+" && inputNumberStairs.value < 20) {
      inputNumberStairs.value++;
      inputNumberStairs.dispatchEvent(eventChange);
    } else if (e.target.value == "-" && inputNumberStairs.value > 0) {
      inputNumberStairs.value--;
      inputNumberStairs.dispatchEvent(eventChange);
    }
  });
});
