// La banda sonora
let audioTitulo = new Audio("./sounds/title_screen.mp3");
let audioSelect = new Audio("./sounds/player_select.mp3");
let audioVs = new Audio("./sounds/vs_screen.mp3");
let audioBatalla = new Audio("./sounds/fight.mp3");
let audioFinal = new Audio("./sounds/final_screen.mp3");

// Reproduccion automatica del audio en la pantalla de inicio
audioTitulo.play();

const jugadores = 2;

// Personajes de frutas: la clase padre
class Fruta {
    constructor() {
        this.puntosSalud = 100;
        this.ataques = [];
        this.id = Fruta.id++;
    }
}

// Las clases que darán lugar a las frutas que luchan.
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

// Comenzar el juego. Lleva a la pantalla de seleccion de personajes. Detiene la musica de inicio y reproduce el audio de la pantalla de selección.
let comenzar = () => {
    document.getElementById("comenzar").style.display = "none";
    document.getElementById("inicio").style.display = "flex";
    audioTitulo.pause();
    audioTitulo.currentTime = 0;
    audioSelect.play();
}

// Función que agrega una fruta al array de frutas
const addFruta = (arrayFrutas, fruta) => {
    arrayFrutas.push(fruta);
}

// Cambiar la fruta escogida a seleccionada. Esto nos mueve el elemento html a otra parte y nos elimina la capacidad de volver a seleccionarla.
const displayFrutaInicio = (fruta) => {
    let htmlElement = document.getElementById("displayCharacters");
    htmlElement.appendChild(document.getElementById(fruta.nombre));

    // Si es el primer personaje que escogemos, nos añade el texto vs
    if (frutas.length == 1) {
        let htmlElement = document.getElementById("displayCharacters");
        let vs = document.createElement("h2");
        vs.setAttribute("id", "vs");
        vs.innerText = "VS";
        htmlElement.appendChild(vs);
    }
}

// Función que verifica si hemos elegido el numero correcto de frutas. De lo contrario, no suelta un alert.
const checkArray = () => {
    if (frutas.length == jugadores) {
        document.getElementById("opciones-frutas").style.display = "none";
        audioSelect.pause();
        audioSelect.currentTime = 0;
        audioVs.play();
        return true;
    }
    else false;
}

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

// Funcion que elimina
let eliminarOnclick = (fruta) => {
    document.getElementById(fruta.nombre).removeAttribute("onclick");
    document.getElementById(fruta.nombre).classList.remove("hover-effect"); /* */
}

// Realiza una serie de acciones cuando el jugador escoge personaje: crea una instancia, eliminar el personaje de los seleccionables y sus efectos, verificar si ya se han seleccionados los dos jugadores:
let agregarFrutaAcciones = (fruta) => {
    addFruta(frutas, fruta);
    displayFrutaInicio(fruta);
    eliminarOnclick(fruta);
    checkArray();
}

// Función que verifica si alguno de los jugadores tiene PS <= 0; y hace pasar a la pantalla de ganador.
let checkWinner = (fruta1, fruta2) => {
    if (fruta1.puntosSalud <= 0) {
        mostrarPantallaGanador();

        mostrarGanador(fruta2, fruta1);

        audioGanador();

    }
    else if (fruta2.puntosSalud <= 0) {
        mostrarPantallaGanador();

        mostrarGanador(fruta1, fruta2);

        audioGanador();
    }
};

// Nos muestra la fruta ganadora junto con el texto de victoria
let mostrarGanador = (frutaGanadora, frutaPerdedora) => {
    let ganador = document.getElementById(frutaGanadora.nombre);
    document.getElementById("fruta-ganadora").appendChild(ganador);
    ganador.classList.add("formato-ganador");
    let textoFelicitaciones = document.createElement("h4");
    textoFelicitaciones.innerText = `¡Enhorabuena, has exprimido zumo de ${frutaPerdedora.nombre}!`;
    textoFelicitaciones.style.textAlign = "center";
    textoFelicitaciones.setAttribute("id", "texto");
    document.getElementById("fruta-ganadora").appendChild(textoFelicitaciones);
}

// Oculta y muestra elementos html necesarios para mostrar la pantalla del vencedor.
let mostrarPantallaGanador = () => {
    document.getElementById("lucha").style.display = "none";
    document.getElementById("ganador").style.display = "flex";
    document.getElementById("fruta-ganadora").style.display = "flex";
}

// Cambia el audio al pasar a la pantalla de vencedor
let audioGanador = () => {
    audioBatalla.pause();
    audioBatalla.currentTime = 0;
    audioFinal.play();
}

// Ataques de las frutas.
let atacarPlayer1 = () => {
    randomNumber = Math.floor(Math.random() * (5 - 1));
    frutas[1].puntosSalud = frutas[1].puntosSalud - frutas[0].puntosAtaque[randomNumber];
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

// Nos lleva a la pantalla de batalla
const start = () => {
    if (checkArray()) {

        document.getElementById("inicio").style.display = "none";
        document.getElementById("lucha").style.display = "flex";
        displayFrutasLucha();
        audioVs.pause();
        audioVs.currentTime = 0;
        audioBatalla.play();
    }
    else {
        alert("Tienes que escoger 2 frutas");
    }
}

// Al invocar esta función nos lleva a la pantala de selección de personajes
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

    audioFinal.pause();
    audioFinal.currentTime = 0;
    audioSelect.play();
}


