window.onload = function() { 
    const TOPEDERECHA = 570;
    const TOPEIZQUIERDA = 0;
    const TOPEABAJO = 570;
    const TOPEARRIBA = 0;

    let x=225;        // posición inicial x del rectángulo
    let y=225;      // posición inicial y del rectángulo
    let canvas;     // variable que referencia al elemento canvas del html
    let ctx;        // contexto de trabajo
    let idPersonaje, idSuelo, idAnimacionDerecha, idAnimacionCaDerecha, idAnimacionAgachadoDerecha, idAnimacionSaltoDerecha;   // id de la animación

    let xParado = true;
    let xDerecha = false;
    let xIzquierda = false;
    let yArriba = false;
    let yAbajo = false;

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
            [36,2],[136,2],[236,2], // Animación parado derecha
            [520, 102], [20, 202], [120, 202], [220, 202], [320, 202], [420, 202] // Animación caminando derecha
			[430, 2], [530, 2], [30, 102], // Animación agachado derecha
			[236, 102] // Animación salto derecha
        ]; // Posiciones del sprite donde recortar cada imagen
        this.velocidad = 7;
        this.tamañoX   = 78;
        this.tamañoY   = 84;
        this.enSuelo   = false;
    }

    DD.prototype.generaPosicionParado = function() {
        if (this.x > TOPEDERECHA) {
            this.x = TOPEDERECHA;
        }
    }

    DD.prototype.generaPosicionDerecha = function() {
        this.x = this.x + this.velocidad;
        if (this.x > TOPEDERECHA) {
            this.x = TOPEDERECHA;
        }
    }

    DD.prototype.generaPosicionIzquierda = function() {
        this.x = this.x - this.velocidad;
        if (this.x < TOPEIZQUIERDA) {
            this.x = TOPEIZQUIERDA;   
        }
    }

    DD.prototype.generaPosicionArriba = function() {
        this.y = this.y - this.velocidad;
        if (this.y < TOPEARRIBA) {
            this.y = TOPEARRIBA;   
        }
    }

    DD.prototype.generaPosicionAbajo = function() {
        this.y = this.y + this.velocidad;
        if (this.y > TOPEABAJO) {
            this.y = TOPEABAJO;   
        }
    }

    function pintaRectangulo() {
        // Borramos el canvas
        ctx.clearRect(0, 0, 600, 600);      
        if (xParado) {
            miDD.generaPosicionParado();
        }
        if (xDerecha) {
            miDD.generaPosicionDerecha();
        }
        if (xIzquierda) {
            miDD.generaPosicionIzquierda();
        }
        if (yArriba) {
            miDD.generaPosicionArriba();
        }
        if (yAbajo) {
            miDD.generaPosicionAbajo();
        }

        // Pintamos el comecocos
        ctx.drawImage(miDD.imagen, // Imagen completa con todos los comecocos (Sprite)
            miDD.animacionDD[posicion][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            miDD.animacionDD[posicion][1],    // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            miDD.tamañoX,           // Tamaño X del comecocos que voy a recortar para dibujar
            miDD.tamañoY,           // Tamaño Y del comecocos que voy a recortar para dibujar
            miDD.x,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
            miDD.y,                         // Posicion y de pantalla donde voy a dibujar el comecocos recortado
            miDD.tamañoX,           // Tamaño X del comecocos que voy a dibujar
            miDD.tamañoY);         // Tamaño Y del comecocos que voy a dibujar            
    }

    function pintaSuelo() {
        // Pintamos el suelo
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(miSuelo.posicionSueloX,miSuelo.posicionSueloY,miSuelo.tamañoSueloX,miSuelo.tamañoSueloY);
    }

    function DDanimaciones() {
		let framesDerecha = 3;
		let framesCaDerecha = 6;
		let framesAgachadoDerecha = 3;
		let framesSaltoDerecha = 1;
			
		if (xParado) {
			inicial = 0;
			posicion = inicial + (posicion + 1) % framesDerecha;
		} else if (xDerecha) {
			inicial = 3;
			posicion = inicial + (posicion + 1) % framesCaDerecha;
		} else if (yAbajo) {
			inicial = 10;
			posicion = inicial + (posicion + 1) % framesAgachadoDerecha;
		} else if (yArriba) {
			inicial = 13;
			posicion = inicial + (posicion + 1) % framesSaltoDerecha;
		}
    }

    function activaMovimiento(evt) {
        switch (evt.keyCode) {
            // Right arrow.
            case 39:
                xParado = false;
                xDerecha = true;
				if (!idAnimacionCaDerecha) {
					idAnimacionCaDerecha = setInterval(DDanimaciones, 1000 / 7);
				}
                break;
            // Left arrow.
            case 37:
                xParado = false;
                xIzquierda = true;
                break;
            // Up arrow.
            case 38:
                xParado = false;
                yArriba = true;
				if (!idAnimacionSaltoDerecha) {
					idAnimacionSaltoDerecha = setInterval(DDanimaciones, 1000 / 1);
				}
                break;
            // Down arrow.
            case 40:
                xParado = false;
                yAbajo = true;
				if (!idAnimacionAgachadoDerecha) {
					idAnimacionAgachadoDerecha = setInterval(DDanimaciones, 1000 / 4);
				}
                break;
        }
    }

    function desactivaMovimiento(evt) {
        switch (evt.keyCode) {
            // Right arrow 
            case 39:
                xDerecha = false;
				if (!xDerecha) {
					clearInterval(idAnimacionCaDerecha);
					idAnimacionCaDerecha = null;
				}
                xParado = !xIzquierda && !yArriba && !yAbajo;
                break;
            // Left arrow.
            case 37:
                xIzquierda = false;
                xParado = !xDerecha && !yArriba && !yAbajo;
                break; 
            // Up arrow.
            case 38:
                yArriba = false;
				if (!yArriba) {
					clearInterval(idAnimacionSaltoDerecha);
					idAnimacionSaltoDerecha = null;
				}
                xParado = !xDerecha && !xIzquierda && !yAbajo;
                break;
            // Down arrow.
            case 40:
                yAbajo = false;
				if (!yAbajo) {
					clearInterval(idAnimacionAgachadoDerecha);
					idAnimacionAgachadoDerecha = null;
				}
                xParado = !xDerecha && !xIzquierda && !yArriba;
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
    imagen.src = "assets/srpites/spriteSheet2.png";
    DD.prototype.imagen = imagen;

    miDD = new DD(x, y);        

    // Lanzamos la animación
    idPersonaje = setInterval(pintaRectangulo, 1000 / 30);
    idSuelo = setInterval(pintaSuelo, 1000 / 30);   

    // Animación encargada de abrir y cerrar la boca
    idAnimacion = setInterval(DDanimaciones, 1000 / 4);
}
