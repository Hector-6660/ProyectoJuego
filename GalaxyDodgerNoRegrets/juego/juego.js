window.onload = function() { 
    
    const TOPEDERECHA = 570;
    const TOPEIZQUIERDA = 0;
    const TOPEABAJO = 570;
    const TOPEARRIBA = 0;

    let x=225;        // posición inicial x del rectángulo
    let y=225;      // posición inicial y del rectángulo
    let canvas;     // variable que referencia al elemento canvas del html
    let ctx;        // contexto de trabajo
    let idPersonaje, idSuelo, idAnimacionDerecha, idAnimacionCaDerecha, idAnimacionAgachadoDerecha, idAnimacionSaltoDerecha, idAnimacionIzquierda, idAnimacionCaIzquierda, idAnimacionAgachadoIzquierda, idAnimacionSaltoIzquierda;   // id de la animación

    let xParadoDerecha = true;
    let xParadoIzquierda = false;
    let xCaDerecha = false;
    let xCaIzquierda = false;
    let yArriba = false;
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
			[236, 102], // Animación salto ascendente derecha
            [236, 102], // Animación salto descendente izquierda
            [236, 102], // Animación salto ascendente derecha
            [236, 102] // Animación salto descendente izquierda
        ]; // Posiciones del sprite donde recortar cada imagen
        this.velocidad = 7;
        this.tamañoX   = 26;
        this.tamañoY   = 74;
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
        if (xParadoDerecha) {
            miDD.generaPosicionParado();
        }
        if (xCaDerecha) {
            miDD.generaPosicionDerecha();
        }
        if (xCaIzquierda) {
            miDD.generaPosicionIzquierda();
        }
        if (yArriba) {
            miDD.generaPosicionArriba();
        }
        if (yAbajoDerecha) {
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
		let framesParado = 3;
		let framesCaminando = 6;
		let framesAgachado = 3;
			
		if (xParadoDerecha) {
			inicial = 0;
			posicion = inicial + (posicion + 1) % framesParado;
		} else if (xCaDerecha) {
			inicial = 6;
			posicion = inicial + (posicion + 1) % framesCaminando;
            miDD.tamañoX = 58;
            miDD.tamañoY = 74;
		} else if (yAbajoDerecha) {
			inicial = 18;
			posicion = inicial + (posicion + 1) % framesAgachado;
            miDD.tamañoX = 36;
            miDD.tamañoY = 74;
        } else if (xParadoIzquierda) {
            inicial = 3;
			posicion = inicial + (posicion + 1) % framesParado;
		} else if (xCaIzquierda) {
			inicial = 12;
			posicion = inicial + (posicion + 1) % framesCaminando;
            miDD.tamañoX = 58;
            miDD.tamañoY = 74;
		} else if (yAbajoaIzquierda) {
			inicial = 21;
			posicion = inicial + (posicion + 1) % framesAgachado;
            miDD.tamañoX = 36;
            miDD.tamañoY = 74;
        }
    }

    function activaMovimiento(evt) {
        switch (evt.keyCode) {
            // Right arrow.
            case 39:
                xParadoDerecha = false;
                xCaDerecha = true;
				if (!idAnimacionCaDerecha) {
					idAnimacionCaDerecha = setInterval(DDanimaciones, 1000 / 7);
				}
                break;
            // Left arrow.
            case 37:
                xParadoDerecha = false;
                xParadoIzquierda = false;
                xCaIzquierda = true;
                if (!idAnimacionCaIzquierda) {
					idAnimacionCaIzquierda = setInterval(DDanimaciones, 1000 / 7);
				}
                break;
            // Up arrow.
            case 38:
                xParadoDerecha = false;
                yArriba = true;
				if (!idAnimacionSaltoDerecha) {
					idAnimacionSaltoDerecha = setInterval(DDanimaciones, 1000 / 1);
				}
                break;
            // Down arrow.
            case 40:
                xParadoDerecha = false;
                yAbajoDerecha = true;
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
                xCaDerecha = false;
				if (!xCaDerecha) {
					clearInterval(idAnimacionCaDerecha);
					idAnimacionCaDerecha = null;
				}
                xParadoDerecha = !xCaIzquierda && !yArriba && !yAbajoDerecha;
                break;
            // Left arrow.
            case 37:
                xCaIzquierda = false;
                if (!xCaIzquierda) {
					clearInterval(idAnimacionCaIzquierda);
					idAnimacionCaIzquierda = null;
				}
                xParadoIzquierda = true;
                xParadoDerecha = false;
                break; 
            // Up arrow.
            case 38:
                yArriba = false;
				if (!yArriba) {
					clearInterval(idAnimacionSaltoDerecha);
					idAnimacionSaltoDerecha = null;
				}
                xParadoDerecha = !xCaDerecha && !xCaIzquierda && !yAbajoDerecha;
                break;
            // Down arrow.
            case 40:
                yAbajoDerecha = false;
				if (!yAbajoDerecha) {
					clearInterval(idAnimacionAgachadoDerecha);
					idAnimacionAgachadoDerecha = null;
				}
                xParadoDerecha = !xCaDerecha && !xCaIzquierda && !yArriba;
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
