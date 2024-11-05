var value = 0;

function updateValue(action) {
    if (action === 'increase') {
        value += 1;
    } else if (action === 'decrease') {
        value -= 1;
    }


    document.getElementById("demo").value = value;
}

function validate() {
    var value = document.getElementById("demo").value;
    var currency = document.getElementById("currency").value;
    var result = document.getElementById("Amount");


  var exchangeRates = {
        "EGP": 49.5,
        "EUR": 0.92,
        "GBP": 0.82,
        "INR": 82
    };


    if (value == "") {
        result.innerHTML = "Please enter a value.";
        result.style.color = "red";
        return false;
    } else if (value <= 0) {
        result.innerHTML = "Please enter a positive number.";
        result.style.color = "red";
        return false;
    }


    var convertedAmount = value * exchangeRates[currency];
    result.innerHTML = convertedAmount + ' ' + currency;
    result.style.color = "green";
    return false;
}
