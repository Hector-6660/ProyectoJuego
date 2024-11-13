// UT4 - Animaciones

window.onload = function() { 

	const TOPEDERECHA = 570;
	const TOPEIZQUIERDA = 0;
	const TOPEABAJO = 570;
	const TOPEARRIBA = 0;

	let x=225;        // posición inicial x del rectángulo
	let y=225;      // posición inicial y del rectángulo
	let canvas;     // variable que referencia al elemento canvas del html
	let ctx;        // contexto de trabajo
	let idPersonaje, idSuelo, idAnimacion;   // id de la animación
	
	let xParado;
	let xDerecha;
	let xIzquierda;
	let yArriba;
	let yAbajo;

	let posicion=0;   // Posición del array 0, 1
	
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
		this.animacionDD = [[18,6],[68,6],[118,6]
		]; // Posiciones del sprite donde recortar cada imagen
		this.velocidad = 8;
		this.tamañoX   = 13;
		this.tamañoY   = 37;
		this.enSuelo   = false;
	
	}

	function reproduciraudio(audio) {

	}
	
	DD.prototype.generaPosicionParado = function() {

		this.x = this.x;
		
		if (this.x > TOPEDERECHA) {
			
			// If at edge, reset ship position and set flag.
			this.x = TOPEDERECHA;
			reproduciraudio();   
		}		
	}

	DD.prototype.generaPosicionDerecha = function() {

		this.x = this.x + this.velocidad;
		
		if (this.x > TOPEDERECHA) {
			
			// If at edge, reset ship position and set flag.
			this.x = TOPEDERECHA;
			reproduciraudio();   
		}		
	}

	DD.prototype.generaPosicionIzquierda = function() {

		this.x = this.x - this.velocidad;
		
		if (this.x < TOPEIZQUIERDA) {
			
			// If at edge, reset ship position and set flag.
			this.x = TOPEIZQUIERDA;   
		}		
	}

	DD.prototype.generaPosicionArriba = function() {

		this.y = this.y - this.velocidad;
		
		if (this.y < TOPEARRIBA) {
			
			// If at edge, reset ship position and set flag.
			this.y = TOPEARRIBA;   
		}		
	}

	DD.prototype.generaPosicionAbajo = function() {

		this.y = this.y + this.velocidad;
		
		if (this.y > TOPEABAJO) {
			
			// If at edge, reset ship position and set flag.
			this.y = TOPEABAJO;   
		}		
	}
	
	function pintaRectangulo() {
		
		// borramos el canvas
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
					  miDD.animacionDD[posicion][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
					  miDD.tamañoX, 		    // Tamaño X del comecocos que voy a recortar para dibujar
					  miDD.tamañoY,	        // Tamaño Y del comecocos que voy a recortar para dibujar
					  miDD.x,                // Posicion x de pantalla donde voy a dibujar el comecocos recortado
					  miDD.y,				            // Posicion y de pantalla donde voy a dibujar el comecocos recortado
					  miDD.tamañoX,		    // Tamaño X del comecocos que voy a dibujar
					  miDD.tamañoY);         // Tamaño Y del comecocos que voy a dibujar			  
	}

	function pintaSuelo() {
		// Pintamos el suelo
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(miSuelo.posicionSueloX,miSuelo.posicionSueloY,miSuelo.tamañoSueloX,miSuelo.tamañoSueloY);
	}
	
	function abreCierraBoca() {
		
		if (xParado) inicial = 0;
		if (xDerecha) inicial = 0;
		if (yArriba) inicial = 6;
		if (xIzquierda) inicial = 4;
		if (yAbajo) inicial = 2;

		posicion = inicial + (posicion + 1) % 3;
		
	}
	
	function activaMovimiento(evt) {

        switch (evt.keyCode) {
		
			// Right arrow.
			case 39:
			  	xDerecha = true;
			  	break;
			// Left arrow.
			case 37:
				xIzquierda = true;
				break;
			// Up arrow.
			case 38:
				yArriba = true;
				break;
			// Down arrow.
			case 40:
				yAbajo = true;
				break;
		}
	}

	function desactivaMovimiento(evt){

        switch (evt.keyCode) {


			// Right arrow 
			case 39:
			  xDerecha = false;
			  break;
        	// Left arrow.
			case 37:
				xIzquierda = false;
				break; 
			// Up arrow.
			case 38:
				yArriba = false;
				break;
			// Down arrow.
			case 40:
				yAbajo = false;
				break;
        }

	}	
	
	document.addEventListener("keydown", activaMovimiento, false);
	document.addEventListener("keyup", desactivaMovimiento, false);	
	
	// localizamos el canvas
	canvas = document.getElementById("miCanvas");
	
	// Generamos el contexto de trabajo
	ctx = canvas.getContext("2d");

	imagen = new Image();
	imagen.src="assets/srpites/spriteSheet.png";
	DD.prototype.imagen = imagen;

	miDD = new DD( x, y);		

	// Lanzamos la animación
	idPersonaje= setInterval(pintaRectangulo, 1000/30);
	idSuelo= setInterval(pintaSuelo, 1000/30);	
	
	// Animación encargada de abrir y cerra la boca
	idAnimacion = setInterval(abreCierraBoca, 1000/4);


}
