const calculateButton = document.querySelector("#calculate-button");

const validateInputs = (dayInput, monthInput, yearInput) => {
    if (dayInput === "" || monthInput === "" || yearInput === "") {
        if (dayInput === "") {
            const label = document.getElementById("day-input-label");
            const input = document.getElementById("day-input");
            const errorMessage = document.getElementById("day-error-message");
            errorMessage.style.display = "block";
        }
        if (monthInput === "") {
        }
        if (yearInput === "") {
        }
        console.log("missing inputs");
        return false;
    }
    const inputDate = new Date(yearInput, monthInput - 1, dayInput);
    console.log(inputDate);
    if (inputDate.getMonth() + 1 != monthInput) {
        console.log("invalid day for selected month");
        return false;
    }
    const now = new Date();
    if (inputDate.getTime() > now.getTime()) {
        console.log("date is in future");
        return false;
    }

    return true;
};

calculateButton.addEventListener("click", () => {
    const dayInput = document.querySelector("#day-input").value;
    const monthInput = document.querySelector("#month-input").value;
    const yearInput = document.querySelector("#year-input").value;
    if (!validateInputs(dayInput, monthInput, yearInput)) return;
});
