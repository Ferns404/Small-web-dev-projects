// Elements
const valueInput = document.getElementById("valueInput");
const unitCategory = document.getElementById("unitCategory");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const resultDisplay = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

// Unit options for each category
const units = {
  temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  length: ["Meter", "Kilometer", "Mile", "Yard", "Foot"],
  weight: ["Gram", "Kilogram", "Pound", "Ounce"],
};


// Update unit options when the category changes
unitCategory.addEventListener("change", updateUnitOptions);

function updateUnitOptions() {
  const selectedCategory = unitCategory.value;
  const unitOptions = units[selectedCategory];

  // Clear current unit options
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  // Add new unit options
  unitOptions.forEach(unit => {
    const optionFrom = document.createElement("option");
    const optionTo = document.createElement("option");
    optionFrom.value = optionTo.value = unit;
    optionFrom.text = optionTo.text = unit;
    fromUnit.appendChild(optionFrom);
    toUnit.appendChild(optionTo);
  });
}

// Initialize unit options
updateUnitOptions();

// Conversion logic
convertBtn.addEventListener("click", function() {
  const value = parseFloat(valueInput.value);
  const from = fromUnit.value;
  const to = toUnit.value;
  const category = unitCategory.value;

  let convertedValue = null;

  // Conversion for Temperature
  if (category === "temperature") {
    convertedValue = convertTemperature(value, from, to);
  }

  // Conversion for Length
  else if (category === "length") {
    convertedValue = convertLength(value, from, to);
  }

  // Conversion for Weight
  else if (category === "weight") {
    convertedValue = convertWeight(value, from, to);
  }

  if (convertedValue !== null) {
    resultDisplay.textContent = `${value} ${from} = ${convertedValue} ${to}`;
  } else {
    resultDisplay.textContent = "Conversion not possible!";
  }
});

// Temperature conversion
function convertTemperature(value, from, to) {
  if (from === to) return value;
  if (from === "Celsius" && to === "Fahrenheit") return (value * 9/5) + 32;
  if (from === "Celsius" && to === "Kelvin") return value + 273.15;
  if (from === "Fahrenheit" && to === "Celsius") return (value - 32) * 5/9;
  if (from === "Fahrenheit" && to === "Kelvin") return (value - 32) * 5/9 + 273.15;
  if (from === "Kelvin" && to === "Celsius") return value - 273.15;
  if (from === "Kelvin" && to === "Fahrenheit") return (value - 273.15) * 9/5 + 32;
  return null;
}

// Length conversion
function convertLength(value, from, to) {
  const conversions = {
    Meter: 1,
    Kilometer: 0.001,
    Mile: 0.000621371,
    Yard: 1.09361,
    Foot: 3.28084,
  };
  return (value / conversions[from]) * conversions[to];
}

// Weight conversion
function convertWeight(value, from, to) {
  const conversions = {
    Gram: 1,
    Kilogram: 0.001,
    Pound: 0.00220462,
    Ounce: 0.035274,
  };
  return (value / conversions[from]) * conversions[to];
}
