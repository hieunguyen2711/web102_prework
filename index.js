/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);
const total_contributions = GAMES_JSON.reduce((acc, game) => {return acc + game.backers},0);
const total_raised = GAMES_JSON.reduce((acc, game) => {return acc + game.pledged}, 0);
const total_games = GAMES_JSON.reduce((acc, game) => {return acc + 1}, 0);


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
    const gamesContainer = document.getElementById("games-container");
    for (const game of games) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("game-card");
        newDiv.innerHTML = `
            
                <h1>${game.name}</h1>
                <p>${game.description}</p>
                <img class="game-img" src="${game.img}" alt="This is the picture of the game ${game.name}">

        `;
        gamesContainer.appendChild(newDiv);
        console.log(newDiv);
        const game_intro = document.getElementById("games-introduction");
        // document.body.insertBefore(newDiv, game_intro);
        

    }
    

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.textContent = total_contributions.toLocaleString("en-US");
console.log(total_contributions);

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.textContent = "$" + total_raised.toLocaleString("en-US");

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.textContent = total_games.toLocaleString("en-US");



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const games_less_goal = GAMES_JSON.filter((game) => {return game.pledged < game.goal});
    

    
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(games_less_goal);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const games_greater_goal = GAMES_JSON.filter((game) => {return game.pledged >= game.goal});
    console.log(games_greater_goal);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(games_greater_goal);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.style.cursor = "pointer";
unfundedBtn.addEventListener("click", filterUnfundedOnly);


const fundedBtn = document.getElementById("funded-btn");
fundedBtn.style.cursor = "pointer";
fundedBtn.addEventListener("click", filterFundedOnly);


const allBtn = document.getElementById("all-btn");
allBtn.style.cursor = "pointer";
allBtn.addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfunded_games = GAMES_JSON.filter((game) => {return game.pledged < game.goal}).length;
const funded_games = GAMES_JSON.filter((game) => {return game.pledged >= game.goal});
console.log(funded_games);
const raised_money = funded_games.reduce((acc, game) => {return acc + game.pledged}, 0);



// create a string that explains the number of unfunded games using the ternary operator
const displayString = `A total of $${raised_money.toLocaleString("en-US")} has been raised for ${funded_games.length} ${funded_games.length <= 1 ? "game" : "games"}. Currently, 
                        ${unfunded_games} 
                        ${unfunded_games <= 1 ? "game remains unfunded. Thank you" : "games remain unfunded. We need your help!!"}`;

// create a new DOM element containing the template string and append it to the description container
const newP = document.createElement("p");
newP.textContent = displayString;
descriptionContainer.append(newP);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstFundedGame, secondFundedGame, ...others] = sortedGames;


// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstP = document.createElement("p");
firstP.textContent = firstFundedGame.name;
firstGameContainer.append(firstP);

// do the same for the runner up item
const secondP = document.createElement("p");
secondP.textContent = secondFundedGame.name;
secondGameContainer.append(secondP);