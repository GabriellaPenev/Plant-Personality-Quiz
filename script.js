
$(document).ready(function () {
    // listen for when user submits the form / cache your selectors in variables, ie: $form = $('form'), add the event.preventDefault() function
    const $form = $('form');
    $form.on('submit', function (event) {
        event.preventDefault();

        // store 4 plant selections in 4 variables:
        const plantChoice1 = $('input[name=question1]:checked').val();
        const plantChoice2 = $('input[name=question2]:checked').val();
        const plantChoice3 = $('input[name=question3]:checked').val();
        const plantChoice4 = $('input[name=question4]:checked').val();

        //  store all 4 plant choices in an array:
        const plantArray = [plantChoice1, plantChoice2, plantChoice3, plantChoice4];

        // create a function that runs 2 sets, first set loops through the list that's passed into the function (plantArray) and adds items that are duplicates to the second set:
        function findAndReturnDuplicatesInArray(list) {
            const inputList = new Set()
            const duplicates = new Set()

            for (const item of list) {
                if (inputList.has(item)) {
                    duplicates.add(item)
                } else {
                    inputList.add(item)
                }
            }
            return duplicates
        };

        // display the results container, clear it, then run the function to list the results, and log the duplicate items: 
        function displayResults() {
            const resultsBox = document.querySelector('.results-container');
            resultsBox.innerHTML = ' ';
            const results = findAndReturnDuplicatesInArray(plantArray);
            let arr = Array.from(results);

            // if / else statement displaying both the 'tie' option where there are 2 plant values, as well as the 'winner' option with 1 plant value in results section:
              // if array is less than 4 values long, ie an input field was skipped, then alert user to fill out all options to get result: 
              if (plantArray.includes(undefined)) {
                $(".results").css("display", "none");
                resultsBox.remove()
                alert('Please complete all 4 questions to see your results!');
            }
            else if (arr.length > 1) {
                arr.forEach(item => {
                    const textH3 = document.createElement("h3");
                    textH3.innerText = item;
                    resultsBox.appendChild(textH3);
                })

            } else {
                const textH3 = document.createElement("h3");
                textH3.innerText = arr[0];
                resultsBox.appendChild(textH3);
            };

            // if / else statement adding more text in an h4 for the results descriptions:
            const textH4 = document.createElement("h4");
            if (arr[0] === 'saguaro cactus' && arr.length === 1) {
                textH4.innerText = "You're prickly!";

            } else if (arr[0] === 'monstera deliciosa' && arr.length === 1) {
                textH4.innerText = "You never go out of style!"

            } else if (arr[0] === 'english ivy' && arr.length === 1) {
                textH4.innerText = "You're a classic old soul that loves to travel!"

            } else if (arr.includes('saguaro cactus') && arr.includes('english ivy')) {
                textH4.innerText = "You're a prickly old soul!"
                $(".personality-heading").html("Your plant personality is a tie between...");

            } else if (arr.includes('monstera deliciosa') && arr.includes('english ivy')) {
                textH4.innerText = "You're a happy, laid-back, lovable gem!"
                $(".personality-heading").html("Your plant personality is a tie between...");

            } else if (arr.includes('saguaro cactus') && arr.includes('monstera deliciosa')) {
                textH4.innerText = "You're prickly but popular, and have a presence like no other!"
                $(".personality-heading").html("Your plant personality is a tie between...");
            }

            resultsBox.append(textH4);

            $(".results").css("display", "block");

        };

        // calling the function:
        displayResults();

    })
});
