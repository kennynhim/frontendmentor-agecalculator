const calculateButton = document.querySelector("#calculate-button");
const REQUIRED_INPUT_ERROR_MESSAGE = "This field is required";
const INVALID_DAY_ERROR_MESSAGE = "Must be a valid day";
const INVALID_MONTH_ERROR_MESSAGE = "Must be a valid month";
const INVALID_DATE_ERROR_MESSAGE = "Must be a valid date";
const INVALID_YEAR_ERROR_MESSAGE = "Must be a valid year";
const FUTURE_DATE_ERROR_MESSAGE = "Must be in the past";

const clearErrors = () => {
    const labels = document.getElementsByTagName("label");
    for (const label of labels) {
        label.classList.remove("error-color");
    }

    const inputs = document.getElementsByTagName("input");
    for (const input of inputs) {
        input.classList.remove("error-border-color");
    }

    const errorMessages = document.getElementsByTagName("p");
    for (const errorMessage of errorMessages) {
        errorMessage.style.display = "none";
    }
}

//Adds red colors to input labels and borders and sets error message for missing inputs.
const handleInputError = (inputType, errorMessage) => {
    if (inputType !== "day" && inputType !== "month" && inputType !== "year")
        return;
    const label = document.getElementById(`${inputType}-input-label`);
    const input = document.getElementById(`${inputType}-input`);
    const errorParagraph = document.getElementById(`${inputType}-error-message`);
    label.classList.add("error-color");
    input.classList.add("error-border-color");
    errorParagraph.style.display = "block";
    errorParagraph.innerText = errorMessage;

};

//Validates inputs and returns false if inputs are invalid. Return true otherwise.
const validateInputs = (dayInput, monthInput, yearInput) => {
    clearErrors();
    // Check for missing inputs
    let valid = true;

    if (dayInput === "") {
        handleInputError("day", REQUIRED_INPUT_ERROR_MESSAGE);
        valid = false;
    }
    if (monthInput === "") {
        handleInputError("month", REQUIRED_INPUT_ERROR_MESSAGE);
        valid = false;
    }
    if (yearInput === "") {
        handleInputError("year", REQUIRED_INPUT_ERROR_MESSAGE);
        valid = false;
    }
    if (!valid) return false;

    // Check for inputs outside of ranges
    if (dayInput < 1 || dayInput > 31) {
        handleInputError("day", INVALID_DAY_ERROR_MESSAGE);
        valid = false;
    }

    if (monthInput < 1 || monthInput > 12) {
        handleInputError("month", INVALID_MONTH_ERROR_MESSAGE);
        valid = false;
    }

    if (yearInput < 0){
        handleInputError("year", INVALID_YEAR_ERROR_MESSAGE);
        valid = false;
    }
    if (!valid) return false;

    //Check if the day of the month is invalid for that month (e.g. April 31st)
    const inputDate = new Date(yearInput, monthInput - 1, dayInput);

    if (inputDate.getMonth() + 1 != monthInput) {
        handleInputError("day", INVALID_DATE_ERROR_MESSAGE);
        return false;
    }

    //Check if input is a future date
    const now = new Date();
    if (inputDate.getTime() > now.getTime()) {
        if (inputDate.getFullYear() > now.getFullYear()){
            handleInputError("year", FUTURE_DATE_ERROR_MESSAGE);
            return false;
        }
        if (inputDate.getMonth() > now.getMonth()){
            handleInputError("month", FUTURE_DATE_ERROR_MESSAGE);
            return false;
        }
        if (inputDate.getDate() > now.getDate()){
            handleInputError("day", FUTURE_DATE_ERROR_MESSAGE);
            return false;
        }
        return false;
    }

    return true;
};

calculateButton.addEventListener("click", () => {
    const dayInput = document.querySelector("#day-input").value;
    const monthInput = document.querySelector("#month-input").value;
    const yearInput = document.querySelector("#year-input").value;
    if (!validateInputs(dayInput, monthInput, yearInput)) return;

    const now = moment();
    const inputDate = moment({year: yearInput, month: monthInput - 1, day: dayInput});
    const age = moment.duration(now.diff(inputDate));
    const {years, months, days} = age._data;

    document.getElementById("age-years").innerText = years;
    document.getElementById("age-months").innerText = months;
    document.getElementById("age-days").innerText = days;
});
