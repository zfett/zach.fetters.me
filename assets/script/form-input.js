'use strict'

const LEFT_NUMBER_ELEM = document.getElementById("left-num");
const RIGHT_NUMBER_ELEM = document.getElementById("right-num");
const INPUT_FIELD = document.getElementById("question-input");
const FORM_SUBMIT_BTN = document.getElementById("form-submit");
const FORM_ELEM = document.getElementById("contact-form");
const MESSAGE_ELEM = document.getElementById("message");

let lastGenerated = null;
let generatedHash = null;
let attempts = 0;

//https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript/
function createHash(string) {
    var hash = 0;

    if (string.length == 0) return hash;

    for (var i = 0; i < string.length; i++) {
        var char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}

function showMessage(text) {
    MESSAGE_ELEM.classList.remove("hidden");
    MESSAGE_ELEM.innerHTML = text;
}

function generateNumbers() {
    var leftNumber = Math.floor(Math.random() * 10 + 1); //1...10
    var rightNumber = Math.floor(Math.random() * 10 + 1);

    lastGenerated = Date.now();

    LEFT_NUMBER_ELEM.innerHTML = leftNumber;
    RIGHT_NUMBER_ELEM.innerHTML = rightNumber;

    INPUT_FIELD.value = null;

    generatedHash = createHash(`${lastGenerated}${leftNumber}${rightNumber}`);
}

function validateInput() {
    var generationEval = lastGenerated !== null; //check to see if we've generated numbers

    if (generationEval) {
        var hashCheck = createHash(`${lastGenerated}${LEFT_NUMBER_ELEM.innerHTML}${RIGHT_NUMBER_ELEM.innerHTML}`);
        var leftNumber = Number(LEFT_NUMBER_ELEM.innerHTML);
        var rightNumber = Number(RIGHT_NUMBER_ELEM.innerHTML);
        var userInput = Number(INPUT_FIELD.value);

        var attemptEval = attempts < 1; //check if user hasn't attempted
        var timeEval = Date.now() - lastGenerated >= 5000; //check if more than 5 seconds passed from last attempt
        var hashEval = hashCheck == generatedHash; //check if hashes match
        var emptyEval = INPUT_FIELD.value !== ""; //check if input is not empty
        var inputEval = leftNumber + rightNumber === userInput; //check if numbers added together equal user value

        if (attemptEval || timeEval) {
            if (hashEval) { 
                if (emptyEval) {
                    if (inputEval) {
                        generateNumbers();
                        attempts = 0;
                        return true;
                    } else {
                        generateNumbers();
                        attempts++;
                        showMessage("Incorrect!");
                        return false;
                    }
                } else {
                    showMessage("User input cannot be blank.");
                    return false;
                }
            } else {
                showMessage("Generated hash mismatch. Please try again.");
                generateNumbers();
                return false;
            }
        } else {
            showMessage("Please wait at least 5 seconds from the last attempt to try again.");
            return false;
        }
    } else {
        showMessage("Cannot validate, numbers not generated.");
        return false;
    }
}

window.addEventListener("DOMContentLoaded", generateNumbers);

FORM_SUBMIT_BTN.addEventListener("click", (event)=>{
    event.preventDefault();

    if (FORM_ELEM.reportValidity() && validateInput()) {
        FORM_ELEM.submit();
    } else {
        return false;
    }

}, false);