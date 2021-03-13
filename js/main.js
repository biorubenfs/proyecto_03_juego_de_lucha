const jugadores = 2;

// Personajes de frutas: la clase padre
class Fruta {
    constructor() {
        this.puntosSalud = 100;
        this.ataques = [];
        this.id = Fruta.id++;
    }
}

// Los objetos creados son tal cual están definidas
class Manzana extends Fruta {
    constructor() {
        super();
        this.nombre = "manzana";
        this.puntosAtaque = [30, 10, 5, 5, 0];
    }
}

class Platano extends Fruta {
    constructor() {
        super();
        this.nombre = "platano";
        this.puntosAtaque = [8, 12, 24, 4, 2];
    }
}

class Fresa extends Fruta {
    constructor() {
        super();
        this.nombre = "fresa";
        this.puntosAtaque = [12, 10, 14, 16, 8];
    }
}

class Pera extends Fruta {
    constructor() {
        super();
        this.nombre = "pera";
        this.puntosAtaque = [36, 4, 5, 3, 2];
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
    if (frutas.length == 1) {
        let htmlElement = document.getElementById("displayCharacters");
        let vs = document.createElement("h2");
        vs.innerText = "VS";
        htmlElement.appendChild(vs);
    }
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
    agregarFrutaAcciones(manzana);
}

let addPera = () => {
    let pera = new Pera();
    agregarFrutaAcciones(pera);
}

let addPlatano = () => {
    let platano = new Platano();
    agregarFrutaAcciones(platano);
}

let addFresa = () => {
    let fresa = new Fresa();
    agregarFrutaAcciones(fresa);
}

let eliminarOnclick = (fruta) => {
    document.getElementById(fruta.nombre).removeAttribute("onclick");
}

let eliminarResaltado = (fruta) => {
    document.getElementById(fruta.nombre).classList.remove("hover-effect");
}

// Realiza una serie de acciones cuando el jugador escoge personaje: crea una instancia, eliminar el personaje de los seleccionables y sus efectos, verificar si ya se han seleccionados los dos jugadores:
let agregarFrutaAcciones = (fruta) => {
    addFruta(frutas, fruta);
    displayFrutaInicio(fruta);
    eliminarResaltado(fruta);
    eliminarOnclick(fruta);
    checkArray();
}


// Las frutas seleccionadas están ahora en un array
//fight(players[0], players[1]);

// Función que verifica si alguno de los jugadores tiene PS <= 0;
let checkWinner = (fruta1, fruta2) => {
    if (fruta1.puntosSalud <= 0) {
        document.getElementById("lucha").style.display = "none";
        alert(`${fruta2.nombre} WINS!`);
        document.getElementById("ganador").style.display = "flex";
        let ganador = document.getElementById(fruta2.nombre);
        document.getElementById("fruta-ganadora").appendChild(ganador);
    }
    else if (fruta2.puntosSalud <= 0) {
        document.getElementById("lucha").style.display = "none";
        alert(`${fruta1.nombre} WINS!`);
        document.getElementById("ganador").style.display = "flex";
        let ganador = document.getElementById(fruta1.nombre);
        document.getElementById("fruta-ganadora").appendChild(ganador);

    }
};


// Metodo atacar General
// let atacar = (jugadorAgresor, jugadorAgredido, etiquetaHtml) => {
//     jugadorAgredido.puntosSalud -= jugadorAgresor.puntosAtaque;
//     let ps = `${jugadorAgredido.puntosSalud}%`;
//     if (parseInt(ps) < 0) {
//         document.getElementById(etiquetaHtml).style.width = "0%";
//     } else {
//         document.getElementById(etiquetaHtml).style.width = ps;
//     }
// }

let atacarPlayer1 = () => {
    randomNumber = Math.floor(Math.random() * (5 - 1));
    frutas[1].puntosSalud = frutas[1].puntosSalud - frutas[0].puntosAtaque[randomNumber];
    // console.log(`${frutas[1].nombre} ps: ${frutas[1].puntosSalud}`);
    console.log(frutas[0].puntosAtaque[randomNumber]);
    let ps = `${frutas[1].puntosSalud}%`;
    if (parseInt(ps) < 0) {
        document.getElementById("ps-2").style.width = "0%";
    } else {
        document.getElementById("ps-2").style.width = ps;
    }
    checkWinner(frutas[0], frutas[1]);

}

let atacarPlayer2 = () => {
    randomNumber = Math.floor(Math.random() * (5 - 1));
    frutas[0].puntosSalud = frutas[0].puntosSalud - frutas[1].puntosAtaque[randomNumber];
    // console.log(`${frutas[0].nombre} ps: ${frutas[0].puntosSalud}`);
    console.log(frutas[1].puntosAtaque[randomNumber]);
    let ps = `${frutas[0].puntosSalud}%`;
    if (parseInt(ps) < 0) {
        document.getElementById("ps-1").style.width = "0%";
    } else {
        document.getElementById("ps-1").style.width = ps;
    }

    checkWinner(frutas[0], frutas[1]);
}

let atacar = (jugadorAgresor, jugadorAgredido, etiquetaHtml) => {
    jugadorAgredido.puntosSalud -= jugadorAgresor.puntosAtaque;
    let ps = `${jugadorAgredido.puntosSalud}%`;
    if (parseInt(ps) < 0) {
        document.getElementById(etiquetaHtml).style.width = "0%";
    } else {
        document.getElementById(etiquetaHtml).style.width = ps;
    }
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
        alert("Tienes que escoger 2 frutas");
    }
}


