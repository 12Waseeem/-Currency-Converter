const dropList = document.querySelectorAll(".drop-list select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

for (let select of dropList) {
  for (let currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
          newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
          newOption.selected = "selected";
      }
      select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal == "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
  }
  const exchangeRateTxt = document.querySelector(".exchange-rate");
  exchangeRateTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/45334e1e5f337df8b16e6d5c/latest/${fromCurrency.value}`;
  
  fetch(url).then(response => response.json()).then(result =>{
    let exchangeRate = result.conversion_rates[toCurrency.value];
    let totalExRate = (amtVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText = `${amtVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
}).catch(() =>{
    exchangeRateTxt.innerText = "Something went wrong";
});
});
