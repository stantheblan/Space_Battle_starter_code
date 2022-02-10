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
            document.getElementById("eStat").innerHTML = 
            "Hull: " + opp.hull  + "<br>"
            + "FirePower: " + opp.firepower + "<br>"
            + "Accuracy: " + opp.accuracy;

            console.log("I hit " + this.firepower + " on their " + opp.hull + " hull")

            opp.hull -= this.firepower;
            if (opp.hull <= 0) {
                opp.alive = false;
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
            document.getElementById("pStat").innerHTML = 
            "Hull: " + opp.hull  + "<br>"
            + "FirePower: " + opp.firepower + "<br>"
            + "Accuracy: " + opp.accuracy;

            console.log("They hit " + this.firepower + " on my " + opp.hull + " hull")

            opp.hull -= this.firepower;
            if (opp.hull <= 0) {
                opp.alive = false;
                console.log("Alien has died.");
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

    if (cont.toLowerCase() == "y")
    {
        for(let i = 0; i < eA.length; i++)
        {
            if (p.alive)
            {
                console.log("\n\nBattle " + (i + 1))
                while (eA[i].alive && eA[i])
                {  
                    p.attack(eA[i]);
                    if (eA[i].alive == true)
                    {
                        eA[i].attack(p);
                    }
                }
            }
        }
    }
    else if (cont.toLowerCase() == "n") {
        console.log("u scardi cat")
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
    }
}


let schw = new USSSchwarzenegger(20, 5, 0.7);
let enFleet = [];
let rdmF = Math.random() * 50;
makeFleet(20);


// console.log(schw)
// console.log(en)

// schw.attack(en)
// en.attack(schw)

// console.log(schw)
// console.log(en)

console.log(enFleet)

battle(schw, enFleet);
