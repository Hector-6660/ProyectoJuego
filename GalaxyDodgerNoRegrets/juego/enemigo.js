import { plataformas } from './plataformas.js';

const TOPEDERECHA = 570;
const TOPEIZQUIERDA = 0;
const TOPEABAJO = 570;
const TOPEARRIBA = 0;

let inicial;
let idPersonaje, idEnemigo1, idSuelo, idAnimacionDerecha, idAnimacionCaDerecha, idAnimacionAgachadoDerecha, idAnimacionSaltoDerecha, idAnimacionCaerDerecha, idAnimacionCorrerDerecha, idAnimacionIzquierda, idAnimacionCaIzquierda, idAnimacionAgachadoIzquierda, idAnimacionSaltoIzquierda, idAnimacionCaerIzquierda, idAnimacionCorrerIzquierda;   // id de la animación

let xEnemigo1Derecha = false;
let xEnemigo1Izquierda = false;

let posicionAnimacionEnemigo1 = 0;   // Posición del array 0, 1

let miEnemigo1 = null;

function inicializarEnemigo(x, y) {
    miEnemigo1 = new Enemigo1(x, y);
}

function Enemigo1 (x_, y_) {
    this.x = x_;
    this.y = y_;
    this.animacionEnemigo1 = [
        [16,14], [116,14], [16,114], //Animación del enemigo 1 Derecha
        [114,114], [14,214], [114,214] //Animación del enemigo 1 Izquierda
    ];
    this.velocidad = 5;
    this.tamañoX = 70;
    this.tamañoY = 72;
    this.direccion = 1;
}

function pintaEnemigo1(ctx) {
    if (!miEnemigo1) {
        return;
    }

    miEnemigo1.x += 4 * miEnemigo1.direccion;

    plataformas.forEach(plataforma => {
        if (miEnemigo1.x + miEnemigo1.tamañoX >= plataforma.x + plataforma.tamañoSueloX) {
            miEnemigo1.direccion = -1;
            xEnemigo1Derecha = false;
            xEnemigo1Izquierda = true;
        } else if (miEnemigo1.x <= plataforma.x) {
            miEnemigo1.direccion = 1;
            xEnemigo1Izquierda = false;
            xEnemigo1Derecha = true;
        }
    });

    ctx.drawImage(miEnemigo1.imagenEnemigo1,
        miEnemigo1.animacionEnemigo1[posicionAnimacionEnemigo1][0],
        miEnemigo1.animacionEnemigo1[posicionAnimacionEnemigo1][1],
        miEnemigo1.tamañoX,
        miEnemigo1.tamañoY,
        miEnemigo1.x,
        miEnemigo1.y,
        miEnemigo1.tamañoX,
        miEnemigo1.tamañoY);
}

function Enemigo1animaciones() {
    let framesEnemigo1 = 3;

    if (xEnemigo1Derecha) {
        inicial = 0;
        posicionAnimacionEnemigo1 = inicial + (posicionAnimacionEnemigo1 + 1) % framesEnemigo1;
    } else if (xEnemigo1Izquierda) {
        inicial = 3;
        posicionAnimacionEnemigo1 = inicial + (posicionAnimacionEnemigo1 + 1) % framesEnemigo1;
    }
}

export { Enemigo1, pintaEnemigo1, Enemigo1animaciones, miEnemigo1, inicializarEnemigo };