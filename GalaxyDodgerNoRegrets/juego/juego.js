window.onload = function() { 
    
    const TOPEDERECHA = 570;
    const TOPEIZQUIERDA = 0;
    const TOPEABAJO = 570;
    const TOPEARRIBA = 0;

    let x=50;        // posición inicial x del rectángulo
    let y=466;      // posición inicial y del rectángulo
    let canvas;     // variable que referencia al elemento canvas del html
    let ctx;        // contexto de trabajo
    let idPersonaje, idSuelo, idAnimacionDerecha, idAnimacionCaDerecha, idAnimacionAgachadoDerecha, idAnimacionSaltoDerecha, idAnimacionCaerDerecha, idAnimacionIzquierda, idAnimacionCaIzquierda, idAnimacionAgachadoIzquierda, idAnimacionSaltoIzquierda;   // id de la animación

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

    let posicion = 0;   // Posición del array 0, 1

    let miDD;
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
            [124, 202] // Animación salto descendente izquierda
        ]; // Posiciones del sprite donde recortar cada imagen
        this.velocidad = 7;
        this.velocidadX = 0;
        this.velocidadY = 0;
        this.tamañoX   = 26;
        this.tamañoY   = 74;
        this.enSuelo   = false;
        this.gravedad = 2;
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
        }
    }

    DD.prototype.generaPosicionIzquierda = function() {
        this.velocidadX = -this.velocidad;
        this.x += this.velocidadX;
        if (this.x < TOPEIZQUIERDA) {
            this.x = TOPEIZQUIERDA;   
        }
    }

    DD.prototype.generaPosicionArriba = function() {
        if (this.enSuelo) {
            this.velocidadY = -28;
            this.enSuelo = false;
        }
        if (this.x > TOPEDERECHA) {
            this.x = TOPEDERECHA;
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
    

    function pintaSuelo() {
        // Pintamos el suelo
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(miSuelo.posicionSueloX,miSuelo.posicionSueloY,miSuelo.tamañoSueloX,miSuelo.tamañoSueloY);
    }

    function DDanimaciones() {
        let framesParado = 3;
        let framesCaminando = 6;
        let framesAgachado = 3;
    
        if (xParadoDerecha && miDD.enSuelo) { // Parado derecha
            inicial = 0;
            posicion = inicial + (posicion + 1) % framesParado;
        } else if (xCaDerecha) { // Caminar derecha
            inicial = 6;
            posicion = inicial + (posicion + 1) % framesCaminando;
            miDD.tamañoX = 58;
            miDD.tamañoY = 74;
        } else if (yArribaDerecha && !miDD.enSuelo && miDD.velocidadY < -5) { // Salto ascendente derecha
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
                if (miDD.enSuelo) {
                    if (xParadoDerecha || xCaDerecha) {
                        xParadoDerecha = false;
                        xCaDerecha = false;
                        yArribaDerecha = true;
                        if (!idAnimacionSaltoDerecha) {
                            idAnimacionSaltoDerecha = setInterval(DDanimaciones, 1000 / 4);
                        }
                    } else if (xParadoIzquierda || xCaIzquierda) {
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
                        clearInterval(idAnimacionAgachadoDerecha);
                        idAnimacionAgachadoDerecha = setInterval(DDanimaciones, 1000 / 4);
                    }
                } else if (xParadoIzquierda) {
                    xParadoIzquierda = false;
                    yAbajoIzquierda = true;
                    if (!idAnimacionAgachadoIzquierda) {
                        clearInterval(idAnimacionAgachadoIzquierda);
                        idAnimacionAgachadoIzquierda = setInterval(DDanimaciones, 1000 / 4);
                    }
                }
                break;
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
                xParadoDerecha = !xCaIzquierda && !yArribaDerecha && !yAbajoDerecha;
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
                yArribaDerecha = false;
                yArribaIzquierda = false;
                if (!miDD.enSuelo && miDD.velocidadY >= -5 && yArribaDerecha) {
                    yCaerDerecha = true;
                    yArribaDerecha = false;
                } else if (!miDD.enSuelo && miDD.velocidadY >= -5 && yArribaIzquierda) {
                    yCaerIzquierda = true;
                    yArribaIzquierda = false;
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
        }
    }  

    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", desactivaMovimiento, false); 

    // Localizamos el canvas
    canvas = document.getElementById("miCanvas");

    // Generamos el contexto de trabajo
    ctx = canvas.getContext("2d");

    imagen = new Image();
    imagen.src = "assets/srpites/spriteSheet.png";
    DD.prototype.imagen = imagen;

    miDD = new DD(x, y);        

    // Lanzamos la animación
    idPersonaje = setInterval(pintaRectangulo, 1000 / 30);
    idSuelo = setInterval(pintaSuelo, 1000 / 30);   

    // Animación encargada de abrir y cerrar la boca
    idAnimacion = setInterval(DDanimaciones, 1000 / 4);
}
