import { Plataforma } from './plataformas.js';

let niveles = [
    {
        imagenFondo: "url(assets/srpites/fondos/fondo1.png)",
        plataformas: [
            new Plataforma(0, 540, 278, 60), // Suelo 1
            new Plataforma(0, 326, 218, 40), // Plataforma 1
            new Plataforma(380, 436, 220, 170), // Plataforma 2
            new Plataforma(388, 186, 220, 50) // Plataforma 3
        ],
        enemigos: [],
        posicionInicialPersonaje: { x: 50, y: 466 },
        puntoFinal: { x: 560, y: 0, width: 40, height: 186 }
    },
    {
        imagenFondo: "url(assets/srpites/fondos/fondo2.png)",
        plataformas: [
            new Plataforma(0, 186, 128, 50), // Plataforma 1
            new Plataforma(0, 410, 220, 170), // Plataforma 2
            new Plataforma(470, 490, 130, 110) // Plataforma 3
        ],
        enemigos: [],
        posicionInicialPersonaje: { x: 20, y: 112 },
        puntoFinal: { x: 560, y: 0, width: 40, height: 470 }
    }
];

export { niveles };