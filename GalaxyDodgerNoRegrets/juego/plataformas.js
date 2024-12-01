function Plataforma(x, y, tamañoSueloX, tamañoSueloY) {
    this.x = x;
    this.y = y;
    this.tamañoSueloX = tamañoSueloX;
    this.tamañoSueloY = tamañoSueloY;
}

let plataformas = [
    new Plataforma(0, 540, 278, 60), // Suelo 1
    new Plataforma(0, 326, 218, 40), // Plataforma 1
    new Plataforma(380, 436, 220, 170), // Plataforma 2
    new Plataforma(388, 186, 220, 50) // Plataforma 3
];

function pintaPlataformas(ctx) {
    ctx.fillStyle = '#FF0000';
    plataformas.forEach(plataforma => {
        ctx.fillRect(plataforma.x, plataforma.y, plataforma.tamañoSueloX, plataforma.tamañoSueloY);
    });
}

function actualizarGravedad(personaje) {
    // Aplicar gravedad
    if (!personaje.enSuelo) {
        personaje.velocidadY += personaje.gravedad;
        personaje.y += personaje.velocidadY;
        personaje.x += personaje.velocidadX;
    }

    // Verificar colisión con las plataformas
    plataformas.forEach(plataforma => {
        // Colisión superior
        if (personaje.x < plataforma.x + plataforma.tamañoSueloX && // Borde izquierdo del personaje no se sale por la derecha de la plataforma
            personaje.x + personaje.tamañoX > plataforma.x && // Borde derecho del personaje no se sale por la izquierda de la plataforma
            personaje.y + personaje.tamañoY > plataforma.y && // Borde inferior del personaje está por debajo del borde superior de la plataforma
            personaje.y + personaje.tamañoY - personaje.velocidadY <= plataforma.y) { // Borde inferior del personaje en el frame anterior está por encima del borde superior de la plataforma
            personaje.y = plataforma.y - personaje.tamañoY;
            personaje.velocidadY = 0;
            personaje.enSuelo = true;
        }
        // Colisión inferior
        else if (personaje.x < plataforma.x + plataforma.tamañoSueloX && // Borde izquierdo del personaje no se sale por la derecha de la plataforma
            personaje.x + personaje.tamañoX > plataforma.x && // Borde derecho del personaje no se sale por la izquierda de la plataforma
            personaje.y < plataforma.y + plataforma.tamañoSueloY && // Borde superior del personaje está por encima del borde inferior de la plataforma
            personaje.y - personaje.velocidadY >= plataforma.y + plataforma.tamañoSueloY) { // Borde superior del personaje en el frame anterior está por debajo del borde inferior de la plataforma
            personaje.y = plataforma.y + plataforma.tamañoSueloY;
            personaje.velocidadY = 0;
            personaje.enSuelo = false;
        }
        // Colisión lateral derecha
        else if (personaje.y < plataforma.y + plataforma.tamañoSueloY && // Borde superior del personaje está por encima del borde inferior de la plataforma
            personaje.y + personaje.tamañoY > plataforma.y && // Borde inferior del personaje está por debajo del borde superior de la plataforma
            personaje.x + personaje.tamañoX > plataforma.x && // Borde derecho del personaje está a la derecha del borde izquierdo de la plataforma
            personaje.x + personaje.tamañoX - personaje.velocidadX <= plataforma.x) { // Borde derecho del personaje en el frame anterior está a la izquierda del borde izquierdo de la plataforma
            personaje.x = plataforma.x - personaje.tamañoX;
            personaje.velocidadX = 0;
        }
        // Colisión lateral izquierda
        else if (personaje.y < plataforma.y + plataforma.tamañoSueloY && // Borde superior del personaje está por encima del borde inferior de la plataforma
            personaje.y + personaje.tamañoY > plataforma.y && // Borde inferior del personaje está por debajo del borde superior de la plataforma
            personaje.x < plataforma.x + plataforma.tamañoSueloX && // Borde izquierdo del personaje está a la izquierda del borde derecho de la plataforma
            personaje.x - personaje.velocidadX >= plataforma.x + plataforma.tamañoSueloX) { // Borde izquierdo del personaje en el frame anterior está a la derecha del borde derecho de la plataforma
            personaje.x = plataforma.x + plataforma.tamañoSueloX;
            personaje.velocidadX = 0;
        }
    });
}

export { Plataforma, plataformas, pintaPlataformas, actualizarGravedad };