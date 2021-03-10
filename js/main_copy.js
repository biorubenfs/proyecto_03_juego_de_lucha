// Las clases principales que dan lugar a los luchadores

class Fighter {
    constructor() {
        this.health = 100;
        this.id = Fighter.id++
    }
}

Fighter.id = 0;

// Los objetos creados son tal cual están definidas, no dejan al usuario seleccionar nada
class FighterRed extends Fighter {
    constructor() {
        super();
        this.attack = 20;
        this.color = "red";
    }
}

class FighterBlue extends Fighter {
    constructor() {
        super();
        this.attack = 20;
        this.color = "blue";
    }
}

class FighterYellow extends Fighter {
    constructor() {
        super();
        this.attack = 20;
        this.color = "yellow";
    }
}

class FighterGreen extends Fighter {
    constructor() {
        super();
        this.attack = 20;
        this.color = "green";
    }
}

// Creamos los luchadores segun donde clique el jugador y los almacenamos en este array
let players = [];

// Agrega un jugador al array de jugadores
const addCharacter = (arrayPlayers, player) => {
    arrayPlayers.push(player);
}

// Agrega el jugador al html
const displayCharacter = (color) => {
    let htmlElement = document.getElementById("displayCharacters");
    htmlElement.appendChild(document.getElementById(color));
};

// Comprobación del array
const checkArray = () => {
    console.log("Hemos llamado al checkArray()");
    if (players.length == 2) {
        document.getElementById("selection").style.display = "none";
    }
}

// Jugadores
let jugador1 = () => {
    let blue = new FighterBlue();
    addCharacter(players, blue);
    displayCharacter(blue.color);
    checkArray();

}

let jugador2 = () => {
    let green = new FighterGreen();
    addCharacter(players, green);
    displayCharacter(green.color);
    checkArray();
}

let jugador3 = () => {
    let red = new FighterRed();
    addCharacter(players, red);
    displayCharacter(red.color);
    checkArray();
}

let jugador4 = () => {
    let yellow = new FighterYellow();
    addCharacter(players, yellow);
    displayCharacter(yellow.color);
    checkArray();
}

// Los personaje seleccionados están ahora en un array

//fight(players[0], players[1]);

// Comprobando el ganador
let checkWinner = (player1, player2) => {
    if (player1.health <= 0) {
        alert(`${player2.color} WINS!`)
    }
    else if (player2.health <= 0) {
        alert(`${player1.color} WINS!`)
    }
    else {
        console.log("El combate sigue");
    }
};

//checkWinner(players[0], players[1]);

let atacarPlayer1 = () => {
    players[1].health = players[1].health - players[0].attack;
    console.log(`${players[1].color} ps: ${players[1].health}`);
    checkWinner(players[0], players[1]);

}

let atacarPlayer2 = () => {
    players[0].health = players[0].health - players[1].attack;
    console.log(`${players[0].color} ps: ${players[0].health}`);
    checkWinner(players[0], players[1]);
}

function change() {
    let div1 = document.getElementById("divUno");

    if (div1.hidden == true) {
        div1.hidden = false;
    } else {
        div1.hidden = true;
    }
}

let luchar = () => {
    fight(players[0], players[1]);
    checkWinner(players[0], players[1]);
}


