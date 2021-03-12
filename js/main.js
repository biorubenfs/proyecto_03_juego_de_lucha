const jugadores = 2;

// Personajes de frutas: las clases
class Fruta {
    constructor() {
        this.puntosSalud = 100;
        this.id = Fruta.id++;
    }
}

// Los objetos creados son tal cual están definidas, no dejan al usuario seleccionar nada
class Manzana extends Fruta {
    constructor() {
        super();
        this.nombre = "manzana";
        this.puntosAtaque = 20;
        // this.color = "red";
    }
}

class Platano extends Fruta {
    constructor() {
        super();
        this.nombre = "platano";
        this.puntosAtaque = 20;
        // this.color = "blue";
    }
}

class Fresa extends Fruta {
    constructor() {
        super();
        this.nombre = "fresa";
        this.puntosAtaque = 20;
        // this.color = "yellow";
    }
}

class Pera extends Fruta {
    constructor() {
        super();
        this.nombre = "pera";
        this.puntosAtaque = 20;
        // this.color = "green";
    }
}

Fruta.id = 0;

// Array en el que se almacenarán las frutas seleccionadas (hasta un máximo de 2).
let frutas = [];

// Agrega una fruta al array de frutas
const addFruta = (arrayFrutas, fruta) => {
    arrayFrutas.push(fruta);
}

// Cambiar la fruta escogida a seleccionada
const displayFrutaInicio = (fruta) => {
    let htmlElement = document.getElementById("displayCharacters");
    htmlElement.appendChild(document.getElementById(fruta.nombre));
}

// Comprobación del array
const checkArray = () => {
    if (frutas.length == jugadores) {
        document.getElementById("opciones-frutas").style.display = "none";
        return true;
    }
    else false;
}

// Array en el que se almacenarán los luchadores según se vayan creando
let players = [];

// Creación de las instancias de Fruta, lo que vienen siendo los jugadores.
let addManzana = () => {
    let manzana = new Manzana();
    addFruta(frutas, manzana);
    displayFrutaInicio(manzana);
    eliminarSeleccion(manzana);
    checkArray();
}

let addPera = () => {
    let pera = new Pera();
    addFruta(frutas, pera);
    displayFrutaInicio(pera);
    eliminarSeleccion(pera)
    checkArray();
}

let addPlatano = () => {
    let platano = new Platano();
    addFruta(frutas, platano);
    displayFrutaInicio(platano);
    eliminarSeleccion(platano)
    checkArray();
}

let addFresa = () => {
    let fresa = new Fresa();
    addFruta(frutas, fresa);
    displayFrutaInicio(fresa);
    eliminarSeleccion(fresa)
    checkArray();
}

let eliminarSeleccion = (fruta) => {
    document.getElementById(fruta.nombre).classList.remove("hover-effect");
}


// Las frutas seleccionadas están ahora en un array
//fight(players[0], players[1]);

// Comprobando el ganador
let checkWinner = (fruta1, fruta2) => {
    if (fruta1.puntosSalud <= 0) {
        alert(`${fruta2.nombre} WINS!`)
    }
    else if (fruta2.puntosSalud <= 0) {
        alert(`${fruta1.nombre} WINS!`)
    }
    else {
        console.log("El combate sigue");
    }
};

let atacarPlayer1 = () => {
    frutas[1].puntosSalud = frutas[1].puntosSalud - frutas[0].puntosAtaque;
    console.log(`${frutas[1].nombre} ps: ${frutas[1].puntosSalud}`);
    let ps = `${frutas[1].puntosSalud}%`;
    document.getElementById("ps-2").style.width = ps;

    // Verificando si existe un ganador después de cada ataque
    checkWinner(frutas[0], frutas[1]);

}

let atacarPlayer2 = () => {
    frutas[0].puntosSalud = frutas[0].puntosSalud - frutas[1].puntosAtaque;
    console.log(`${frutas[0].nombre} ps: ${frutas[0].puntosSalud}`);
    let ps = `${frutas[0].puntosSalud}%`;
    document.getElementById("ps-1").style.width = ps;

    // Verificando si existe un ganador después de cada ataque
    checkWinner(players[0], players[1]);
}

const displayFrutasLucha = () => {
    let htmlElement = document.getElementById("luchadores");
    htmlElement.appendChild(document.getElementById(frutas[0].nombre));
    htmlElement.appendChild(document.getElementById(frutas[1].nombre));
}

const start = () => {
    if (checkArray()) {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("lucha").style.display = "flex";
        displayFrutasLucha();
    }
    else {
        alert("Tienes que elegir dos jugadores");
    }
}


