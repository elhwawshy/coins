var value = 0;
var exchangeRates = {};  


function fetchExchangeRates() {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(response => response.json())
        .then(data => {
            exchangeRates = data.rates;
            loadLastConversion();
        })
        .catch(error => console.error("Error fetching data: ", error));
}


window.onload = fetchExchangeRates;

function updateValue(action) {
    
    var currentValue = parseFloat(document.getElementById("demo").value);

    if (action === 'increase') {
        currentValue += 1;
    } else if (action === 'decrease') {
        currentValue -= 1;
    }


    if (!isNaN(currentValue) && currentValue >= 0) {
        document.getElementById("demo").value = currentValue.toFixed(2);
    }
}

function validate() {
    var value = parseFloat(document.getElementById("demo").value);
    var selectedCurrencies = Array.from(document.getElementById("currency").selectedOptions).map(option => option.value);
    var result = document.getElementById("Amount");
    var comparison = document.getElementById("comparison");

    if (isNaN(value) || value <= 0) {
        result.innerHTML = "Please enter a valid positive number.";
        result.style.color = "red";
        return false;
    }


    var convertedAmounts = selectedCurrencies.map(currency => {
        var convertedAmount = (value * exchangeRates[currency]).toFixed(2);
        return `${convertedAmount} ${currency}`;
    }).join('<br/>');

    result.innerHTML = convertedAmounts;
    result.style.color = "green";

    
    var euroDifference = (value * exchangeRates['EUR']).toFixed(2);
    var differenceMessage = `Difference with Euro: ${euroDifference} EUR`;
    comparison.innerHTML = differenceMessage;

    
    storeConversion(value, selectedCurrencies, convertedAmounts);


    return false;
}


function storeConversion(value, currencies, result) {
    var conversionDetails = {
        value,
        currencies,
        result
    };
    localStorage.setItem('lastConversion', JSON.stringify(conversionDetails));
}

// Load last conversion from localStorage
function loadLastConversion() {
    let lastConversion = JSON.parse(localStorage.getItem('lastConversion'));
    if (lastConversion) {
        document.getElementById("demo").value = lastConversion.value;
        document.getElementById("currency").value = lastConversion.currencies;
        document.getElementById("Amount").innerHTML = lastConversion.result;
        document.getElementById("lastConversion").innerHTML = `Last Conversion: ${lastConversion.result}`;
    }
}
