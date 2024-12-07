import { niveles } from './niveles.js';
import { DD, pintaDD, DDanimaciones, activaMovimiento, desactivaMovimiento, miDD, inicializarDD} from './personaje.js';
import { Enemigo1, pintaEnemigo1, Enemigo1animaciones, miEnemigo1, inicializarEnemigo } from './enemigo.js';
import { Plataforma, plataformas, pintaPlataformas, actualizarGravedad, actualizarPosicionPersonaje } from './plataformas.js';

window.onload = function() {

    let x=0;        // posición inicial x del rectángulo
    let y=466;      // posición inicial y del rectángulo
    let canvas;     // variable que referencia al elemento canvas del html
    let ctx;        // contexto de trabajo
    let idAnimacion; // id de la animación
    let idAnimacionEnemigo1;
    let idIntervaloPintaTodo;
    let idIntervaloCaida;

    let nivelActual = 0;

    let imagen;
    let imagenEnemigo1;
    let imagenPlataforma;
    let inicial = 0;
    
    let cancionFondo;
    let cancionMuerte;
    let audioVidaPerdida;

    let botonReiniciar = document.getElementById('botonReiniciar');
    botonReiniciar.disabled = true;

    let muerto = false;

    function cargarNivel(nivel) {
        let configuracionNivel = niveles[nivel];
        
        canvas.style.backgroundImage = configuracionNivel.imagenFondo;
        
        plataformas.length = 0;
        configuracionNivel.plataformas.forEach(plataforma => {
            plataformas.push(plataforma);
        });
    
        inicializarDD(configuracionNivel.posicionInicialPersonaje.x, configuracionNivel.posicionInicialPersonaje.y);
    
        if (configuracionNivel.enemigos.length > 0) {
            configuracionNivel.enemigos.forEach(enemigo => {
                inicializarEnemigo(enemigo.x, enemigo.y);
            });
        } else {
            inicializarEnemigo(1000, 1000);
        }
    }

    function verificarPuntoFinal() {
        let configuracionNivel = niveles[nivelActual];
        let puntoFinal = configuracionNivel.puntoFinal;
        if (miDD.x < puntoFinal.x + puntoFinal.width &&
            miDD.x + miDD.tamañoX > puntoFinal.x &&
            miDD.y < puntoFinal.y + puntoFinal.height &&
            miDD.y + miDD.tamañoY > puntoFinal.y) {
            nivelActual++;
            if (nivelActual < niveles.length) {
                cargarNivel(nivelActual);
            } else {
                console.log("¡¡Victoria!!");
                clearInterval(idIntervaloPintaTodo);
                detenerCancionFondo();
            }
        }
    }

    function reiniciarJuego() {
        cargarNivel(nivelActual);
        
        contador = 300;
        actualizarContador();
        actualizarCaida();
    }

    function reproducirCancionFondo() {
        cancionFondo = document.getElementById("fondo");
        cancionMuerte = document.getElementById("muerte");
		cancionFondo.volume = 0.1;
		cancionFondo.play();
        if (muerto) {
            cancionMuerte.volume = 0.05;
            cancionMuerte.play();
        } else {
            cancionMuerte.pause();
            cancionMuerte.currentTime = 0;
        }
	}

    function detenerCancionFondo() {
        cancionFondo.pause();
        cancionFondo.currentTime = 0;
    }

    function reproducirAudio() {
        audioVidaPerdida = document.getElementById("vidaPerdida");
		audioVidaPerdida.play();
        audioVidaPerdida.volume = 0.3;
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
            reproducirAudio();
            reiniciarJuego();
            detenerCancionFondo();
            reproducirCancionFondo();
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
            nivelActual = 0;
            detenerCancionFondo();
            clearInterval(idIntervaloPintaTodo);
            canvas.style.backgroundImage = "url(assets/srpites/fondos/pantallaGameOver.png)";
            console.log("Has muerto");
        }
    }

    function pintaTodo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        actualizarGravedad(miDD);
        actualizarPosicionPersonaje(miDD);
        
        // Pintar las plataformas
        pintaPlataformas(ctx);
    
        // Pintar el enemigo
        pintaEnemigo1(ctx);
    
        // Pintar el personaje
        pintaDD(ctx);

        // Verificar si el personaje ha llegado al punto final del nivel
        verificarPuntoFinal();
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

        imagenPlataforma = new Image();
        imagenPlataforma.src = "assets/srpites/fondos/transparente.png";
        Plataforma.prototype.imagenPlataforma = imagenPlataforma;

        cargarNivel(nivelActual);

        actualizarCaida();
    
        reproducirCancionFondo();
        
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

