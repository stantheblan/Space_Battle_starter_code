class Ship {
    constructor (h, f, acc)
    {
        this.hull = h;
        this.firepower = f;
        this.accuracy = acc;
        this.alive = true;
    }
}

class USSSchwarzenegger extends Ship {
    constructor(h, f, acc)
    {
        super(h, f, acc)
        this.hull = h;
        this.firepower = f;
        this.accuracy = acc;
    }    
    attack(opp)
    {
        console.log(opp)
        let rdmN = Math.random();

        if (this.accuracy > rdmN) 
        {       
            console.log("I hit " + this.firepower + " on their " + opp.hull + " hull")

            opp.hull -= this.firepower;

            if (opp.hull <= 0)
            {
                opp.alive = false;
                boolFleet[getIndex()] = false;
                console.log("Alien has died.");
            }
        } 
        else 
        {
            console.log(`I missed!`)
        }
        console.log("Alien has " + opp.hull + " hull left.");
    }
}

class Enemy extends Ship {
    constructor(h, f, acc)
    {
        super(h, f, acc)
        this.hull = Math.floor(Math.random() * 4) + 3; 
        this.firepower = Math.floor(Math.random() * 3) + 2;
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
    }
    attack(opp)
    {
        console.log(opp)
        let rdmN = Math.random();

        if (this.accuracy > rdmN)
        {      
            console.log("They hit " + this.firepower + " on my " + opp.hull + " hull")

            opp.hull -= this.firepower;
            if (opp.hull <= 0) 
            {
                opp.alive = false;
                console.log("You have died.");
            }
        } 
        else 
        {
            console.log(`They missed!`)
        }
        console.log("You have " + opp.hull + " hull left.");
    }
}

function battle(p, eA)
{
    let cont = window.prompt("Attack y/n", "y");
    if (cont == null || cont.toLowerCase() == "n") {
        console.log("u scardi cat")
    }
    else if (cont.toLowerCase() == "y")
    {
        for(let i = 0; i < eA.length; i++)
        {
            setIndex(i)
            if (p.alive)
            {
                let ans = window.prompt("Do you want to retreat? You have " + p.hull + " against their " + eA[i].hull, "n");
                if (ans.toLowerCase() == "n")
                {
                    console.log("\n\nBattle " + (i + 1))
                    while (eA[i].alive)
                    {  
                        p.attack(eA[i]);
                        if (eA[i].alive == true)
                        {
                            eA[i].attack(p);
                            if (!p.alive) {break;}
                        }
                    }
                }
                else {break}
            } 
            updateHTMLp(p)
            updateHTMLe(eA[i])
        }
    }
    else {
        alert(`I don't understand your response.\n\n Try again!`)
        battle(p, eA)
    }
}

function makeFleet(num)
{
    for (let i = 0; i < num; i++)
    {
        enFleet[i] = new Enemy();
        boolFleet[i] = true;
    }
}

function updateHTMLp(opp)
{
    document.getElementById("pStat").innerHTML = 
    "Hull: " + opp.hull  + "<br>"
    + "FirePower: " + opp.firepower + "<br>"
    + "Accuracy: " + opp.accuracy;
}

function updateHTMLe(opp)
{
    document.getElementById("eStat").innerHTML = 
    "Hull: " + opp.hull  + "<br>"
    + "FirePower: " + opp.firepower + "<br>"
    + "Accuracy: " + opp.accuracy;
}

let checker = arr => arr.every(v => v === false)

function getIndex()
{
    return indexA;
}

function setIndex(i)
{
    indexA = i;
}

let schw = new USSSchwarzenegger(20, 5, 0.7);
let enFleet = [];
let boolFleet = [];
let indexA = 0;
let rdmF = Math.random() * 50;
makeFleet(5);


// console.log(schw)
// console.log(en)

// schw.attack(en)
// en.attack(schw)

// console.log(schw)
// console.log(en)

console.log(enFleet)
// enFleet.every(checkPWin)
console.log(checker(boolFleet))
battle(schw, enFleet);
console.log(checker(boolFleet))
