/**
 * Class for Ship
 *
 * @class Ship
 * @param  {number} h
 * @param  {number} f
 * @param  {number} acc
 */
class Ship {
    constructor (h, f, acc) {   //assign the values for the ship
        this.hull = h;
        this.firepower = f;
        this.accuracy = acc;
        this.alive = true;
    }
}

/**
 * Class for USSSchwarzenegger, extending Ship
 *
 * @class USSSchwarzenegger
 * @extends {Ship}
 * @param  {number} h
 * @param  {number} f
 * @param  {number} acc
 */
class USSSchwarzenegger extends Ship {
    constructor(h, f, acc) {
        super(h, f, acc)
        this.hull = h;
        this.firepower = f;
        this.accuracy = acc;
    }    
    attack(opp) {   //attack method
        console.log(opp)    //display the opponent
        let rdmN = Math.random();   //make new random number

        if (this.accuracy > rdmN) {     //check to see if hit
            console.log("I hit " + this.firepower + " on their " + opp.hull + " hull")  //display how much i hit on their hull
            opp.hull -= this.firepower; //do math on their hull

            if (opp.hull <= 0) {    //check to see if oppo is dead
                opp.alive = false;  //change opp.alive to false
                console.log("Alien has died."); //log alien has died
            }
        } 
        else {
            console.log("I missed.");   //log i missed
        }
        console.log("Alien has " + opp.hull + " hull left.");   //display alien 
    }
}
/**
 * Class for Enemy, extending Ship
 *
 * @class Enemy
 * @extends {Ship}
 * @param  {number} h
 * @param  {number} f
 * @param  {number} acc
 */
class Enemy extends Ship {
    constructor(h, f, acc) {
        super(h, f, acc)
        this.hull = Math.floor(Math.random() * 4) + 3;              // Random number between 3-6
        this.firepower = Math.floor(Math.random() * 3) + 2;         // Random number between 2-4
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;   // Random number between 0.6-0.8
    }
    attack(opp) {
        console.log(opp)
        let rdmN = Math.random();   //make new random number

        if (this.accuracy > rdmN) { //check to see if hit 
            console.log("They hit " + this.firepower + " on my " + opp.hull + " hull") //display how much they hit on my hull

            opp.hull -= this.firepower; //do math on my hull
            if (opp.hull <= 0) {    //check to see if oppo is dead
                opp.alive = false;  //change opp.alive to false
                console.log("You have died."); //log I have died
            }
        } 
        else {console.log("They missed!")}  //display they missed
        console.log("You have " + opp.hull + " hull left.");    //display how much hull I have left
    }
}

/**
 * Function battle
 * where the game takes place
 * where the winner is found
 * 
 * @param {Object} p
 * @param {Array} eA
 */
function battle(p, eA) {
    let cont = window.prompt("Attack y/n", "y");    //prompt attack
    if (cont == null || cont.toLowerCase() == "n") {    //if cancel or no
        console.log("u scardi cat")}
    else if (cont.toLowerCase() == "y") {   //if yes attack
        for(let i = 0; i < eA.length; i++) {    //loop over length of array
            if (p.alive) {  //if player alive
                let ans = window.prompt("Do you want to retreat? You have " + p.hull + " against their " + eA[i].hull, "n");    //ask if you want to be a scardi cat
                if (ans.toLowerCase() == "n" && p.alive)  {    //if answer is no AND player is alive
                    console.log("\n\nBattle " + (i + 1))    //display the battle number
                    while (eA[i].alive) //while the enemy I am attacking currently is alive
                    {  
                        p.attack(eA[i]);    //player attack
                        if (eA[i].alive == true) {  //if enemy alive
                            eA[i].attack(p);    //enemy attack
                            if (!p.alive) {break;}  //if player is dead break
                        }
                    }
                }
                else {break}
            } 
            updateHTMLp(p)      //update html info
            updateHTMLe(eA[i])  //update html info
            if (i+1 == eA.length && p.alive) { //if we are on the last enemy and we are alive
                console.log("WINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
                alert("WINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
            }
        }
        if (!p.alive) { //if we are not alive
            console.log("LOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSER")
            alert("LOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSER")
        }
    }
    else {  //you dummi
        alert(`I don't understand your response.\n\n Try again!`)
        battle(p, eA)
    }
}

/**
 * Function to make multiple ships 
 * add them to an array
 * 
 * @param {number} num
 */
function makeFleet(num) {
    for (let i = 0; i < num; i++) {
        enFleet[i] = new Enemy();
    }
}

/**
 * Function to update player info on HTML
 *
 * @param {Object} opp
 */
function updateHTMLp(opp) {
    document.getElementById("pStat").innerHTML = 
    "Hull: " + opp.hull  + "<br>"
    + "FirePower: " + opp.firepower + "<br>"
    + "Accuracy: " + opp.accuracy;
}

/**
 * Function to update enemy info on HTML
 *
 * @param {Object} opp
 */
function updateHTMLe(opp) {
    document.getElementById("eStat").innerHTML = 
    "Hull: " + opp.hull  + "<br>"
    + "FirePower: " + opp.firepower + "<br>"
    + "Accuracy: " + opp.accuracy;
}

/** 
 * Create a new USSSchwarzenegger ship
 * 
 * @param  h {number} 20
 * @param  f {number} 5
 * @param  acc {number} 0.7
*/
let schw = new USSSchwarzenegger(20, 5, 0.7);

/** Empty enemy fleet */
let enFleet = [];

/** Random number between 1-15 */
let rdmF = Math.random() * 15;

/** Make enemy fleet with random number of enemies */
/**
 * @param  {Number} rdmF
 */
makeFleet(rdmF);

/** Display the enemy fleet in the console */
console.log(enFleet)

/** Do battle */
/**
 * @param  {Object} schw
 * @param  {Array} enFleet
 */
battle(schw, enFleet);