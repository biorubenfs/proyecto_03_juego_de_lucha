// Las clases principales que dan lugar a los luchadores

class Fighter {
    constructor() {
        this.health = 100;
        this.id = Fighter.id++;
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

// Array en el que se almacenarán los luchadores según se vayan creando
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
let addPlayerBlue = () => {
    let blue = new FighterBlue();
    addCharacter(players, blue);
    displayCharacter(blue.color);
    checkArray();

}

let addPlayerGreen = () => {
    let green = new FighterGreen();
    addCharacter(players, green);
    displayCharacter(green.color);
    checkArray();
}

let addPlayerRed = () => {
    let red = new FighterRed();
    addCharacter(players, red);
    displayCharacter(red.color);
    checkArray();
}

let addPlayerYellow = () => {
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

let atacarPlayer1 = () => {
    players[1].health = players[1].health - players[0].attack;
    console.log(`${players[1].color} ps: ${players[1].health}`);
    let ps = `${players[1].health}%`;
    document.getElementById("ps-2").style.width = ps;

    checkWinner(players[0], players[1]);

}

let atacarPlayer2 = () => {
    players[0].health = players[0].health - players[1].attack;
    console.log(`${players[0].color} ps: ${players[0].health}`);
    let ps = `${players[0].health}%`;

    document.getElementById("ps-1").style.width = ps;

    checkWinner(players[0], players[1]);
}


