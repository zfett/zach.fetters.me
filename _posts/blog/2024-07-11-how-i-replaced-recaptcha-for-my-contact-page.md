---
categories: ["blog"]
date: 2024-07-10
title: How I replaced reCAPTCHA for my contact page!
subtitle: From 2.5 MB to 145 KB!
cover: https://res.cloudinary.com/attkzach/image/upload/v1722194886/uploads/sepxrek7phr56lmlkwag.webp
tags:
  - recaptcha
  - javascript
  - webdev
published: true
---
I've recently added a form to my contact page, and I originally used Netlify's reCAPTCHA integration to help keep bots away from the form, along with a honeypot field. I learned, however, after taking a peep at the page's network statistics that I was peeking at around 2.5 MB of overhead, most of which was from Google's reCAPTCHA embed.

![A screenshot of Firefox's network developer tools, showing a total network transfer size of 2.49 MB with Google's reCAPTCHA on the page.](https://res.cloudinary.com/attkzach/image/upload/v1722194885/uploads/v7a1g20t1pkcmzffuhrx.webp)

For most websites, this would be a negligible amount of bandwidth for a page. However, I want to run a tight ship around here, so I needed to find a way to give bots a hard time without breaking the bandwidth bank (my theoretical max for one page is around 300 KB. Since my site is mainly text and CSS, this shouldn't be too hard...)

### Concept

I needed to create a system that would be trivially easy for most humans to pass, but difficult for bots without some sort of human intervention to slow their spamming efforts down. I decided to go the route of basic math, presenting a simple 'number plus number' equation. Originally, I wanted to use at least three operations (addition, multiplication, subtraction), but I kept it to addition for simplicity's sake. In the final version, two numbers from 1 to 10 are generated and to pass, you must add them together. The minimum possible value is 2 and the maximum is 20.

### Code

The code, originally, was simple. Pseudo-randomly (`Math.random()`) generate two numbers, store them in a variable, show them in the user interface. When the user types in a value, check if that value equals the two variables added together. If it doesn't, don't let them submit the form. In my typical fashion, I over-engineered it in the end.

```javascript
function generateNumbers() {
    var leftNumber = Math.floor(Math.random() * 10 + 1); //1...10
    var rightNumber = Math.floor(Math.random() * 10 + 1);

    lastGenerated = Date.now();

    LEFT_NUMBER_ELEM.innerHTML = leftNumber;
    RIGHT_NUMBER_ELEM.innerHTML = rightNumber;

    INPUT_FIELD.value = null;

    generatedHash = createHash(`${lastGenerated}${leftNumber}${rightNumber}`);
}
```

Pretty simple, right? Generate two numbers, store the time they were generated, and show these numbers on the contact form. But, what's happening at the bottom? Something about a "hash?" That's right! We're combining the timestamp epoch value and the two number values into a string, then hashing it.

```javascript
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
```

This code, shamelessly [stolen from GeeksForGeeks.org](https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript/#using-bitwise-xor-operation), takes in a string and, by using a bitwise XOR operation, generates a numerical hash from said string. Similar to how Minecraft converts seed strings to usable numerical values for terrain generation. Our hash works by combining the epoch time of the generation for the number values and those two values into a string. This is, honestly, SEVERELY overkill for a simple verification question, but I'll get to why I'm using hash values later.

Now that we've generated our values and hash, we need to validate the user's input for when they answer the math question. We do this via the following steps:

1. Check if the two numbers have been generated by checking if the `lastGenerated` variable is null.
2. Has the user attempted to input an answer? If so, has it been 5 seconds or greater since the last attempt?
3. Calculate a new hash using similar values to the original, but getting the two number values from the HTML instead of what the script generated itself. Compare these two hashes. The reason we use the `innerHTML` value in this second hash generation is to check for any tampering/inconsistencies on the client's end.
4. Check if the value input is blank.
5. Lastly, check if the user's answer is correct.

```javascript
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
```

After all of this, we override the HTML form's default actions and make it so that the validation function must return true to submit the form, along with the typical input checks.

```javascript
FORM_SUBMIT_BTN.addEventListener("click", (event)=>{
    event.preventDefault();

    if (FORM_ELEM.reportValidity() && validateInput()) {
        FORM_ELEM.submit();
    } else {
        return false;
    }

}, false);
```

Now, I can already hear people telling me, "but Zach! People can just easily manipulate the client-side JavaScript code to bypass all of this!" While that is definitely true and is the reason why I am ONLY using this code for a simple bot-hampering tactic, it takes some skill for an individual to bypass this code when they could just as easily answer it themselves. As for the bots, it would also be easy to create web-scraping code that looks for the HTML IDs of the number values and input field and automatically solve it, but that would require handcrafted code that, to my belief, many scam/spam groups would find not worthwhile for my little ol' website. Plus, it makes for a fun, harmless side project that I had a good time working up and writing about. So, in the end, it doesn't even matter.

### Results

With all this work, we have a functional human validation quiz and, as a byproduct, reduced our contact page's transfer size from 2.5 MB with Google's reCAPTCHA to 144 KB with my homemade solution! (That's a 39.3% decrease!)

![A screenshot of Firefox's network developer tools, showing a total network transfer size of 144.38 KB after removing Google's reCAPTCHA and using my homemade solution.](https://res.cloudinary.com/attkzach/image/upload/v1722194887/uploads/i2nfbvxg9e3yaawc9b1i.webp)

The code for this little project is available on the [GitHub repo of this site](https://github.com/zfett/zach.fetters.me/blob/main/static/script/form-input.js). A future potential project would be to port a lot of this code to a serverless function and do the checking externally via an API rather than client-side. I fear that would be a little TOO overkill for this, so I'll leave it to more curious programmers than myself.