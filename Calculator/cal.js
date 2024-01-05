let display = document.getElementById("display");

function addToDisplay(value) 
{
    if (value === 'AC') {                /*Ac button*/
     clearDisplay();
    } else if (value === '%') {
     calculatePercentage();
    } else {
     display.value += value;
    }
}

function clearDisplay()       /*Ac button to clear*/
{
    display.value = "";
}

function calculatePercentage() 
{
    try {
     display.value = parseFloat(display.value) / 100; /*functioning of % button*/
    } catch (error) {
     display.value = "Error";
    }
}


function calculate() 
{
    try {
     let expression = display.value.replace(/%/g, '/100');
     display.value = eval(expression);
    } catch (error) {
     display.value = "Error";
    }
}
