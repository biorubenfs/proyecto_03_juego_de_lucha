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
        // document.getElementById("vs").style.display = "flex";
        let vs = document.createElement("h2");
        vs.setAttribute("id", "vs");
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

// Función que verifica si alguno de los jugadores tiene PS <= 0; y hace pasar a la pantalla de ganador
let checkWinner = (fruta1, fruta2) => {
    if (fruta1.puntosSalud <= 0) {
        console.log("Checkwinner-inicio");
        document.getElementById("lucha").style.display = "none";
        // alert(`${fruta2.nombre} WINS!`);
        document.getElementById("ganador").style.display = "flex";
        let ganador = document.getElementById(fruta2.nombre);
        document.getElementById("fruta-ganadora").style.display = "flex";
        document.getElementById("fruta-ganadora").appendChild(ganador);
        ganador.classList.add("formato-ganador");
        let textoFelicitaciones = document.createElement("h4");
        textoFelicitaciones.innerText = `¡Enhorabuena, has exprimido zumo de ${fruta1.nombre}!`;
        textoFelicitaciones.style.textAlign = "center";
        textoFelicitaciones.setAttribute("id", "texto");
        document.getElementById("fruta-ganadora").appendChild(textoFelicitaciones);
        console.log("Checkwinner-fin");
    }
    else if (fruta2.puntosSalud <= 0) {
        console.log("Checkwinner-inicio");
        document.getElementById("lucha").style.display = "none";
        // alert(`${fruta1.nombre} WINS!`);
        document.getElementById("fruta-ganadora").style.display = "flex";
        document.getElementById("ganador").style.display = "flex";
        let ganador = document.getElementById(fruta1.nombre);
        document.getElementById("fruta-ganadora").appendChild(ganador);
        ganador.classList.add("formato-ganador");
        let textoFelicitaciones = document.createElement("h4");
        textoFelicitaciones.innerText = `¡Enhorabuena, has exprimido zumo de ${fruta2.nombre}!`;
        textoFelicitaciones.style.textAlign = "center";
        textoFelicitaciones.setAttribute("id", "texto");
        document.getElementById("fruta-ganadora").appendChild(textoFelicitaciones);
        console.log("Checkwinner-fin");
    }
};

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

let reiniciar = () => {
    document.getElementById("inicio").style.display = "flex";
    document.getElementById("lucha").style.display = "none";
    document.getElementById("ganador").style.display = "none";

    document.getElementById("inicio").style.display = "flex;"
    document.getElementById("opciones-frutas").style.display = "flex";
    let opciones = document.getElementById("opciones");

    // Traemos las frutas escogidas para reiniciar el juego
    let fruta0 = document.getElementById(frutas[0].nombre);
    let fruta1 = document.getElementById(frutas[1].nombre);

    // Hay que añadir las dos frutas que se han seleccionado.
    opciones.appendChild(fruta0);
    opciones.appendChild(fruta1);

    // Vuelven al tamaño normal
    fruta0.classList.remove("formato-ganador");
    fruta1.classList.remove("formato-ganador");

    // Volvemos a aplicar hover para la pantalla de seleccion de jugadores
    fruta0.classList.add("hover-effect");
    fruta1.classList.add("hover-effect");

    // Agrega de nuevo el atributo para hacer seleccionable los jugadores que acaban de jugar
    document.getElementById("manzana").setAttribute("onclick", "addManzana()");
    document.getElementById("pera").setAttribute("onclick", "addPera()");
    document.getElementById("fresa").setAttribute("onclick", "addFresa()");
    document.getElementById("platano").setAttribute("onclick", "addPlatano()");

    document.getElementById("vs").remove();

    // Restaurar ps de las barras de salud.
    document.getElementById("ps-1").style.width = "100%";
    document.getElementById("ps-2").style.width = "100%";

    document.getElementById("fruta-ganadora").style.display = "none";

    document.getElementById("texto").remove();

    frutas = [];
}


