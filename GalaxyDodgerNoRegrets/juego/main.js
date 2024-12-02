import { DD, pintaDD, DDanimaciones, activaMovimiento, desactivaMovimiento, miDD, inicializarDD} from './personaje.js';
import { Plataforma, plataformas, pintaPlataformas, actualizarGravedad } from './plataformas.js';

window.onload = function() {

    let x=50;        // posición inicial x del rectángulo
    let y=466;      // posición inicial y del rectángulo
    let canvas;     // variable que referencia al elemento canvas del html
    let ctx;        // contexto de trabajo
    let idAnimacion; // id de la animación
    let idAnimacionEnemigo1;
    let idIntervaloPintaTodo;
    let idIntervaloCaida;

    let xEnemigo1Derecha = false;
    let xEnemigo1Izquierda = false;

    let posicionAnimacionEnemigo1 = 0; // Posición del array 0, 1

    let imagen;
    let miEnemigo1;
    let imagenEnemigo1;
    let inicial = 0;
    
    let cancionFondo;

    let botonReiniciar = document.getElementById('botonReiniciar');
    botonReiniciar.disabled = true;

    let muerto = false;

    function reiniciarJuego() {
        miDD.x = 50;
        miDD.y = 466;
        miEnemigo1.x = 500;
        miEnemigo1.y = 466;
        
        contador = 300;
        actualizarContador();
        actualizarCaida();
    }

    function reproducirCancionFondo() {
        cancionFondo = document.getElementById("fondo");
		cancionFondo.volume = 0.1;
		cancionFondo.play();
	}

    let contador = 300;
    let vidas = 3;

    function actualizarContador() {
        let contadorElemento = document.getElementById('contador');
        contadorElemento.textContent = contador;

        if (contador <= 0) {
            quitarVida();
            contador = 300;
        } else if (vidas === 0) {
            morir();
        }
    }

    function actualizarCaida() {
        if (miDD.y > 590) {
            quitarVida();
        }
    }

    function iniciarContador() {
        if (vidas > 0) {
            contador--;
            actualizarContador();
            setTimeout(iniciarContador, 1000);
        } else if (vidas === 0) {
            contador = 300;
            actualizarContador();
        }
    }

    function quitarVida() {
        if (vidas > 0) {
            let vida = document.getElementById(`vida${vidas}`);
            vida.style.visibility = 'hidden';
            vidas--;
            reiniciarJuego();
            console.log(vidas);
        }
    }

    function restablecerVidas() {
        for (let i = 1; i <= 3; i++) {
            let vida = document.getElementById(`vida${i}`);
            vida.style.visibility = 'visible';
        }
    }

    function morir() {
        if (vidas === 0) {
            botonReiniciar.disabled = false;
            muerto = true;
            clearInterval(idIntervaloPintaTodo);
            console.log("Has muerto");
        }
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
    
    function pintaEnemigo1() {

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

    function pintaTodo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        actualizarGravedad(miDD);
        
        // Pintar las plataformas
        pintaPlataformas(ctx);
    
        // Pintar el enemigo
        pintaEnemigo1();
    
        // Pintar el personaje
        pintaDD(ctx);
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

    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", desactivaMovimiento, false);

    document.getElementById('botonIniciar').addEventListener('click', iniciarJuego);
    document.getElementById('botonReiniciar').addEventListener('click', Reiniciar);

    function iniciarJuego() {
        canvas = document.getElementById('miCanvas');
        ctx = canvas.getContext('2d');
        muerto = false;
        let botonIniciar = document.getElementById('botonIniciar');
        canvas.style.backgroundImage = "url(assets/srpites/fondos/fondo1.png)";
        console.log("Juego iniciado");
        botonIniciar.disabled = true;
    
        iniciarContador();
            
        imagen = new Image();
        imagen.src = "assets/srpites/DD/spriteSheet.png";
        DD.prototype.imagen = imagen;
    
        imagenEnemigo1 = new Image();
        imagenEnemigo1.src = "assets/srpites/Enemigos/Enemigo1SpriteSheet (1).png";
        Enemigo1.prototype.imagenEnemigo1 = imagenEnemigo1;
        
        inicializarDD(50, 466);  
        miEnemigo1 = new Enemigo1(150, 466);

        actualizarCaida();
    
        reproducirCancionFondo();
        
        // Lanzamos la animación del personaje y del suelo
        
        idIntervaloPintaTodo = setInterval(pintaTodo, 1000 / 30);
        idIntervaloCaida = setInterval(actualizarCaida, 1000 / 30);
        
        // Animación encargada de animar al personaje
        idAnimacion = setInterval(DDanimaciones, 1000 / 4);
        idAnimacionEnemigo1 = setInterval(Enemigo1animaciones, 1000 / 3);
    }

    function Reiniciar() {
        console.log("Juego reiniciado");
        botonReiniciar.disabled = true;
        vidas = 3;
        clearInterval(idAnimacion);
        clearInterval(idAnimacionEnemigo1);
        clearInterval(idIntervaloPintaTodo);
        restablecerVidas();
        iniciarJuego();
    }
}

