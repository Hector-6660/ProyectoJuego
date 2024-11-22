﻿window.onload = function() { 
    
    const TOPEDERECHA = 570;
    const TOPEIZQUIERDA = 0;
    const TOPEABAJO = 570;
    const TOPEARRIBA = 0;

    let x=50;        // posición inicial x del rectángulo
    let y=466;      // posición inicial y del rectángulo
    let canvas;     // variable que referencia al elemento canvas del html
    let ctx;        // contexto de trabajo
    let idPersonaje, idEnemigo1, idSuelo, idAnimacionDerecha, idAnimacionCaDerecha, idAnimacionAgachadoDerecha, idAnimacionSaltoDerecha, idAnimacionCaerDerecha, idAnimacionCorrerDerecha, idAnimacionIzquierda, idAnimacionCaIzquierda, idAnimacionAgachadoIzquierda, idAnimacionSaltoIzquierda, idAnimacionCaerIzquierda, idAnimacionCorrerIzquierda;   // id de la animación

    let xParadoDerecha = true;
    let xParadoIzquierda = false;
    let xCaDerecha = false;
    let xCaIzquierda = false;
    let yArribaDerecha = false;
    let yCaerDerecha = false;
    let yArribaIzquierda = false;
    let yCaerIzquierda = false;
    let yAbajoDerecha = false;
    let yAbajoIzquierda = false;
    let xCorrerDerecha = false;
    let xCorrerIzquierda = false;

    let posicion = 0;   // Posición del array 0, 1

    let miDD;
    let miEnemigo1;
    let miSuelo = {
        posicionSueloX: 0,
        posicionSueloY: 540,
        tamañoSueloX: 600,
        tamañoSueloY: 60,
    };
    let imagen;
    let inicial = 0;

    function DD (x_, y_) {
        this.x = x_;
        this.y = y_;
        this.animacionDD = [
            [36, 12], [136, 12], [236, 12], // Animación parado derecha
            [336, 12], [436, 12], [536, 12], // Animación parado izquierda
            [320, 212], [420, 212], [520, 212], [620, 212], [720, 212], [20, 312], // Animación caminando derecha
            [120, 312], [220, 312], [320, 312], [420, 312], [520, 312], [620, 312], // Animación caminando izquierda
			[730, 12], [30, 112], [130, 112], // Animación agachado derecha
            [230, 112], [330, 112], [430, 112], // Animación agachado izquierda
			[636, 102], // Animación salto ascendente derecha
            [728, 102], // Animación salto descendente derecha
            [28, 202], // Animación salto ascendente izquierda
            [124, 202], // Animación salto descendente izquierda
            [16,412],[114,412],[216,412],[312,412], // Animación correr derecha
            [414,412],[516,412],[614,412],[718,412] // Animación correr izquierda
        ]; // Posiciones del sprite donde recortar cada imagen
        this.velocidad = 7;
        this.velocidadX = 0;
        this.velocidadY = 0;
        this.tamañoX   = 26;
        this.tamañoY   = 74;
        this.enSuelo   = false;
        this.gravedad = 2;
    }

    function Enemigo1 (x_, y_) {
        this.x = x_;
        this.y = y_;
        this.animacionEnemigo1 = [];
        this.velocidad = 5;
        this.tamañoX = 50;
        this.tamañoY = 50;
        this.imagenEnemigo1;
    }

    DD.prototype.actualizarGravedad = function() {
        // Aplicar gravedad
        if (!this.enSuelo) {
            this.velocidadY += this.gravedad;
            this.y += this.velocidadY;
            this.x += this.velocidadX;
        }
    
        // Verificar colisión con el suelo
        if (this.y + this.tamañoY > miSuelo.posicionSueloY) {
            this.y = miSuelo.posicionSueloY - this.tamañoY;
            this.velocidadY = 0;
            this.velocidadX = 0;
            this.enSuelo = true;
            yArribaDerecha = false;
            yCaerDerecha = false;
            yArribaIzquierda = false;
            yCaerIzquierda = false;
        }
    }
    

    DD.prototype.generaPosicionParado = function() {
        if (this.x > TOPEDERECHA) {
            this.x = TOPEDERECHA;
        }
    }

    DD.prototype.generaPosicionDerecha = function() {
        this.velocidadX = this.velocidad;
        this.x += this.velocidadX;
        if (this.x > TOPEDERECHA) {
            this.x = TOPEDERECHA;
        } else if (this.x < TOPEIZQUIERDA) {
            this.x = TOPEIZQUIERDA;
        }
    }

    DD.prototype.generaPosicionIzquierda = function() {
        this.velocidadX = -this.velocidad;
        this.x += this.velocidadX;
        if (this.x < TOPEIZQUIERDA) {
            this.x = TOPEIZQUIERDA;   
        } else if (this.x > TOPEDERECHA) {
            this.x = TOPEDERECHA;
        }
    }

    DD.prototype.generaPosicionArriba = function() {
        if (this.enSuelo) {
            this.velocidadY = -28;
            this.enSuelo = false;
        }
        if (this.x > TOPEDERECHA) {
            this.x = TOPEDERECHA;
        } else if (this.x < TOPEIZQUIERDA) {
            this.x = TOPEIZQUIERDA;
        }
    }    

    DD.prototype.generaPosicionAbajo = function() {
        if (this.y + this.tamañoY > miSuelo.posicionSueloY) {
            this.y = miSuelo.posicionSueloY - this.tamañoY;
            this.enSuelo = true;
        } else {
            this.enSuelo = false;
        }
    }

    function pintaRectangulo() {
        // Borramos el canvas
        ctx.clearRect(0, 0, 600, 600);
    
        miDD.actualizarGravedad();
    
        if (xParadoDerecha && miDD.enSuelo) {
            miDD.generaPosicionParado();
        }
        if (xCaDerecha) {
            miDD.generaPosicionDerecha();
        }
        if (xCaIzquierda) {
            miDD.generaPosicionIzquierda();
        }
        if (yArribaDerecha) {
            miDD.generaPosicionArriba();
        }
        if (xCorrerDerecha) {
            miDD.generaPosicionDerecha();
        }
        if (xCorrerIzquierda) {
            miDD.generaPosicionIzquierda();
        }
        if (yArribaIzquierda) {
            miDD.generaPosicionArriba();
        }
    
        // Pintamos el personaje
        ctx.drawImage(miDD.imagen, // Imagen completa con todos los sprites
            miDD.animacionDD[posicion][0],    // Posicion X del sprite donde se encuentra el recorte
            miDD.animacionDD[posicion][1],    // Posicion Y del sprite donde se encuentra el recorte
            miDD.tamañoX,           // Tamaño X del recorte
            miDD.tamañoY,           // Tamaño Y del recorte
            miDD.x,                // Posicion x en el canvas
            miDD.y,                         // Posicion y en el canvas
            miDD.tamañoX,           // Tamaño X para dibujar en el canvas
            miDD.tamañoY);         // Tamaño Y para dibujar en el canvas
    }
    
    function pintaEnemigo1() {
        ctx.clearRect(0, 0, 600, 600);

        if (xCaDerecha) {
            miEnemigo1.generaPosicionDerecha();
        }
        if (xCaIzquierda) {
            miEnemigo1.generaPosicionIzquierda();
        }

        ctx.drawImage(miEnemigo1.imagenEnemigo1,
            miEnemigo1.animacionEnemigo1[posicion][0],
            miEnemigo1.animacionEnemigo1[posicion][1],
            miEnemigo1.tamañoX,
            miEnemigo1.tamañoY,
            miEnemigo1.x,
            miEnemigo1.y,
            miEnemigo1.tamañoX,
            miEnemigo1.tamañoY);
    }

    function pintaSuelo() {
        // Pintamos el suelo
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(miSuelo.posicionSueloX,miSuelo.posicionSueloY,miSuelo.tamañoSueloX,miSuelo.tamañoSueloY);
    }

    function DDanimaciones() {
        let framesParado = 3;
        let framesCaminando = 6;
        let framesAgachado = 3;
        let framesCorriendo = 4;
    
        if (xParadoDerecha && miDD.enSuelo) { // Parado derecha
            inicial = 0;
            posicion = inicial + (posicion + 1) % framesParado;
        } else if (xCaDerecha) { // Caminar derecha
            inicial = 6;
            posicion = inicial + (posicion + 1) % framesCaminando;
            miDD.tamañoX = 58;
            miDD.tamañoY = 74;
        } else if (yArribaDerecha && miDD.velocidadY < -5) { // Salto ascendente derecha
            inicial = 24;
            posicion = inicial;
            miDD.tamañoX = 50;
            miDD.tamañoY = 84;
        } else if (yCaerDerecha && !miDD.enSuelo && miDD.velocidadY >= -5) { // Salto descendente derecha
            inicial = 25;
            posicion = inicial;
            miDD.tamañoX = 50;
            miDD.tamañoY = 74;
        } else if (yAbajoDerecha) { // Agachado derecha
            inicial = 18;
            posicion = inicial + (posicion + 1) % framesAgachado;
            miDD.tamañoX = 36;
            miDD.tamañoY = 74;
        } else if (xCorrerDerecha) { // Correr derecha
            inicial = 28;
            posicion = inicial + (posicion + 1) % framesCorriendo;
            miDD.tamañoX = 68;
            miDD.tamañoY = 74;
        } else if (xParadoIzquierda && miDD.enSuelo) { // Parado izquierda
            inicial = 3;
            posicion = inicial + (posicion + 1) % framesParado;
        } else if (xCaIzquierda) { // Caminando izquierda
            inicial = 12;
            posicion = inicial + (posicion + 1) % framesCaminando;
            miDD.tamañoX = 58;
            miDD.tamañoY = 74;
        } else if (yArribaIzquierda && !miDD.enSuelo && miDD.velocidadY < -5) { // Salto ascendente izquierda
            inicial = 26;
            posicion = inicial;
            miDD.tamañoX = 50;
            miDD.tamañoY = 84;
        } else if (yCaerIzquierda && !miDD.enSuelo && miDD.velocidadY >= -5) { // Salto descendente izquierda
            inicial = 27;
            posicion = inicial;
            miDD.tamañoX = 50;
            miDD.tamañoY = 74;
        } else if (yAbajoIzquierda) { // Agachado izquierda
            inicial = 21;
            posicion = inicial + (posicion + 1) % framesAgachado;
            miDD.tamañoX = 50;
            miDD.tamañoY = 74;
        } else if (xCorrerIzquierda) { // Correr izquierda
            inicial = 32;
            posicion = inicial + (posicion + 1) % framesCorriendo;
            miDD.tamañoX = 68;
            miDD.tamañoY = 74;
        }
    }      

    function activaMovimiento(evt) {
        switch (evt.keyCode) {
            // Derecha
            case 39:
                if (miDD.enSuelo) {
                    miDD.velocidad = 7;
                    if (xCaIzquierda) {
                        xCaDerecha = false;
                        xParadoIzquierda = true;
                        miDD.velocidad = 0;
                    } else {
                        xCaIzquierda = false;
                        xParadoDerecha = false;
                        xCaDerecha = true;
                        if (!idAnimacionCaDerecha) {
                            idAnimacionCaDerecha = setInterval(DDanimaciones, 1000 / 7);
                        }
                    }
                } else if (!miDD.enSuelo) {
                    yCaerIzquierda = false;
                    yCaerDerecha = true;
                    miDD.velocidadX = 3;
                }
                break;
            // Izquierda
            case 37:
                if (miDD.enSuelo) {
                    miDD.velocidad = 7;
                    if (xCaDerecha) {
                        xCaIzquierda = false;
                        xParadoDerecha = true;
                        miDD.velocidad = 0;
                    } else {
                        xParadoDerecha = false;
                        xParadoIzquierda = false;
                        xCaIzquierda = true;
                        if (!idAnimacionCaIzquierda) {
                            idAnimacionCaIzquierda = setInterval(DDanimaciones, 1000 / 7);
                        }
                    }
                } else if (!miDD.enSuelo) {
                    yCaerDerecha = false;
                    yCaerIzquierda = true;
                    miDD.velocidadX = -3;
                }
                break;
            // Arriba
            case 38:
                xCorrerDerecha = false;
                xCorrerIzquierda = false;
                if (miDD.enSuelo) {
                    if (xParadoDerecha || xCaDerecha) {
                        xParadoDerecha = false;
                        xCaDerecha = false;
                        yArribaDerecha = true;
                        if (!idAnimacionSaltoDerecha) {
                            idAnimacionSaltoDerecha = setInterval(DDanimaciones, 1000 / 4);
                        }
                    } else if (xParadoIzquierda || xCaIzquierda) {
                        yArribaDerecha = false;
                        xParadoDerecha = false;
                        xCaDerecha = false;
                        xParadoIzquierda = false;
                        xCaIzquierda = false;
                        yArribaIzquierda = true;
                        if (!idAnimacionSaltoIzquierda) {
                            idAnimacionSaltoIzquierda = setInterval(DDanimaciones, 1000 / 4);
                        }
                    }
                    miDD.generaPosicionArriba();
                } else if (!miDD.enSuelo && miDD.velocidadY >= -5) {
                    if (yArribaDerecha) {
                        yCaerIzquierda = false;
                        yCaerDerecha = true;
                        if (!idAnimacionSaltoDerecha) {
                            idAnimacionSaltoDerecha = setInterval(DDanimaciones, 1000 / 4);
                        }
                    } else if (yArribaIzquierda) {
                        yCaerDerecha = false;
                        yCaerIzquierda = true;
                        if (!idAnimacionSaltoIzquierda) {
                            idAnimacionSaltoIzquierda = setInterval(DDanimaciones, 1000 / 4);
                        }
                    }
                    miDD.generaPosicionArriba();
                }
                break;
            // Abajo
            case 40:
                if (xParadoDerecha) {
                    xParadoDerecha = false;
                    yAbajoDerecha = true;
                    if (!idAnimacionAgachadoDerecha) {
                        idAnimacionAgachadoDerecha = setInterval(DDanimaciones, 1000 / 4);
                    }
                } else if (xParadoIzquierda) {
                    xParadoIzquierda = false;
                    yAbajoIzquierda = true;
                    if (!idAnimacionAgachadoIzquierda) {
                        idAnimacionAgachadoIzquierda = setInterval(DDanimaciones, 1000 / 4);
                    }
                }
                break;
            // Correr
            case 88:
                if (miDD.enSuelo) {
                    if (xParadoDerecha || xParadoIzquierda) {
                        miDD.velocidad = 12;
                    } else if (xCaDerecha && miDD.enSuelo) {
                        xCorrerDerecha = true;
                        xCorrerIzquierda = false;
                        xCaDerecha = false;
                        miDD.velocidad = 12; 
                        if (!idAnimacionCorrerDerecha) {
                            idAnimacionCorrerDerecha = setInterval(DDanimaciones, 1000 / 10);
                        }
                    } else if (xCaIzquierda && miDD.enSuelo) {
                        xCorrerIzquierda = true;
                        xCorrerDerecha = false;
                        xCaIzquierda = false;
                        miDD.velocidad = 12;
                        if (!idAnimacionCorrerIzquierda) {
                            idAnimacionCorrerIzquierda = setInterval(DDanimaciones, 1000 / 10);
                        }
                    }
                } else {
                    miDD.velocidad = 7;
                    xCorrerDerecha = false;
                    xCorrerIzquierda = false;
                    if (yArribaDerecha) {
                        yArribaDerecha = false;
                        yCaerDerecha = true;
                        console.log(xCorrerDerecha);
                        if (!idAnimacionCaerDerecha) {
                            idAnimacionCaerDerecha = setInterval(DDanimaciones, 1000 / 4);
                        }
                    } else if (yArribaIzquierda) {
                        yArribaIzquierda = false;
                        yCaerIzquierda = true;
                        if (!idAnimacionCaerIzquierda) {
                            idAnimacionCaerIzquierda = setInterval(DDanimaciones, 1000 / 4);
                        }
                    }
                }
        }
    }

    function desactivaMovimiento(evt) {
        switch (evt.keyCode) {
            // Derecha
            case 39:
                xCaDerecha = false;
                if (!xCaDerecha) {
                    clearInterval(idAnimacionCaDerecha);
                    idAnimacionCaDerecha = null;
                    miDD.velocidadX = 0;
                }
                if (!miDD.enSuelo && miDD.velocidadY >= -5) {
                    yCaerDerecha = false;
                    xParadoDerecha = true;
                }
                xParadoIzquierda = false;
                xParadoDerecha = true;
                break;
            // Izquierda
            case 37:
                xCaIzquierda = false;
                if (!xCaIzquierda) {
                    clearInterval(idAnimacionCaIzquierda);
                    idAnimacionCaIzquierda = null;
                    miDD.velocidadX = 0;
                    xParadoIzquierda = true;
                }
                if (!miDD.enSuelo && miDD.velocidadY >= -5) {
                    yCaerIzquierda = true;
                    yCaerDerecha = false;
                    xParadoIzquierda = true;
                }
                if (yAbajoIzquierda) {
                    xParadoIzquierda = false;
                    xParadoDerecha = false;
                } else {
                    xParadoIzquierda = true;
                    xParadoDerecha = !xParadoIzquierda;
                }
                break;
            // Arriba
            case 38:
                xCorrerDerecha = false;
                xCorrerIzquierda = false;
                if (!miDD.enSuelo && miDD.velocidadY >= -5) {
                    if (yArribaDerecha) {
                        yArribaDerecha = false;
                        yCaerIzquierda = false;
                        yCaerDerecha = true;
                        if (!idAnimacionCaerDerecha) {
                            idAnimacionCaerDerecha = setInterval(DDanimaciones, 1000 / 4);
                        }
                    } else if (yArribaIzquierda) {
                        yArribaIzquierda = false;
                        yCaerDerecha = false;
                        yCaerIzquierda = true;
                        if (!idAnimacionCaerIzquierda) {
                            idAnimacionCaerIzquierda = setInterval(DDanimaciones, 1000 / 4);
                        }
                    }
                } else if (!miDD.enSuelo && miDD.velocidadY >= -5 && !yArribaDerecha) {
                    clearInterval(idAnimacionSaltoDerecha);
                    idAnimacionSaltoDerecha = null;
                }
                if (yCaerDerecha) {
                    xParadoDerecha = true;
                } else if (yCaerIzquierda) {
                    xParadoIzquierda = true;
                }
                break;
            // Abajo
            case 40:
                if (yAbajoDerecha) {
                    yAbajoDerecha = false;
                    if (!yAbajoDerecha) {
                        clearInterval(idAnimacionAgachadoDerecha);
                        idAnimacionAgachadoDerecha = null;
                    }
                } else if (yAbajoIzquierda) {
                    yAbajoIzquierda = false;
                    if (!yAbajoIzquierda) {
                        clearInterval(idAnimacionAgachadoIzquierda);
                        idAnimacionAgachadoIzquierda = null;
                    }
                    xParadoIzquierda = true;
                }
                xParadoDerecha = !xCaDerecha && !xCaIzquierda && !yArribaDerecha && !xParadoIzquierda;
                break;
            // Correr
            case 88:
                xCorrerDerecha = false;
                xCorrerIzquierda = false;
                miDD.velocidad = 7;
                clearInterval(idAnimacionCorrerDerecha);
                idAnimacionCorrerDerecha = null;
                clearInterval(idAnimacionCorrerIzquierda);
                idAnimacionCorrerIzquierda = null;
        }
    }  

    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", desactivaMovimiento, false); 

    document.getElementById('botonIniciar').addEventListener('click', iniciarJuego);

    function iniciarJuego() {
        canvas = document.getElementById('miCanvas');
        ctx = canvas.getContext('2d');
        let botonIniciar = document.getElementById('botonIniciar');
        canvas.style.backgroundImage = "url(assets/srpites/ciudad/10.png)";
        console.log("Juego iniciado");
        botonIniciar.disabled = true;
            
        imagen = new Image();
        imagen.src = "assets/srpites/DD/spriteSheet.png";
        DD.prototype.imagen = imagen;
        
        miDD = new DD(x, y);        
        
        // Lanzamos la animación del personaje y del suelo
        idPersonaje = setInterval(pintaRectangulo, 1000 / 30);
        idSuelo = setInterval(pintaSuelo, 1000 / 30);   
        
        // Animación encargada de animar al personaje
        idAnimacion = setInterval(DDanimaciones, 1000 / 4);
    }
}
