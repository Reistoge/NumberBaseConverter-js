

document.addEventListener("DOMContentLoaded", () => {

    const inputs = document.querySelectorAll(".field"); // get all the inputs with the class "field".
    const resultsInputs = document.querySelectorAll(".result"); // Select all labels with the
    const resetButton = document.querySelector("button"); // Select the "reset" button

    // Attach events listeners to input fields
    inputs.forEach(input => { 

        input.addEventListener("input", () => { // for each input we attach an event that waits to a input change.
            console.log(`Input changed: ${input.id}, New Value: ${input.value}`);
            // we get the input values from the html.
            let valueToTransform = document.getElementById("valueToTransform").value;
            let baseInitial = document.getElementById("baseInitial").value;
            let newBase = document.getElementById("newBase").value;
            let precision = document.getElementById("precision").value;
            
            resultsInputs.forEach(element => { // for each result label we calculate the conversion and set the value.
                switch (element.id) {
                    case "base2":
                        element.value = generalBaseConversion(valueToTransform, baseInitial, 2, precision);
                        break;
                    case "base8":
                        element.value = generalBaseConversion(valueToTransform, baseInitial, 8, precision);
                        break;
                    case "base10":
                        element.value = generalBaseConversion(valueToTransform, baseInitial, 10, precision);
                        break;
                    case "base16":
                        element.value = generalBaseConversion(valueToTransform, baseInitial, 16, precision);
                        break;
                    case "baseN":
                        element.value = generalBaseConversion(valueToTransform, baseInitial, newBase, precision);
                        break;


                }

            });



        });
    });
    // Attach event listener to the reset button
    resetButton.addEventListener("click", () => {
        inputs.forEach(input => {
            input.value = "";
        });
        resultsInputs.forEach(element => {
            element.value = "";
        });
    });

    
});

 

